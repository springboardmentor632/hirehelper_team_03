import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '../cloudinaryConfig.js'; 
import { loginSchema} from '../validtions/userValidators.js'

const JWT_SECRET = process.env.JWT_SECRET || 'please_change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';



export const signup = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email_id, password } = req.body;

        const existingUser = await User.findOne({ email_id });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    
        let profilePictureUrl = undefined;
        if (req.file) {
            try {
                const uploadResult = await uploadToCloudinary(req.file.buffer);
                profilePictureUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({ message: "Error uploading image" });
            }
        } 

        const newUser = new User({
            first_name,
            last_name,
            phone_number,
            email_id,
            password: hashedPassword,
            ...(profilePictureUrl && { profile_picture: profilePictureUrl }),
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                first_name: savedUser.first_name,
                last_name: savedUser.last_name,
                email_id: savedUser.email_id,
                profile_picture: savedUser.profile_picture,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: validationResult.error.issues[0].message,
                path: validationResult.error.issues[0].path[0]
            });
        }
        const { email_id, password } = validationResult.data;
        const user = await User.findOne({ email_id });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Email not verified. Please verify OTP."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        const userResp = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_id: user.email_id,
            phone_number: user.phone_number,
            isVerified: user.isVerified
        };
        return res.status(200).json({
            message: "Login successful",
            user: userResp,
            token
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

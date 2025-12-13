import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { uploadToCloudinary } from '../middleware/uploadProfile.js';
import { generateOTP, sendEmailOTP } from '../utils/emailService.js';
import {regiterSchema,otpSchema,verifyOtpSchema} from '../validtions/userValidators.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'please_change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';



export const signup = async (req, res) => {
    try {
       const validationResult = regiterSchema.safeParse(req.body);
       if (!validationResult.success) {
           return res.status(400).json({ 
            message: validationResult.error.issues[0].message ,
            path: validationResult.error.issues[0].path[0]
        } );
       }
        const { first_name, last_name, phone_number, email_id, password } = validationResult.data;

        const hashPromise = bcrypt.hash(password, 10);

        const uploadPromise = req.file
            ? uploadToCloudinary(req.file.buffer).catch(err => {
                console.error("Cloudinary Error:", err);
                throw new Error("Image upload failed");
            })
            : null;

        const hashedPassword = await hashPromise;
        const uploadResult = uploadPromise ? await uploadPromise : null;

        const savedUser = await User.create({
            first_name,
            last_name,
            phone_number,
            email_id,
            password: hashedPassword,
            profile_picture: uploadResult ? uploadResult.secure_url : undefined
        });

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
        if (error.code === 11000) {
            const duplicateField = error.keyValue.email_id ? 'Email ID' : 'Phone Number';

            return res.status(400).json({
                message: `${duplicateField} already exists`
            });
        }
        console.error("Signup Error:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

export const sendOtp = async (req, res) => {
    try {
        const validationResult = otpSchema.safeParse(req.body);
       if (!validationResult.success) {
           return res.status(400).json({ 
            message: validationResult.error.issues[0].message ,
            path: validationResult.error.issues[0].path[0]
        } );
       }

        const { email_id } = validationResult.data;
       
        const user = await User.findOne({ email_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = generateOTP();
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000);
        user.emailOtp = otp;
        user.otpExpiry = expiryDate;
        await user.save();
        await sendEmailOTP(email_id, user.first_name, otp);
       return res.status(200).json({ 
        message: "OTP sent successfully" ,
        user: { id: user._id, email_id: user.email_id }
    });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const validationResult = verifyOtpSchema.safeParse(req.body);
       if (!validationResult.success) {
           return res.status(400).json({ 
            message: validationResult.error.issues[0].message , 
            path: validationResult.error.issues[0].path[0]
        } );
       }

        const {  id, otp } = validationResult.data;
        
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(200).json({ message: "User is already verified" });
        }
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }
        if (user.emailOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        user.isVerified = true;
        user.emailOtp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            message: "Email verified successfully.",
            user: {
                id: user._id,
                email_id: user.email_id,
                isVerified: true
            }
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id || !password) {
      return res.status(400).json({ message: 'email and password required' });
    }

    const user = await User.findOne({ email_id });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id},
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userResp = {
      id: user._id,
      name: user.name,
      email_id: user.email_id,
      phone: user.phone,
      role: user.role
    };

    return res.json({ user: userResp, token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

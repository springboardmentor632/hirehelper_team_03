import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { uploadToCloudinary } from '../middleware/uploadProfile.js';
import { generateOTP, sendEmailOTP } from '../utils/emailService.js';
import { regiterSchema, otpSchema, verifyOtpSchema, loginSchema, resetSchema,resendOtpSchema } from '../validtions/userValidators.js';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '../cloudinaryConfig.js'; 

const JWT_SECRET = process.env.JWT_SECRET || 'please_change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';


export const signup = async (req, res) => {
    try {
        const validationResult = regiterSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: validationResult.error.issues[0].message,
                path: validationResult.error.issues[0].path[0]
            });
        }

        const { first_name, last_name, phone_number, email_id, password } =
            validationResult.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadResult = req.file
            ? await uploadToCloudinary(req.file.buffer)
            : null;

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const savedUser = await User.create({
            first_name,
            last_name,
            phone_number,
            email_id,
            password: hashedPassword,
            emailOtp: otp,
            otpExpiry,
            isVerified: false,
            profile_picture: uploadResult?.secure_url
        });

        await sendEmailOTP(email_id, first_name, otp);

        return res.status(201).json({
            message: "Signup successful. OTP sent to email.",
            user: {
                id: savedUser._id,
                email_id: savedUser.email_id,
                isVerified: savedUser.isVerified
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            const duplicateField = error.keyValue.email_id
                ? "Email ID"
                : "Phone Number";

            return res.status(400).json({
                message: `${duplicateField} already exists`
            });
        }
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


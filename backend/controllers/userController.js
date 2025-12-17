import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { uploadToCloudinary } from '../middleware/uploadProfile.js';
import { generateOTP, sendEmailOTP } from '../utils/emailService.js';
import { regiterSchema, otpSchema, verifyOtpSchema, loginSchema, resetSchema,resendOtpSchema } from '../validtions/userValidators.js';
import jwt from 'jsonwebtoken';

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

        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
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

export const forgotPassword = async (req, res) => {
    try {
        const validationResult = otpSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: validationResult.error.issues[0].message,
                path: validationResult.error.issues[0].path[0]
            });
        }

        const { email_id } = validationResult.data;

        const user = await User.findOne({ email_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Email not verified" });
        }

        const otp = generateOTP();
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000);

        // reuse existing fields
        user.emailOtp = otp;
        user.otpExpiry = expiryDate;
        await user.save();

        await sendEmailOTP(email_id, user.first_name, otp);

        return res.status(200).json({
            message: "Password reset OTP sent successfully"
        });

    } catch (error) {
        console.error("Forgot Password OTP Error:", error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const validationResult = verifyOtpSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: validationResult.error.issues[0].message,
                path: validationResult.error.issues[0].path[0]
            });
        }

        const { id, otp } = validationResult.data;

        const user = await User.findById(id);
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

export const resetPassword = async (req, res) => {
  try {
    const validation = resetSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.issues[0].message
      });
    }
    const { email_id, otp, newPassword } = validation.data;
    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.emailOtp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not requested" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (String(user.emailOtp) !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.emailOtp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Reset failed",
      error: error.message
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const validationResult = resendOtpSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.issues[0].message,
        path: validationResult.error.issues[0].path[0]
      });
    }
    const { email_id } = req.body;
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
      message: "OTP resent successfully"
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

import { uploadToCloudinary } from '../cloudinaryConfig.js'; 

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
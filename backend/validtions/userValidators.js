import { z } from 'zod';
import validator from 'validator';

export const regiterSchema = z.object({
    first_name: z.string()
        .min(2, "First name must be at least 2 characters long")
        .max(30, "First name must be at most 30 characters long")
        .refine((val) => validator.isAlpha(val), { message: "First name must contain only letters" }),
    last_name: z.string()
        .min(2, "Last name must be at least 2 characters long")
        .max(30, "Last name must be at most 30 characters long")
        .refine((val) => validator.isAlpha(val), { message: "Last name must contain only letters" }),
    email_id: z.string()
        .refine((val) => validator.isEmail(val), { message: "Invalid email address" }),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => validator.isStrongPassword(val), { message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character" }),
    confirm_password: z.string(),
    phone_number: z.string()
        .refine((val) => validator.isMobilePhone(val, 'en-IN'), { message: "Invalid phone number" }),
}).refine((data) => data.first_name !== data.last_name, {
    message: "First name and last name cannot be the same",
})
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
    })

export const otpSchema = z.object({
    email_id: z.string()
        .refine((val) => validator.isEmail(val), { message: "Invalid email address" }),
})

export const verifyOtpSchema = z.object({
    id: z.string()
        .length(24, "Invalid user ID"),                                
    otp: z.string()
        .length(6, "OTP must be 6 digits")
        .refine((val) => validator.isNumeric(val), { message: "OTP must contain only numbers" }),
})

import { z } from "zod";
import validator from "validator";

export const regiterSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(30, "First name must be at most 30 characters long")
    .refine((val) => validator.isAlpha(val), {
      message: "First name must contain only letters",
    }),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(30, "Last name must be at most 30 characters long")
    .refine((val) => validator.isAlpha(val), {
      message: "Last name must contain only letters",
    }),
  email_id: z
    .string()
    .refine((val) => validator.isEmail(val), {
      message: "Invalid email address",
    }),
  password: z.string().refine(
    (val) =>
      validator.isStrongPassword(val, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    {
      message:
        "Password is too weak. Needs 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special character",
    }
  ),
  // confirm_password: z.string(),
  phone_number: z
    .string()
    .refine((val) => validator.isMobilePhone(val, "en-IN"), {
      message: "Invalid phone number",
    }),
});

export const loginSchema = z.object({
  email_id: z
    .string()
    .refine((val) => validator.isEmail(val), {
      message: "Invalid email address",
    }),
  password: z.string().refine(
    (val) =>
      validator.isStrongPassword(val, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    {
      message:
        "Password is too weak. Needs 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special character",
    }
  ),
});

export const otpSchema = z.object({
  email_id: z
    .string()
    .refine((val) => validator.isEmail(val), {
      message: "Invalid email address",
    }),
});

export const verifyOtpSchema = z.object({
  id: z.string().length(36, "Invalid user ID"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => validator.isNumeric(val), {
      message: "OTP must contain only numbers",
    }),
});

export const resetSchema = z.object({
  email_id: z
    .string({
      required_error: "Email is required",
    })
    .refine((val) => validator.isEmail(val), {
      message: "Invalid email address",
    }),
  otp: z
    .string()
    .length(6, {
      message: "Invalid OTP",
    })
    .refine((val) => validator.isNumeric(val), {
      message: "Invalid OTP",
    }),
  newPassword: z.string().refine(
    (val) =>
      validator.isStrongPassword(val, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    {
      message:
        "Password is too weak. Needs 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special character",
    }
  ),
});

export const resendOtpSchema = z.object({
  email_id: z
    .string()
    .refine((val) => validator.isEmail(val), {
      message: "Invalid email address",
    }),
});

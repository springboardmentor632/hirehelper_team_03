import { z } from 'zod';
import validator from 'validator';
export const loginSchema = z.object({
    email_id: z.string()
        .refine((val) => validator.isEmail(val), { message: "Invalid email address" }),
    password: z.string()
        .refine((val) => validator.isStrongPassword(val, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }), {
            message: "Password is too weak. Needs 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special character"
        })
})
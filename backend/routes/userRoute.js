import express from 'express';
import { upload } from '../middleware/uploadProfile.js';
import { signup,login, forgotPassword, verifyOtp, resetPassword, resendOtp } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', upload.single('profile_picture'), signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);

export default router;
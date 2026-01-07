import express from 'express';
import { upload } from '../middleware/uploadProfile.js';
import protect from '../middleware/auth.js';
import {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  getMe,
  updateMe,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', upload.single('profile_picture'), signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);

// New profile routes
router.get('/users/me', protect, getMe);
router.patch('/users/me', protect, upload.single('profile_picture'), updateMe);

export default router;
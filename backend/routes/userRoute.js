import express from 'express';
import { upload } from '../middleware/uploadProfile.js';
import { signup,login, sendOtp, verifyOtp } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', upload.single('profile_picture'), signup);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;
import express from 'express';
import { upload } from '../cloudinaryConfig.js'; 
import { signup } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', upload.single('profile_picture'), signup);

export default router;
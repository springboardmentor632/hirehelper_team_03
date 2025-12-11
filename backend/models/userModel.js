import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, 
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    unique: true,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: "https://res.cloudinary.com/demo/image/upload/v1570979139/book_cover_catch_22.jpg",
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
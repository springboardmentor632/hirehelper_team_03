import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

/* Cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Multer */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

export const uploadTask = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* ✅ TASK-SPECIFIC NAME */
export const uploadTaskToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "tasks" }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

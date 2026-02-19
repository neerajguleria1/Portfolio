import multer from "multer";
import cloudinary from "cloudinary";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const multerCloudinary = require("multer-storage-cloudinary");
const CloudinaryStorage = multerCloudinary.CloudinaryStorage || multerCloudinary;

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPG, JPEG, PNG, WEBP, GIF allowed"));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

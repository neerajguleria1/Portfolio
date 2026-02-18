import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// ✅ File upload with slug based routes
router.post("/upload", upload.fields([{ name: "cover_image", maxCount: 1 }, { name: "content_images", maxCount: 10 }]), createBlog);
router.get("/", getBlogs);
router.get("/get/:id", getBlog);
router.put("/:id", upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "content_images", maxCount: 10 }]), updateBlog);
router.delete("/:id", deleteBlog);

export default router;

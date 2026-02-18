import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    cover_image: { type: String, default: "" },
    content_images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);

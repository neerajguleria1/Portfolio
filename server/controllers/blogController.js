import Blog from "../models/Blog.js";

// ✅ Create Blog

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, tags, published, date } = req.body;

    if (!title || !excerpt || !content || !date) {
      return res.status(400).json({ error: "Title, excerpt, content & date required" });
    }

    console.log('Files received:', {
      cover_image: req.files?.cover_image?.length || 0,
      content_images: req.files?.content_images?.length || 0
    });

    const cover_image = req.files?.cover_image?.[0]?.path || "";
    const content_images = req.files?.content_images?.map(file => file.path) || [];

    console.log('Cloudinary URLs:', { cover_image, content_images });

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author: author || "Admin",
      tags: tags ? tags.split(",") : [],
      published: published || false,
      date,
      cover_image,
      content_images,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully ✅",
      blog,
    });
  } catch (error) {
    console.error("createBlog error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }).select("-__v");
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get Blog by Slug
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, tags, date } = req.body;

    if (tags) req.body.tags = Array.isArray(tags) ? tags : tags.split(",");
    if (date) req.body.date = date;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!blog) return res.status(404).json({ error: "Blog not found ❌" });

    res.json({ success: true, message: "Updated ✅", blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found ❌" });

    res.json({ success: true, message: "Deleted 🗑️" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

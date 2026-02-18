import { useEffect, useState } from "react";
import { useRouter } from "../router";
import toast from "react-hot-toast";
import { resolveImageUrl } from "../lib/images";

const API = import.meta.env.VITE_API_URL;

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
  date: string;
  cover_image?: string;
  coverImage?: string;
  content_images?: string[];
}

export default function BlogPage() {
  const { currentPath, navigate } = useRouter();
  const blogId = currentPath.split("/blog/")[1];

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all blogs
  useEffect(() => {
    if (blogId) return;

    (async () => {
      try {
        const res = await fetch(`${API}`);
        const data = await res.json();

        if (!data.success) return toast.error("Failed to load blogs");

        setBlogs(data.blogs || []);
      } catch {
        toast.error("Server Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [blogId]);

  // ✅ Fetch single blog
  useEffect(() => {
    if (!blogId) return;

    (async () => {
      try {
        const res = await fetch(`${API}/get/${blogId}`);
        const data = await res.json();

        if (!data.blog) {
          toast.error("Blog not found");
          navigate("/blog");
          return;
        }

        setBlog(data.blog);
      } catch {
        toast.error("Error loading blog");
      } finally {
        setLoading(false);
      }
    })();
  }, [blogId]);

  // ---------------- LIST VIEW ----------------
  if (!blogId) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh] text-gray-500">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <h2 className="text-center text-gray-500 text-lg">No blogs found</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <div
                key={b._id}
                onClick={() => navigate(`/blog/${b._id}`)}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer group"
              >
                <img
                  src={resolveImageUrl(b.cover_image || b.coverImage)}
                  alt={b.title}
                  className="w-full h-48 object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                />

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                    {b.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {b.excerpt}
                  </p>

                  <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                    <span>📅 {new Date(b.date).toLocaleDateString()}</span>
                    <span>{b.author ?? "Admin"}</span>
                  </div>

                  {b.tags && b.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {b.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------------- DETAIL VIEW ----------------
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <button
        onClick={() => navigate("/blog")}
        className="mb-5 text-sm text-blue-600 hover:underline"
      >
        ← Back to Blog
      </button>

      <img
        src={resolveImageUrl(blog.cover_image || blog.coverImage)}
        alt={blog.title}
        className="w-full h-[350px] md:h-[500px] object-contain bg-white rounded-2xl shadow border"
      />

      <h1 className="text-4xl font-bold text-gray-900 mt-6">{blog.title}</h1>

      <p className="text-gray-500 mt-2 text-sm">
        📅 {new Date(blog.date).toLocaleDateString()}
      </p>

      <p className="text-gray-800 text-lg font-medium mt-6">{blog.excerpt}</p>

      {(() => {
        const contentParts = blog.content.split(/\r?\n\r?\n/);
        let imageIndex = 0;

        return (
          <div className="mt-6 space-y-6">
            {contentParts.map((part, i) => {
              if (part.trim().startsWith("[IMAGE_")) {
                const img = blog.content_images?.[imageIndex];
                imageIndex++;
                return img ? (
                  <img
                    key={i}
                    src={resolveImageUrl(img)}
                    alt="Content"
                    className="w-full rounded-lg shadow"
                  />
                ) : null;
              }
              if (part.trim()) {
                return (
                  <p key={i} className="text-gray-800 text-base font-semibold whitespace-pre-wrap">
                    {part}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      })()}

      <div className="flex gap-2 mt-6 flex-wrap ">
        {blog.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-600 px-3 py-1  rounded-full text-base font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

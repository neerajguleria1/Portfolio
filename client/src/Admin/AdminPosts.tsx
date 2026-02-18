import { useEffect, useState } from "react";
import { useRouter } from "../router";
import AdminSidebar from "./AdminSidebar";
import { Plus, Menu } from "lucide-react";
import toast from "react-hot-toast";
import { resolveImageUrl } from "../lib/images";
import BlogModal from "./BlogModal";
import type { Blog as UiBlog } from "../lib/supabase";

const API = import.meta.env.VITE_API_URL;

interface Post {
  _id: string;
  slug?: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  published: boolean;
  cover_image: string;
}

export default function AdminPosts() {
  const { navigate } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<UiBlog | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) navigate("/");
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}`);
      const data = await res.json();
      if (data.success) setPosts(data.blogs);
      else toast.error("Failed to fetch posts");
    } catch {
      toast.error("Server Error");
    }
  };

  // ✅ Delete Post
  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Post deleted ✅");
        fetchPosts();
      } else toast.error(data.error || "Failed to delete");
    } catch {
      toast.error("Server error ❌");
    }
  };

  const mapToUiBlog = (post: Post): UiBlog => ({
    id: post._id,
    title: post.title,
    slug: post.slug || post._id,
    content: post.content,
    excerpt: post.excerpt,
    author: post.author,
    cover_image: post.cover_image,
    tags: post.tags || [],
    published: Boolean(post.published),
    views: 0,
    created_at: new Date(post.date).toISOString(),
    updated_at: new Date(post.date).toISOString(),
  });

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="hidden md:block">
        <AdminSidebar open={true} setOpen={() => { }} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 md:hidden transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      <div className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6 mt-4 md:mt-0">
          <button
            className="md:hidden p-2 rounded bg-white shadow mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Posts</h1>
            <p className="text-gray-500 text-sm">Manage all blog posts</p>
          </div>

          <button
            onClick={() => navigate("/admin/create-post")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={18} /> New Post
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">All Posts</h2>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="group border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  {post.cover_image && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={resolveImageUrl(post.cover_image)}
                        alt={post.title}
                        className="w-full h-full object-contain bg-gray-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  <div className="p-4 cursor-pointer" onClick={() => setSelected(mapToUiBlog(post))}>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                      <span>{post.author || "Admin"}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* ✅ Edit & Delete Buttons */}
                  <div className="flex gap-2 p-3 border-t bg-gray-50">
                    <button
                      onClick={() => navigate(`/admin/update-post/${post._id}`)}
                      className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="flex-1 bg-red-600 text-white text-sm py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <BlogModal blog={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}

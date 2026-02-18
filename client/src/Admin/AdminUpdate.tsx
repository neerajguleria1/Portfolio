import { useState, useEffect } from "react";
import { useRouter } from "../router";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";
import { toast } from "react-hot-toast";
import { resolveImageUrl } from "../lib/images";

const API = import.meta.env.VITE_API_URL;

export default function AdminUpdatePost() {
  const { navigate, currentPath } = useRouter();
  const postId = currentPath.split("/admin/update-post/")[1];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Form field states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [date, setDate] = useState("");

  // Image handling states
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // ✅ Admin Auth Check
  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) navigate("/admin/login");
  }, [navigate]);

  // ✅ GET Post Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API}/get/${postId}`);
        const data = await res.json();

        if (!data.blog) {
          toast.error("Post not found!");
          return;
        }

        setTitle(data.blog.title);
        setExcerpt(data.blog.excerpt);
        setContent(data.blog.content);
        setAuthor(data.blog.author);
        setTags(data.blog.tags.join(", "));
        setPublished(data.blog.published);
        setDate(data.blog.date.split("T")[0]);

        if (data.blog.cover_image) setPreviewImage(resolveImageUrl(data.blog.cover_image));
      } catch (err) {
        toast.error("Failed to fetch post 😢");
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  // ✅ Handle Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Submit Update Request
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())));
    formData.append("published", String(published));
    formData.append("date", date);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      setLoading(true);

      const res = await fetch(`${API}/${postId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("✅ Post updated successfully");
      navigate("/admin/posts");

    } catch (err) {
      toast.error("❌ " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar open={true} setOpen={() => {}} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow z-50 md:hidden transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden p-2 rounded bg-white shadow"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1 className="text-2xl font-bold">Update Post</h1>
        </div>

        <form onSubmit={submitPost} className="bg-white p-6 shadow rounded-lg space-y-4">
          <label>Title</label>
          <input 
            className="border w-full p-2 rounded" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />

          <label>Excerpt</label>
          <textarea 
            rows={2} 
            className="border w-full p-2 rounded" 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)} 
            required 
          />

          <label>Content</label>
          <textarea 
            rows={6} 
            className="border w-full p-2 rounded" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />

          <label>Author</label>
          <input 
            className="border w-full p-2 rounded" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />

          <label>Tags (comma separated)</label>
          <input 
            className="border w-full p-2 rounded" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            required 
          />

          <label>Post Date</label>
          <input 
            type="date" 
            className="border w-full p-2 rounded" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />

          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={published} 
              onChange={(e) => setPublished(e.target.checked)} 
            />
            Publish?
          </label>

          <label>Cover Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          {previewImage && (
            <img 
              src={previewImage} 
              alt="Preview" 
              className="mt-2 w-40 h-40 object-cover rounded" 
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "../router";
import toast from "react-hot-toast";
import { resolveImageUrl } from "../lib/images";
import { Clock, User, Calendar, Share2, Bookmark, ArrowLeft } from "lucide-react";

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
  const [readingTime, setReadingTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // ✅ Fetch all blogs
  useEffect(() => {
    if (blogId) return;

    (async () => {
      try {
        const res = await fetch(`${API}?t=${Date.now()}`, { cache: 'no-store' });
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
        const res = await fetch(`${API}/get/${blogId}?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();

        if (!data.blog) {
          toast.error("Blog not found");
          navigate("/blog");
          return;
        }

        setBlog(data.blog);
        // Calculate reading time
        const words = data.blog.content.split(/\s+/).length;
        setReadingTime(Math.ceil(words / 200));
      } catch {
        toast.error("Error loading blog");
      } finally {
        setLoading(false);
      }
    })();
  }, [blogId]);

  // Filter blogs
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || b.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap(b => b.tags || [])));

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // ---------------- LIST VIEW ----------------
  if (!blogId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl -z-10"></div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Tech Insights & Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore cutting-edge tutorials, industry insights, and expert perspectives on cloud computing, DevOps, and modern software development
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="🔍 Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg shadow-sm"
              />
            </div>
            
            {/* Tag Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  !selectedTag
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Posts ({blogs.length})
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tag} ({blogs.filter(b => b.tags?.includes(tag)).length})
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading amazing content...</p>
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">No articles found</h2>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {filteredBlogs.length > 0 && !searchQuery && !selectedTag && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">⭐</span> Featured Article
                  </h2>
                  <article
                    onClick={() => navigate(`/blog/${filteredBlogs[0]._id}`)}
                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden h-64 md:h-full">
                        <img
                          src={resolveImageUrl(filteredBlogs[0].cover_image || filteredBlogs[0].coverImage)}
                          alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            {filteredBlogs[0].tags?.[0] || 'Featured'}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(filteredBlogs[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          {filteredBlogs[0].title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed line-clamp-3">
                          {filteredBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {filteredBlogs[0].author || 'Admin'}
                          </span>
                          <span className="text-blue-600 font-bold group-hover:translate-x-2 transition-transform flex items-center gap-2">
                            Read Article <span className="text-2xl">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.slice(searchQuery || selectedTag ? 0 : 1).map((b) => (
                  <article
                    key={b._id}
                    onClick={() => navigate(`/blog/${b._id}`)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={resolveImageUrl(b.cover_image || b.coverImage)}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                          {b.tags?.[0] || 'Tech'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{Math.ceil(b.content.split(/\s+/).length / 200)} min read</span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                        {b.title}
                      </h2>

                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {b.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {(b.author || 'A')[0]}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{b.author ?? "Admin"}</span>
                        </div>
                        <span className="text-blue-600 text-sm font-bold group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </button>

        {/* Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src={resolveImageUrl(blog.cover_image || blog.coverImage)}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {blog.tags?.map((tag, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {(blog.author || 'A')[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{blog.author || 'Admin'}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3 pb-6 border-b border-gray-200">
            <button
              onClick={sharePost}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
          <p className="text-lg text-gray-800 leading-relaxed italic">{blog.excerpt}</p>
        </div>

        {/* Article Content */}
        {(() => {
          const contentParts = blog.content.split(/\r?\n\r?\n/);
          let imageIndex = 0;

          return (
            <article className="prose prose-lg max-w-none">
              {contentParts.map((part, i) => {
                if (part.trim().startsWith("[IMAGE_")) {
                  const img = blog.content_images?.[imageIndex];
                  imageIndex++;
                  return img ? (
                    <figure key={i} className="my-10">
                      <img
                        src={resolveImageUrl(img)}
                        alt="Content"
                        className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
                      />
                    </figure>
                  ) : null;
                }
                if (part.trim()) {
                  return (
                    <p key={i} className="text-gray-800 text-lg leading-relaxed mb-6">
                      {part}
                    </p>
                  );
                }
                return null;
              })}
            </article>
          );
        })()}

        {/* Author Card */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {(blog.author || 'A')[0]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Written by {blog.author || 'Admin'}</h3>
              <p className="text-gray-600">Tech Writer & Cloud Expert</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Passionate about sharing knowledge and helping developers build better software.
          </p>
        </div>
      </div>
    </div>
  );
}

import { X, Calendar, Clock, Tag } from 'lucide-react';
import { resolveImageUrl } from '../lib/images';
import type { Blog } from '../lib/supabase';

interface BlogModalProps {
  blog: Blog;
  onClose: () => void;
}

export default function BlogModal({ blog, onClose }: BlogModalProps) {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const readingTime = Math.ceil(blog.content.split(' ').length / 200);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="min-h-screen px-4 py-8 flex items-start justify-center">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {blog.cover_image && (
            <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
              <img
                src={resolveImageUrl(blog.cover_image)}
                alt={blog.title}
                className="w-full h-full object-contain bg-gray-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="font-medium text-gray-700">{blog.author}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <Tag className="w-4 h-4 text-gray-500" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

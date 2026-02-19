const API_URL = import.meta.env.VITE_API_URL;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class APIService {
  private cache = new Map<string, CacheEntry<any>>();

  private async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 3
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getBlogs(useCache = true) {
    const cacheKey = 'blogs';
    
    if (useCache) {
      const cached = this.getCached(cacheKey);
      if (cached) return cached;
    }

    const response = await this.fetchWithRetry(`${API_URL}`);
    const data = await response.json();
    
    if (data.success) {
      this.setCache(cacheKey, data.blogs);
      return data.blogs;
    }
    
    throw new Error('Failed to fetch blogs');
  }

  async getBlogById(id: string) {
    const cacheKey = `blog-${id}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    const response = await this.fetchWithRetry(`${API_URL}/${id}`);
    const data = await response.json();
    
    if (data.success) {
      this.setCache(cacheKey, data.blog);
      return data.blog;
    }
    
    throw new Error('Failed to fetch blog');
  }

  clearCache() {
    this.cache.clear();
  }
}

export default new APIService();

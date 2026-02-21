export function resolveImageUrl(path?: string | null): string {
  const fallback = "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?semt=ais_hybrid&w=740&q=80";
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path)) return path;

  const api = import.meta.env?.VITE_API_URL as string | undefined;
  if (!api) return path.startsWith("/") ? path : `/${path}`;

  let origin: string;
  try {
    origin = new URL(api).origin;
  } catch {
    return path.startsWith("/") ? path : `/${path}`;
  }

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}




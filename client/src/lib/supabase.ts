import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string | null;
  message: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  service_type: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name: string;
  subscribed: boolean;
  created_at?: string;
}

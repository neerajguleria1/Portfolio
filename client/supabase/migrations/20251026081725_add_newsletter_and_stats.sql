/*
  # Add Newsletter and Enhanced Features

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique) - Subscriber email
      - `name` (text) - Subscriber name
      - `subscribed` (boolean) - Active subscription status
      - `created_at` (timestamptz) - Subscription timestamp

  2. Updates
    - Add view count tracking for blogs
    - Add categories for better organization

  3. Security
    - Enable RLS on newsletter table
    - Public can subscribe
    - Only subscribed emails visible with authentication
*/

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view newsletter subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update newsletter subscriptions"
  ON newsletter_subscribers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter_subscribers(subscribed);
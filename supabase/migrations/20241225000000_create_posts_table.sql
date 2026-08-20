-- Create posts table for the new blog system
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  author_name TEXT NOT NULL DEFAULT 'Team DietaryGuide',
  author_avatar TEXT NOT NULL DEFAULT 'https://github.com/amishardev/navdhiweb/blob/main/Untitled%20design%20(15).png?raw=true',
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  snippet TEXT NOT NULL,
  reading_time INTEGER NOT NULL DEFAULT 5,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT true
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Create index on tags for filtering
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON posts
    FOR SELECT USING (published = true);

-- Create policy to allow authenticated users to manage posts
CREATE POLICY "Allow authenticated users to manage posts" ON posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for blog images
CREATE POLICY "Allow public read access to blog images" ON storage.objects
    FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blog images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blog images" ON storage.objects
    FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

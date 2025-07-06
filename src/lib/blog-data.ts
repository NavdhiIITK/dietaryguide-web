import { supabase } from '@/integrations/supabase/client';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/types/blog';

// Helper functions
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const generateSnippet = (content: string): string => {
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
};

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to generate snippet
export function generateSnippet(content: string, maxLength: number = 160): string {
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.length > maxLength
    ? textContent.substring(0, maxLength).trim() + '...'
    : textContent;
}

// Fetch all published blog posts from Supabase ONLY
export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('Fetching blog posts from Supabase posts table...');

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts from Supabase:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.log('No posts found in Supabase posts table');
    return [];
  }

  // Map Supabase data to BlogPost type
  const posts = data.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    author: {
      name: post.author_name || 'Team DietaryGuide',
      avatarUrl: post.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    image: post.image,
    created_at: post.created_at,
    updated_at: post.updated_at || post.created_at,
    tags: post.tags || [],
    snippet: post.snippet,
    reading_time: post.reading_time || 5,
    content: post.content,
    published: post.published !== false, // Default to true if not specified
    meta_title: post.meta_title || post.title,
    meta_description: post.meta_description || post.snippet
  }));

  console.log(`Found ${posts.length} posts in Supabase`);
  return posts;
}

// Fetch a single blog post by slug from Supabase ONLY
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  console.log(`Fetching blog post with slug: ${slug} from Supabase`);

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log(`Post with slug ${slug} not found in Supabase`);
      return null; // Post not found
    }
    console.error('Error fetching blog post from Supabase:', error);
    return null;
  }

  if (!data) {
    console.log(`No data returned for slug: ${slug}`);
    return null;
  }

  // Map Supabase data to BlogPost type
  const post: BlogPost = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle,
    author: {
      name: data.author_name || 'Team DietaryGuide',
      avatarUrl: data.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    image: data.image,
    created_at: data.created_at,
    updated_at: data.updated_at || data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time || 5,
    content: data.content,
    published: data.published !== false,
    meta_title: data.meta_title || data.title,
    meta_description: data.meta_description || data.snippet
  };

  console.log(`Found post: ${post.title}`);
  return post;
}

// Create a new blog post in Supabase
export async function createBlogPost(postData: CreateBlogPost): Promise<BlogPost> {
  const slug = slugify(postData.title);
  const readingTime = calculateReadingTime(postData.content);
  const snippet = generateSnippet(postData.content);

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: postData.title,
      slug,
      subtitle: postData.subtitle,
      content: postData.content,
      tags: postData.tags,
      image: postData.image,
      author_name: postData.author_name,
      author_avatar_url: postData.author_avatar,
      reading_time: readingTime,
      snippet,
      published: postData.published || false,
      meta_title: postData.meta_title || postData.title,
      meta_description: postData.meta_description || snippet
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle,
    author: {
      name: data.author_name,
      avatarUrl: data.author_avatar_url
    },
    image: data.image,
    created_at: data.created_at,
    updated_at: data.updated_at || data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time,
    content: data.content,
    published: data.published,
    meta_title: data.meta_title,
    meta_description: data.meta_description
  };
}

// Update a blog post in Supabase
export async function updateBlogPost(postData: UpdateBlogPost): Promise<BlogPost> {
  const updateData: any = { ...postData };

  if (postData.title) {
    updateData.slug = slugify(postData.title);
  }

  if (postData.content) {
    updateData.reading_time = calculateReadingTime(postData.content);
    updateData.snippet = generateSnippet(postData.content);
  }

  // Ensure correct field names for Supabase
  if (postData.author_avatar) {
    updateData.author_avatar_url = postData.author_avatar;
    delete updateData.author_avatar;
  }

  const { data, error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', postData.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle,
    author: {
      name: data.author_name,
      avatarUrl: data.author_avatar_url
    },
    image: data.image,
    created_at: data.created_at,
    updated_at: data.updated_at || data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time,
    content: data.content,
    published: data.published,
    meta_title: data.meta_title,
    meta_description: data.meta_description
  };
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

// Upload image to Supabase storage
export async function uploadBlogImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Get all unique tags from Supabase ONLY
export async function getAllTags(): Promise<string[]> {
  console.log('Fetching tags from Supabase posts table...');

  const { data, error } = await supabase
    .from('posts')
    .select('tags');

  if (error) {
    console.error('Error fetching tags from Supabase:', error);
    return [];
  }

  if (!data || data.length === 0) {
    console.log('No posts found for tag extraction');
    return [];
  }

  // Extract all tags from all posts and deduplicate
  const allTags = data.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)].sort();

  console.log(`Found ${uniqueTags.length} unique tags in Supabase`);
  return uniqueTags;
}
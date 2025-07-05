import { supabase } from '@/integrations/supabase/client';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/types/blog';

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

// Fetch all published blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return data.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    author: {
      name: post.author_name,
      avatarUrl: post.author_avatar
    },
    image: post.image,
    created_at: post.created_at,
    tags: post.tags || [],
    snippet: post.snippet,
    reading_time: post.reading_time,
    content: post.content
  }));
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Post not found
    }
    console.error('Error fetching blog post:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle,
    author: {
      name: data.author_name,
      avatarUrl: data.author_avatar
    },
    image: data.image,
    created_at: data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time,
    content: data.content
  };
}

// Create a new blog post
export async function createBlogPost(postData: CreateBlogPost): Promise<BlogPost> {
  const slug = generateSlug(postData.title);
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
      author_avatar: postData.author_avatar,
      reading_time: readingTime,
      snippet
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
      avatarUrl: data.author_avatar
    },
    image: data.image,
    created_at: data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time,
    content: data.content
  };
}

// Update a blog post
export async function updateBlogPost(postData: UpdateBlogPost): Promise<BlogPost> {
  const updateData: any = { ...postData };

  if (postData.title) {
    updateData.slug = generateSlug(postData.title);
  }

  if (postData.content) {
    updateData.reading_time = calculateReadingTime(postData.content);
    updateData.snippet = generateSnippet(postData.content);
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
      avatarUrl: data.author_avatar
    },
    image: data.image,
    created_at: data.created_at,
    tags: data.tags || [],
    snippet: data.snippet,
    reading_time: data.reading_time,
    content: data.content
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

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('tags')
    .eq('published', true);

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  const allTags = data.flatMap(post => post.tags || []);
  return [...new Set(allTags)].sort();
}
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/types/blog';
import { blogs } from '@/data/blogs';

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
  try {
    // First try to get posts from the new posts table
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching from posts table, falling back to legacy data:', error);
    }

    // Convert new posts format
    const newPosts = (data || []).map(post => ({
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

    // Fallback to existing blog data if no new posts
    if (newPosts.length === 0) {
      console.log('No posts in new table, using legacy blog data');

      // Try to get from auto_blogs table (existing system)
      const { data: autoBlogsData, error: autoBlogsError } = await supabase
        .from('auto_blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      const autoBlogs = (autoBlogsData || []).map(post => ({
        id: post.id,
        title: post.title,
        slug: post.id, // Use ID as slug for auto blogs
        subtitle: post.description,
        author: {
          name: post.author || 'Team DietaryGuide',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        image: post.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        created_at: post.created_at || post.date,
        tags: post.category ? [post.category] : [],
        snippet: post.description,
        reading_time: 5,
        content: post.content || post.description
      }));

      // Also include static blogs
      const staticBlogs = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.id,
        subtitle: blog.excerpt,
        author: {
          name: blog.author || 'Team DietaryGuide',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        image: blog.imageUrl,
        created_at: blog.date,
        tags: blog.category ? [blog.category] : [],
        snippet: blog.excerpt,
        reading_time: calculateReadingTime(blog.content || blog.excerpt),
        content: blog.content || blog.excerpt
      }));

      // Combine and sort all legacy blogs
      const allLegacyBlogs = [...autoBlogs, ...staticBlogs]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return allLegacyBlogs;
    }

    return newPosts;
  } catch (error) {
    console.error('Error fetching blog posts, falling back to static blogs:', error);

    // Final fallback to static blogs only
    return blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.id,
      subtitle: blog.excerpt,
      author: {
        name: blog.author || 'Team DietaryGuide',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      image: blog.imageUrl,
      created_at: blog.date,
      tags: blog.category ? [blog.category] : [],
      snippet: blog.excerpt,
      reading_time: calculateReadingTime(blog.content || blog.excerpt),
      content: blog.content || blog.excerpt
    }));
  }
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
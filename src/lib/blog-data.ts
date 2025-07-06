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

// Fetch all published blog posts (using existing system)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching blog posts from existing system...');

    // Get from auto_blogs table (existing system)
    const { data: autoBlogsData, error: autoBlogsError } = await supabase
      .from('auto_blogs')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (autoBlogsError) {
      console.warn('Error fetching from auto_blogs table:', autoBlogsError);
    }

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
      updated_at: post.created_at || post.date,
      tags: post.category ? [post.category] : [],
      snippet: post.description,
      reading_time: 5,
      content: post.content || post.description,
      published: true, // Auto blogs are always published
      meta_title: post.title,
      meta_description: post.description
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
      updated_at: blog.date,
      tags: blog.category ? [blog.category] : [],
      snippet: blog.excerpt,
      reading_time: calculateReadingTime(blog.content || blog.excerpt),
      content: blog.content || blog.excerpt,
      published: true, // Static blogs are always published
      meta_title: blog.title,
      meta_description: blog.excerpt
    }));

    // Combine and sort all blogs
    const allBlogs = [...autoBlogs, ...staticBlogs]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    console.log(`Found ${allBlogs.length} total blogs (${autoBlogs.length} from auto_blogs, ${staticBlogs.length} static)`);
    return allBlogs;
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

// Fetch a single blog post by slug (using existing system)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // First check static blogs
    const staticBlog = blogs.find(blog => blog.id === slug);
    if (staticBlog) {
      return {
        id: staticBlog.id,
        title: staticBlog.title,
        slug: staticBlog.id,
        subtitle: staticBlog.excerpt,
        author: {
          name: staticBlog.author || 'Team DietaryGuide',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        image: staticBlog.imageUrl,
        created_at: staticBlog.date,
        tags: staticBlog.category ? [staticBlog.category] : [],
        snippet: staticBlog.excerpt,
        reading_time: calculateReadingTime(staticBlog.content || staticBlog.excerpt),
        content: staticBlog.content || staticBlog.excerpt
      };
    }

    // Then check auto_blogs table
    const { data, error } = await supabase
      .from('auto_blogs')
      .select('*')
      .eq('id', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Post not found
      }
      console.error('Error fetching blog post from auto_blogs:', error);
      return null;
    }

    if (data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.id,
        subtitle: data.description,
        author: {
          name: data.author || 'Team DietaryGuide',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        image: data.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        created_at: data.created_at || data.date,
        tags: data.category ? [data.category] : [],
        snippet: data.description,
        reading_time: 5,
        content: data.content || data.description
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
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

// Get all unique tags (using existing system)
export async function getAllTags(): Promise<string[]> {
  try {
    // Get tags from auto_blogs
    const { data: autoBlogsData, error } = await supabase
      .from('auto_blogs')
      .select('category')
      .eq('is_published', true);

    const autoBlogsTags = (autoBlogsData || [])
      .map(post => post.category)
      .filter(Boolean);

    // Get tags from static blogs
    const staticBlogsTags = blogs
      .map(blog => blog.category)
      .filter(Boolean);

    // Combine and deduplicate
    const allTags = [...autoBlogsTags, ...staticBlogsTags];
    return [...new Set(allTags)].sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}
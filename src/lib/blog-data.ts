import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('🔍 Fetching blog posts from Supabase...');

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error fetching posts:', error);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    if (!data) {
      console.log('📦 No data returned from Supabase');
      return [];
    }

    console.log(`📦 Fetched ${data.length} posts from Supabase`);

    // Map and validate the data with proper fallbacks
    const validatedPosts = data.map((post: any) => {
      try {
        return {
          id: post.id || '',
          title: post.title || 'Untitled Post',
          subtitle: post.subtitle || '',
          slug: post.slug || '',
          content: post.content || '',
          image: post.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
          tags: Array.isArray(post.tags) ? (post.tags as string[]).filter(tag => tag && typeof tag === 'string') : [],
          author_name: post.author_name || 'Dietary Guide',
          author_avatar_url: post.author_avatar_url || 'https://placehold.co/40x40.png',
          snippet: post.snippet || (post.content ? post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...' : ''),
          reading_time: post.reading_time || Math.ceil((post.content || '').split(' ').length / 200),
          created_at: post.created_at || new Date().toISOString(),
          updated_at: post.updated_at || new Date().toISOString(),
          author: {
            name: post.author_name || "Dietary Guide",
            avatarUrl: post.author_avatar_url || "https://placehold.co/40x40.png"
          }
        } as BlogPost;
      } catch (postError) {
        console.error('❌ Error processing post:', postError, post);
        return null;
      }
    }).filter(Boolean) as BlogPost[];

    console.log('✅ Successfully processed blog posts:', validatedPosts.length);
    return validatedPosts;
  } catch (error) {
    console.error('❌ Error in getBlogPosts:', error);
    throw error;
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    console.log('🔍 Fetching blog post by slug:', slug);

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('❌ Supabase error fetching post by slug:', error);
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    if (!data) {
      console.log('📦 No post found with slug:', slug);
      return undefined;
    }

    console.log('📦 Fetched post from Supabase:', data.title);

    // Map and validate the data with proper fallbacks (same as getBlogPosts)
    const validatedPost = {
      id: data.id,
      title: data.title || 'Untitled Post',
      subtitle: data.subtitle || '',
      slug: data.slug || '',
      content: data.content || '',
      image: data.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      tags: Array.isArray(data.tags) ? data.tags : [],
      author_name: data.author_name || 'Dietary Guide',
      author_avatar_url: data.author_avatar_url || 'https://placehold.co/40x40.png',
      snippet: data.snippet || (data.content ? data.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...' : ''),
      reading_time: data.reading_time || Math.ceil((data.content || '').split(' ').length / 200),
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      author: {
        name: data.author_name || "Dietary Guide",
        avatarUrl: data.author_avatar_url || "https://placehold.co/40x40.png"
      }
    } as BlogPost;

    console.log('✅ Successfully processed blog post');
    return validatedPost;
  } catch (error) {
    console.error('❌ Error in getBlogPostBySlug:', error);
    throw error;
  }
};

export const getAllTags = async (): Promise<string[]> => {
  try {
    console.log('🔍 Fetching tags from Supabase...');

    const { data, error } = await supabase
      .from('posts')
      .select('tags');

    if (error) {
      console.error('❌ Supabase error fetching tags:', error);
      throw new Error(`Failed to fetch tags: ${error.message}`);
    }

    if (!data) {
      console.log('📦 No data returned for tags');
      return [];
    }

    console.log(`📦 Fetched tags from ${data.length} posts`);

    // Safely extract tags with validation
    const allTags = data
      .filter(post => post && Array.isArray(post.tags))
      .flatMap(post => post.tags)
      .filter(tag => tag && typeof tag === 'string');

    const uniqueTags = [...new Set(allTags)].sort();
    console.log('✅ Successfully processed tags:', uniqueTags.length);
    return uniqueTags;
  } catch (error) {
    console.error('❌ Error in getAllTags:', error);
    throw error;
  }
};

// Create a new blog post
export async function createBlogPost(postData) {
  // Only include fields that exist in the table schema
  const postToInsert = {
    title: postData.title,
    subtitle: postData.subtitle || '',
    slug: postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
    content: postData.content,
    image: postData.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    tags: Array.isArray(postData.tags) ? postData.tags : [],
    author_name: postData.author_name || "Dr. Anya Sharma",
    author_avatar_url: postData.author_avatar_url || "https://placehold.co/40x40.png",
    snippet: postData.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
    reading_time: Math.ceil((postData.content || '').split(' ').length / 200),
  };

  const { data, error } = await supabase
    .from('posts')
    .insert([postToInsert])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update an existing blog post
export async function updateBlogPost(id, postData) {
  // Only include fields that exist in the table schema
  const postToUpdate = {
    title: postData.title,
    subtitle: postData.subtitle || '',
    slug: postData.slug,
    content: postData.content,
    image: postData.image,
    tags: Array.isArray(postData.tags) ? postData.tags : [],
    author_name: postData.author_name,
    author_avatar_url: postData.author_avatar_url,
    snippet: postData.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
    reading_time: Math.ceil((postData.content || '').split(' ').length / 200),
  };

  const { data, error } = await supabase
    .from('posts')
    .update(postToUpdate)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a blog post
export async function deleteBlogPost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';

// Working blog data functions copied from Firebase Studio (download 1)

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // The data from supabase needs to be mapped to our BlogPost type.
  // This is a simple example, you might need more complex mapping.
  return data.map((post: any) => ({
    ...post,
    author: {
        name: post.author_name || "Dietary Guide",
        avatarUrl: post.author_avatar_url || "https://placehold.co/40x40.png"
    }
  }));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return undefined;
  }

  if (!data) return undefined;

  return {
    ...data,
     author: {
        name: data.author_name || "Dietary Guide",
        avatarUrl: data.author_avatar_url || "https://placehold.co/40x40.png"
    }
  } as BlogPost;
};

export const getAllTags = async (): Promise<string[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('tags');

    if (error) {
        console.error('Error fetching tags:', error);
        return [];
    }

    const allTags = data.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
};
    }

    // Map Supabase data to BlogPost type using correct field names
    const post: BlogPost = {
      id: data.id,
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle,
      author: {
        name: data.author_name || 'Team DietaryGuide',
        avatarUrl: data.author_avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      image: data.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      created_at: data.created_at,
      updated_at: data.updated_at || data.created_at,
      tags: data.tags || [],
      snippet: data.snippet || generateSnippet(data.content || ''),
      reading_time: data.reading_time || calculateReadingTime(data.content || ''),
      content: data.content,
      published: data.published !== false,
      meta_title: data.meta_title || data.title,
      meta_description: data.meta_description || data.snippet || generateSnippet(data.content || '')
    };

    console.log(`✅ Found post: ${post.title}`);
    return post;
  } catch (error) {
    console.error('❌ Unexpected error fetching post:', error);
    return null;
  }
}

// Create a new blog post in Supabase
export async function createBlogPost(postData: CreateBlogPost): Promise<BlogPost> {
  const slug = slugify(postData.title);
  const readingTime = calculateReadingTime(postData.content);
  const snippet = generateSnippet(postData.content);

  try {
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
      console.error('❌ Error creating blog post:', error);
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
  } catch (error) {
    console.error('❌ Unexpected error creating post:', error);
    throw error;
  }
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

  try {
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postData.id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating blog post:', error);
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
  } catch (error) {
    console.error('❌ Unexpected error updating post:', error);
    throw error;
  }
}

// Delete a blog post from Supabase
export async function deleteBlogPost(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Error deleting blog post:', error);
      throw error;
    }

    console.log(`✅ Successfully deleted post with id: ${id}`);
  } catch (error) {
    console.error('❌ Unexpected error deleting post:', error);
    throw error;
  }
}

// Upload blog image to Supabase storage
export async function uploadBlogImage(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      console.error('❌ Error uploading image:', error);
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log(`✅ Successfully uploaded image: ${fileName}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error('❌ Unexpected error uploading image:', error);
    throw error;
  }
}

// Get all unique tags from Supabase posts
export async function getAllTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('tags');

    if (error) {
      console.error('❌ Error fetching tags:', error);
      return [];
    }

    const allTags = data.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(allTags)].sort();
    
    console.log(`✅ Found ${uniqueTags.length} unique tags`);
    return uniqueTags;
  } catch (error) {
    console.error('❌ Unexpected error fetching tags:', error);
    return [];
  }
}

// Test function to check Supabase connection and posts table
export async function testSupabaseConnection(): Promise<void> {
  console.log('🧪 Testing Supabase connection...');
  console.log('🧪 Using URL: https://qqnzqdrnqvoblyqeeoed.supabase.co');

  try {
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' });

    console.log('🧪 Supabase connection test results:');
    console.log('  - Error:', error);
    console.log('  - Total posts in table:', count);
    console.log('  - Sample data:', data?.slice(0, 2));
    console.log('  - All field names in first post:', data?.[0] ? Object.keys(data[0]) : 'No posts');

    if (data && data.length > 0) {
      console.log('  - All posts found:', data.length);
      console.log('  - First post structure:', data[0]);
    }
  } catch (err) {
    console.error('🧪 Supabase connection test failed:', err);
  }
}
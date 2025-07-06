import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

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

// Create a new blog post
export async function createBlogPost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      ...postData,
      slug: postData.slug || postData.title.toLowerCase().replace(/\s+/g, '-'),
      author_name: postData.author_name || "Dr. Anya Sharma",
      author_avatar_url: postData.author_avatar_url || "https://placehold.co/40x40.png",
      snippet: postData.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      reading_time: Math.ceil((postData.content || '').split(' ').length / 200),
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update an existing blog post
export async function updateBlogPost(id, postData) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...postData,
      snippet: postData.content?.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      reading_time: Math.ceil((postData.content || '').split(' ').length / 200),
    })
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
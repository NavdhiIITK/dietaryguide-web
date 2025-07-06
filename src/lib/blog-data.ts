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
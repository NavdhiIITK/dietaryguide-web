import type { BlogPost } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('auto_blogs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  // Map the auto_blogs data to our BlogPost type
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    slug: post.id, // Use id as slug for now
    subtitle: post.description,
    author: {
        name: post.author || "Dietary Guide",
        avatarUrl: "https://placehold.co/40x40.png"
    },
    image: post.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    created_at: post.created_at || post.date,
    tags: post.category ? [post.category] : [],
    snippet: post.description,
    reading_time: 5, // Default reading time
    content: post.content || post.description
  }));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from('auto_blogs')
    .select('*')
    .eq('id', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching post by slug:', error);
    return undefined;
  }
  
  if (!data) return undefined;

  return {
    id: data.id,
    title: data.title,
    slug: data.id,
    subtitle: data.description,
    author: {
        name: data.author || "Dietary Guide",
        avatarUrl: "https://placehold.co/40x40.png"
    },
    image: data.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    created_at: data.created_at || data.date,
    tags: data.category ? [data.category] : [],
    snippet: data.description,
    reading_time: 5,
    content: data.content || data.description
  };
};

export const getAllTags = async (): Promise<string[]> => {
    const { data, error } = await supabase
        .from('auto_blogs')
        .select('category')
        .eq('is_published', true);

    if (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
    
    const allTags = data.map(post => post.category).filter(Boolean);
    return [...new Set(allTags)].sort();
} 
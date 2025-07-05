export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  image: string;
  created_at: string;
  tags: string[];
  snippet: string;
  reading_time: number;
  content: string;
}

export interface CreateBlogPost {
  title: string;
  subtitle?: string;
  content: string;
  tags: string[];
  image: string;
  author_name: string;
  author_avatar: string;
}

export interface UpdateBlogPost extends Partial<CreateBlogPost> {
  id: string;
}

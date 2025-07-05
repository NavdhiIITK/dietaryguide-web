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
  created_at: string; // ISO 8601 string
  tags: string[];
  snippet: string;
  reading_time: number; // in minutes
  content: string; // HTML content
} 
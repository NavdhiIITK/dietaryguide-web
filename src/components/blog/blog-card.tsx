import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This prevents a hydration mismatch by formatting the date only on the client.
    setFormattedDate(format(new Date(post.created_at), 'dd/MM/yyyy'));
  }, [post.created_at]);

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="flex flex-col gap-4">
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <time dateTime={post.created_at}>
                    {formattedDate}
                </time>
                {post.tags[0] && (
                    <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 font-medium">{post.tags[0]}</Badge>
                )}
            </div>
            <h3 className="font-headline text-xl leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h3>
        </div>
      </div>
    </Link>
  );
} 
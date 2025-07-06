import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Clock, User } from 'lucide-react';

interface BlogCardComponentProps {
  post: BlogPost;
}

export function BlogCardComponent({ post }: BlogCardComponentProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This prevents a hydration mismatch by formatting the date only on the client.
    try {
      setFormattedDate(format(new Date(post.created_at), 'dd/MM/yyyy'));
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate('Invalid Date');
    }
  }, [post.created_at]);

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="flex flex-col gap-4">
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
            }}
          />
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Date and Primary Tag */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <time dateTime={post.created_at} className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </time>
            {post.tags[0] && (
              <Badge 
                variant="outline" 
                className="border-primary/50 text-primary bg-primary/10 font-medium"
              >
                {post.tags[0]}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-headline text-xl leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Subtitle/Snippet */}
          {post.subtitle && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {post.subtitle}
            </p>
          )}

          {/* Author and Reading Time */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face';
                }}
              />
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>

          {/* Additional Tags */}
          {post.tags.length > 1 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {post.tags.slice(1, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

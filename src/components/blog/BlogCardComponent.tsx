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
      if (post.created_at) {
        setFormattedDate(format(new Date(post.created_at), 'dd/MM/yyyy'));
      } else {
        setFormattedDate('No date');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate('Invalid Date');
    }
  }, [post.created_at]);

  // Safe access to tags array
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const primaryTag = tags[0];
  const additionalTags = tags.slice(1, 3);

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="flex flex-col gap-4">
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <img
            src={post.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'}
            alt={post.title || 'Blog post image'}
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
            {primaryTag && (
              <Badge 
                variant="outline" 
                className="border-primary/50 text-primary bg-primary/10 font-medium"
              >
                {primaryTag}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-headline text-xl leading-snug group-hover:text-primary transition-colors overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {post.title || 'Untitled Post'}
          </h3>

          {/* Subtitle/Snippet */}
          {post.subtitle && (
            <p className="text-muted-foreground text-sm overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {post.subtitle}
            </p>
          )}

          {/* Author and Reading Time */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <img
                src={post.author?.avatarUrl || 'https://github.com/amishardev/navdhiweb/blob/main/Untitled%20design%20(15).png?raw=true'}
                alt={post.author?.name || 'Author'}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://github.com/amishardev/navdhiweb/blob/main/Untitled%20design%20(15).png?raw=true';
                }}
              />
              <span className="font-medium">{post.author?.name || 'Dietary Guide'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.reading_time || 5} min read</span>
            </div>
          </div>

          {/* Additional Tags */}
          {additionalTags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {additionalTags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

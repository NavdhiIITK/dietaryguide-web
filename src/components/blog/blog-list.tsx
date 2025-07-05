import { useState, useMemo } from 'react';
import type { BlogPost } from '@/types';
import { BlogCard } from './blog-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
}

const filterTags = ['All', 'Nutrition', 'Diet', 'Fitness', 'Wellness', 'Health'];

export function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return posts;
    return posts.filter(post => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-12 md:mb-16 space-y-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline">
          Nutrition & Wellness Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Evidence-based articles on health, nutrition, fitness, and wellness to help you make informed decisions.
        </p>
      </div>

      <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold font-headline">Latest Articles</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {filterTags.map(tag => (
            <Button
              key={tag}
              variant={activeTag === tag ? 'default' : 'outline'}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full px-5 transition-colors",
                activeTag === tag 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-transparent border-foreground/30 hover:bg-foreground/10'
              )}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline mb-2">No Posts Found</h2>
          <p className="text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
} 
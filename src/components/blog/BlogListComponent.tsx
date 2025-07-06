import { useState, useMemo } from 'react';
import { BlogPost } from '@/types/blog';
import { BlogCardComponent } from './BlogCardComponent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogListComponentProps {
  posts: BlogPost[];
  tags: string[];
}

const filterTags = ['All', 'Nutrition', 'Diet', 'Fitness', 'Wellness', 'Health', 'Weight Loss', 'Protein', 'Meal Plan', 'Indian Diet'];

export function BlogListComponent({ posts, tags }: BlogListComponentProps) {
  const [activeTag, setActiveTag] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return posts;
    return posts.filter(post => {
      // Safe check for tags array
      const postTags = Array.isArray(post.tags) ? post.tags : [];
      return postTags.includes(activeTag);
    });
  }, [posts, activeTag]);

  // Combine predefined tags with dynamic tags from database
  const allTags = useMemo(() => {
    const combinedTags = [...filterTags];
    const validTags = Array.isArray(tags) ? tags : [];
    validTags.forEach(tag => {
      if (!combinedTags.includes(tag)) {
        combinedTags.push(tag);
      }
    });
    return combinedTags;
  }, [tags]);

  // Safe check for posts array
  const validPosts = Array.isArray(posts) ? posts : [];
  const validFilteredPosts = Array.isArray(filteredPosts) ? filteredPosts : [];

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
          {allTags.map(tag => (
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
      
      {validFilteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {validFilteredPosts.map(post => (
            <BlogCardComponent key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline mb-2">No Posts Found</h2>
          <p className="text-muted-foreground mb-4">
            {activeTag === 'All' 
              ? 'No blog posts available at the moment.' 
              : `No posts found for "${activeTag}". Try adjusting your filters.`
            }
          </p>
          {activeTag !== 'All' && (
            <Button
              variant="outline"
              onClick={() => setActiveTag('All')}
              className="rounded-full"
            >
              View All Posts
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

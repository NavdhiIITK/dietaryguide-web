import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogListComponent } from '@/components/blog/BlogListComponent';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import SEOOptimizer from "@/components/SEOOptimizer";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('BlogListPage: Fetching posts from Supabase...');
      const postsData = await getBlogPosts();
      
      // Only show posts that have valid data from Supabase (same logic as admin)
      const validPosts = postsData.filter(post => 
        post && 
        post.id && 
        post.title && 
        post.slug
      );
      
      console.log(`BlogListPage: Found ${validPosts.length} valid posts from Supabase`);
      setPosts(validPosts);

      // Fetch tags separately
      const tagsData = await getAllTags();
      setTags(tagsData || []);
    } catch (error) {
      console.error('BlogListPage: Error fetching posts:', error);
      setError('Failed to load blog posts from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRetry = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={handleRetry} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Fallback UI if no posts (same logic as admin)
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No blog posts found.</AlertDescription>
            </Alert>
            <Button onClick={handleRetry} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOOptimizer
        title="Nutrition & Wellness Blog - DietaryGuide"
        description="Evidence-based articles on health, nutrition, fitness, and wellness to help you make informed decisions about your diet and lifestyle."
        keywords="nutrition blog, diet tips, fitness advice, wellness articles, healthy eating, dietary guidance, indian diet, meal planning"
        url="/blog"
        type="website"
      />

      <Navbar />

      <main className="flex-1">
        <BlogListComponent posts={posts} tags={tags} />
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage; 
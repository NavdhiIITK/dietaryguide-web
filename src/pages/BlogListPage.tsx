import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogListComponent } from '@/components/blog/BlogListComponent';
import { getBlogPosts, getAllTags, testSupabaseConnection } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import SEOOptimizer from "@/components/SEOOptimizer";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Test Supabase connection first
      await testSupabaseConnection();

      const [postsData, tagsData] = await Promise.all([
        getBlogPosts(),
        getAllTags()
      ]);

      // Debug log for Supabase fetch
      console.log('🔍 BlogListPage: Supabase posts fetch result:', postsData);
      console.log('🔍 BlogListPage: Supabase tags fetch result:', tagsData);
      console.log('🔍 BlogListPage: Posts count:', postsData?.length || 0);

      // Show all posts (remove published filter for debugging)
      setPosts(postsData || []);
      setTags(tagsData || []);
    } catch (error) {
      console.error('BlogListPage: Error fetching blog data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load blog posts: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
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

  // Fallback UI if no posts
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
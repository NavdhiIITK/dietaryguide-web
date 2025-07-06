import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogListComponent } from '@/components/blog/BlogListComponent';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import SEOOptimizer from "@/components/SEOOptimizer";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('BlogListPage: Starting to fetch blog data...');
      const [postsData, tagsData] = await Promise.all([
        getBlogPosts(),
        getAllTags()
      ]);

      console.log('BlogListPage: Fetched posts:', postsData.length);
      console.log('BlogListPage: Fetched tags:', tagsData);

      // Only set posts that are actually published and have valid data
      const validPosts = postsData.filter(post => 
        post && 
        post.published && 
        post.title && 
        post.slug && 
        post.content
      );

      console.log('BlogListPage: Valid posts:', validPosts.length);
      
      setPosts(validPosts);
      setTags(tagsData);
    } catch (error) {
      console.error('BlogListPage: Error fetching blog data:', error);
      setError('Failed to load blog posts. Please try again later.');
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
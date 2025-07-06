import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogListComponent } from '@/components/blog/BlogListComponent';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import SEOOptimizer from "@/components/SEOOptimizer";

const BlogListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 BlogListPage: Starting to fetch blog data...');
      const postsData = await getBlogPosts();
      const tagsData = await getAllTags();

      console.log('📦 BlogListPage: Posts received:', postsData);
      console.log('📦 BlogListPage: Posts count:', postsData?.length || 0);
      console.log('📦 BlogListPage: Tags received:', tagsData);

      // Safe validation of data
      const validPosts = Array.isArray(postsData) ? postsData : [];
      const validTags = Array.isArray(tagsData) ? tagsData : [];

      setPosts(validPosts);
      setTags(validTags);
    } catch (err: any) {
      console.error('❌ BlogListPage error:', err);
      setError(err.message || 'Failed to load blog posts. Please try again later.');
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
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
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
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Posts</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={handleRetry} 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-xl font-semibold mb-2">No Blog Posts</h2>
            <p className="text-muted-foreground mb-4">No blog posts found at the moment.</p>
            <button 
              onClick={handleRetry} 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
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
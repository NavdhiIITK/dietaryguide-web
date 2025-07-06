import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

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
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-12 md:mb-16 space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Nutrition & Wellness Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Evidence-based articles on health, nutrition, fitness, and wellness to help you make informed decisions.
            </p>
          </div>

          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map(post => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="mb-4">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'}
                      alt={post.title || 'Blog post'}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {post.title || 'Untitled Post'}
                    </h3>
                    
                    {post.subtitle && (
                      <p className="text-muted-foreground">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author?.name || 'Dietary Guide'}</span>
                      <span>{post.reading_time || 5} min read</span>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage; 
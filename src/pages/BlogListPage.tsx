import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogListComponent } from '@/components/blog/BlogListComponent';
import { supabase } from '../lib/supabase-client'; // We'll create this for direct credentials
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SEOOptimizer from "@/components/SEOOptimizer";

const BlogListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        const mapped = (data || []).map((post: any) => ({
          ...post,
          author: {
            name: post.author_name || 'Dietary Guide',
            avatarUrl: post.author_avatar_url || 'https://placehold.co/40x40.png',
          },
          tags: Array.isArray(post.tags) ? post.tags : [],
          image: post.image || 'https://placehold.co/600x400.png',
          snippet: post.snippet || '',
          reading_time: post.reading_time || 1,
          content: post.content || '',
        }));
        setPosts(mapped);
        // Tags
        const allTags = (data || []).flatMap((post: any) => post.tags || []);
        setTags([...new Set(allTags)].filter(Boolean).map(String).sort());
      } catch (err: any) {
        setError(err.message || 'Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
            <Button onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
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
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No blog posts found.</AlertDescription>
            </Alert>
            <Button onClick={() => window.location.reload()} className="gap-2">
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
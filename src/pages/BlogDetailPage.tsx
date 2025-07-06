import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { supabase } from '../lib/supabase-client';
import { Skeleton } from "@/components/ui/skeleton";
import SEOOptimizer from "@/components/SEOOptimizer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();
        if (error) throw error;
        if (data && data.published !== false) {
          setPost({
            ...data,
            author: {
              name: data.author_name || 'Dietary Guide',
              avatarUrl: data.author_avatar_url || 'https://placehold.co/40x40.png',
            },
            tags: Array.isArray(data.tags) ? data.tags : [],
            image: data.image || 'https://placehold.co/600x400.png',
            snippet: data.snippet || '',
            reading_time: data.reading_time || 1,
            content: data.content || '',
          });
        } else {
          setNotFound(true);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load the blog post.');
        console.error('BlogDetailPage Supabase error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-10 w-32 mb-6" />
              <Skeleton className="h-64 md:h-96 w-full rounded-xl mb-8" />
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-2/3 mb-6" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
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

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <Alert variant="default" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Blog post not found or not published.</AlertDescription>
            </Alert>
            <Button onClick={handleRetry} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
            <a 
              href="/blog" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4"
            >
              Back to Blog
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOOptimizer
        title={`${post.title} - DietaryGuide`}
        description={post.snippet}
        keywords={post.tags.join(', ')}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.created_at}
        author={post.author.name}
      />
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <BlogDetail post={post} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;

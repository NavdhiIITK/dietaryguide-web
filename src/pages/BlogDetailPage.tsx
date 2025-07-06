import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug } from '@/lib/blog-data';
import { Skeleton } from "@/components/ui/skeleton";
import SEOOptimizer from "@/components/SEOOptimizer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, ChevronLeft, CalendarDays, Clock, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';

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
        console.log('🔍 BlogDetailPage: Fetching post with slug:', slug);
        const postData = await getBlogPostBySlug(slug);

        console.log('📦 BlogDetailPage: Post received:', postData);

        if (postData) {
          setPost(postData);
        } else {
          setNotFound(true);
        }
      } catch (err: any) {
        console.error('❌ BlogDetailPage error:', err);
        setError(err.message || 'Failed to load the blog post.');
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
            <Link 
              to="/blog" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4"
            >
              Back to Blog
            </Link>
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
        keywords={post.tags?.join(', ') || ''}
        image={post.image}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.created_at}
        author={post.author?.name || 'Dietary Guide'}
      />
      <Navbar />
      <main className="flex-1">
        <article className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back button */}
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              <ChevronLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && Array.isArray(post.tags) && post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="border-transparent">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {post.title || 'Untitled Post'}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground mt-2">
                {post.subtitle}
              </p>
            )}

            {/* Author and meta info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={post.author?.avatarUrl || post.author_avatar_url} 
                    alt={post.author?.name || post.author_name || 'Author'} 
                  />
                  <AvatarFallback>
                    <UserCircle />
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">
                  {post.author?.name || post.author_name || 'Dietary Guide'}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.created_at}>
                  {post.created_at ? format(new Date(post.created_at), 'MMMM d, yyyy') : 'Unknown date'}
                </time>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time || 5} min read</span>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 md:my-12 shadow-lg">
            <img
              src={post.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'}
              alt={post.title || 'Blog post image'}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
              }}
            />
          </div>

          {/* Article content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border"
            dangerouslySetInnerHTML={{ __html: post.content || 'No content available.' }}
          />

          {/* Article footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage 
                    src={post.author?.avatarUrl || post.author_avatar_url} 
                    alt={post.author?.name || post.author_name || 'Author'} 
                  />
                  <AvatarFallback>
                    {(post.author?.name || post.author_name || 'DG').split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {post.author?.name || post.author_name || 'Dietary Guide'}
                  </p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link to="/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;

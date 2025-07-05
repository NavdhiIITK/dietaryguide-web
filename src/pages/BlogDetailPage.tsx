import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { getBlogPostBySlug } from "@/lib/blog-data";
import { BlogPost } from "@/types/blog";
import { Skeleton } from "@/components/ui/skeleton";
import SEOOptimizer from "@/components/SEOOptimizer";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const postData = await getBlogPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <a 
              href="/blog" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
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

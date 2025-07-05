import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { blogs } from "@/data/blogs";
import { supabase } from "@/integrations/supabase/client";
import FAQInteraction from "@/components/FAQInteraction";
import SEOOptimizer from "@/components/SEOOptimizer";

interface Content {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  author: string;
  excerpt?: string;
  readingTime?: string;
}

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isRecipe = window.location.pathname.includes('/recipes/');
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) {
        console.log("No ID provided");
        setLoading(false);
        return;
      }

      console.log("Looking for blog with ID:", id);
      console.log("Available static blog IDs:", blogs.map(b => b.id));

      // First, try to find the article in the static blogs array
      const staticBlog = blogs.find(article => article.id === id);

      if (staticBlog) {
        console.log("Found static blog:", staticBlog.title);
        console.log("Content length:", staticBlog.content?.length || 0);
        console.log("Content preview:", staticBlog.content?.substring(0, 100));

        setContent({
          id: staticBlog.id,
          title: staticBlog.title,
          content: staticBlog.content || "",
          date: staticBlog.date,
          category: staticBlog.category || "",
          imageUrl: staticBlog.imageUrl,
          author: staticBlog.author || "Team DietaryGuide",
          excerpt: staticBlog.excerpt,
          readingTime: staticBlog.readingTime
        });
        setLoading(false);
        return;
      }

      // If not found in static blogs, try to fetch from Supabase
      try {
        const { data, error } = await supabase
          .from('auto_blogs')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) {
          console.error("Error fetching blog from Supabase:", error);
          setContent(null);
        } else if (data) {
          setContent({
            id: data.id,
            title: data.title,
            content: data.content,
            date: data.date || new Date().toISOString(),
            category: data.category || "",
            imageUrl: data.image || "/images/default-blog.jpg",
            author: data.author || "Team DietaryGuide",
            excerpt: data.description
          });
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const goBack = () => {
    if (isRecipe) {
      navigate('/recipes');
    } else {
      navigate('/blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
          <Button variant="ghost" className="mb-8" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isRecipe ? "Recipes" : "Blog"}
          </Button>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-72 w-full mb-8 rounded-2xl" />
            <div className="p-8">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
          <Button variant="ghost" className="mb-8" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isRecipe ? "Recipes" : "Blog"}
          </Button>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Content Not Found</h2>
            <p className="mb-8 text-lg text-foreground/70">We couldn't find the content you're looking for. It may have been removed or you might have followed a broken link.</p>
            <Button onClick={goBack} className="px-8 py-3 rounded-lg">Return to Blog</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOOptimizer
        title={content.title}
        description={content.excerpt || content.content.substring(0, 160) + "..."}
        keywords="Daily protein intake India, ICMR protein guidelines, best Indian protein foods, vegetarian protein sources India, high protein Indian meals, protein combining, protein deficiency, protein FAQs India"
        image={content.imageUrl}
        url={`/blog/${content.id}`}
        type="article"
        publishedTime={content.date}
        author={content.author}
        schemaType="Article"
        schemaData={{
          headline: content.title,
          description: content.excerpt || content.content.substring(0, 160) + "...",
          image: content.imageUrl,
          author: content.author,
          datePublished: content.date,
          dateModified: content.date,
          publisher: "DietaryGuide",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${window.location.origin}/blog/${content.id}`
          }
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: content.title, url: `/blog/${content.id}` }
        ]}
      />
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1">
        <Button variant="ghost" className="mb-8" onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>
        <div className="max-w-4xl mx-auto bg-background rounded-2xl shadow-lg overflow-hidden">
          <div className="h-72 w-full overflow-hidden">
            <img src={content.imageUrl} alt={content.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">{content.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-foreground/70 mb-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {content.date}</span>
              {content.author && <span className="flex items-center gap-2"><User className="w-4 h-4" /> {content.author}</span>}
              {content.category && <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {content.category}</span>}
              {content.readingTime && <span className="flex items-center gap-2">📖 {content.readingTime}</span>}
            </div>
            {/* Test with simple text first */}
            <div className="blog-article max-w-none text-foreground/90">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Content Test</h2>
              <p className="text-white mb-4">This is a test paragraph to ensure styling works.</p>

              {content.content ? (
                <>
                  <h3 className="text-xl font-semibold text-green-300 mb-2">Raw HTML Content:</h3>
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  />
                </>
              ) : (
                <div>
                  <p className="text-red-400">No content available for this article.</p>
                  <p className="text-gray-400 mt-2">Content ID: {content.id}</p>
                  <p className="text-gray-400">Title: {content.title}</p>
                </div>
              )}
            </div>

            {/* Debug info - always show for now */}
            <div className="mt-4 p-4 bg-gray-800 text-white text-sm rounded">
              <p><strong>Debug Info:</strong></p>
              <p>Content length: {content.content?.length || 0}</p>
              <p>Has content: {!!content.content}</p>
              <p>Content type: {typeof content.content}</p>
              {content.content && (
                <p>Content preview: {content.content.substring(0, 200)}...</p>
              )}
            </div>
            <FAQInteraction />
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .blog-article {
          text-align: left !important;
          line-height: 1.7 !important;
          color: #e5e7eb !important;
          font-size: 16px !important;
        }
        .blog-article * {
          color: #e5e7eb !important;
        }
        .blog-article h1, .blog-article h2, .blog-article h3, .blog-article h4, .blog-article h5, .blog-article h6 {
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          font-weight: 600 !important;
          color: #f3f4f6 !important;
        }
        .blog-article h2 {
          font-size: 1.5rem !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          padding-bottom: 0.5rem !important;
          color: #22c55e !important;
        }
        .blog-article h3 {
          font-size: 1.25rem !important;
          color: #22c55e !important;
        }
        .blog-article p {
          margin-bottom: 1rem !important;
          color: #e5e7eb !important;
          line-height: 1.7 !important;
        }
        .blog-article ul, .blog-article ol {
          margin-bottom: 1rem !important;
          padding-left: 1.5rem !important;
        }
        .blog-article li {
          margin-bottom: 0.5rem !important;
          color: #e5e7eb !important;
        }
        .blog-article table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1rem 0 !important;
        }
        .blog-article th, .blog-article td {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 0.75rem !important;
          text-align: left !important;
          color: #e5e7eb !important;
        }
        .blog-article th {
          background-color: rgba(255, 255, 255, 0.1) !important;
          font-weight: 600 !important;
          color: #f3f4f6 !important;
        }
        .blog-article .highlight {
          background-color: rgba(34, 197, 94, 0.1) !important;
          border-left: 4px solid #22c55e !important;
          padding: 1rem !important;
          margin: 1rem 0 !important;
          border-radius: 0.5rem !important;
        }
        .blog-article .day-plan {
          background-color: rgba(255, 255, 255, 0.05) !important;
          padding: 1rem !important;
          margin: 0.5rem 0 !important;
          border-radius: 0.5rem !important;
          border-left: 3px solid #22c55e !important;
        }
        .blog-article strong {
          font-weight: 600 !important;
          color: #22c55e !important;
        }
        .blog-article em {
          font-style: italic !important;
          color: #fbbf24 !important;
        }
        .blog-article div {
          color: #e5e7eb !important;
        }
        .blog-content {
          color: #e5e7eb !important;
          font-size: 16px !important;
          line-height: 1.7 !important;
        }
        .blog-content * {
          color: #e5e7eb !important;
        }
        .blog-content h2 {
          color: #22c55e !important;
          font-size: 1.5rem !important;
          margin: 2rem 0 1rem 0 !important;
        }
        .blog-content p {
          margin-bottom: 1rem !important;
          color: #e5e7eb !important;
        }
      `}</style>
    </div>
  );
};

export default ContentDetailPage;

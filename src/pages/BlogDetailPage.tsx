import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { blogs } from "@/data/blogs";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  imageUrl: string;
  content?: string;
  author?: string;
  readingTime?: string;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      // First, try to find the article in the static blogs array
      const staticBlog = blogs.find(article => article.id === id);

      if (staticBlog) {
        setBlog({
          id: staticBlog.id,
          title: staticBlog.title,
          excerpt: staticBlog.excerpt,
          date: staticBlog.date,
          category: staticBlog.category,
          imageUrl: staticBlog.imageUrl,
          content: staticBlog.content,
          author: staticBlog.author,
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
          setBlog(null);
        } else if (data) {
          setBlog({
            id: data.id,
            title: data.title,
            excerpt: data.description,
            date: data.date || new Date().toISOString(),
            category: data.category,
            imageUrl: data.image || "/images/default-blog.jpg",
            author: data.author,
            content: data.content
          });
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const renderWithBold = (text: string) => {
    if (!text.includes('**')) {
      return text;
    }
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
    );
  };

  const extractFAQ = (content: string) => {
    const contentParts = content.split('[FAQ]');
    const mainContent = contentParts[0];
    const faqContent = contentParts.length > 1 ? contentParts[1].replace('[/FAQ]', '').trim() : null;

    const faqItems = faqContent
      ? faqContent.split('--').map((qa) => {
          const parts = qa.trim().split('\n');
          const question = parts[0]?.replace('Q: ', '').trim() || '';
          const answer = parts.slice(1).join('\n').replace('A: ', '').trim() || '';
          return { question, answer };
        }).filter(item => item.question && item.answer)
      : [];

    return { mainContent, faqItems };
  };

  // Utility to remove AI image prompt and Final Takeaway blocks from HTML content
  function cleanBlogHtml(html: string): string {
    // Remove <h2>📸 Image Prompt</h2> and the next <p> or <div> (the prompt)
    let cleaned = html.replace(/<h2[^>]*>[^<]*📸 Image Prompt[^<]*<\/h2>\s*(<p[^>]*>.*?<\/p>|<div[^>]*>.*?<\/div>)/is, '');
    // Remove <h2>🧘 Final Takeaway</h2> (or similar) and the following <p> or <div> (the SEO block)
    cleaned = cleaned.replace(/<h2[^>]*>[^<]*Final Takeaway[^<]*<\/h2>\s*(<p[^>]*>.*?<\/p>|<div[^>]*>.*?<\/div>)/is, '');
    return cleaned;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
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

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Blog Post Not Found</h2>
            <p className="mb-8 text-lg text-foreground/70">We couldn't find the blog post you're looking for. It may have been removed or you might have followed a broken link.</p>
            <Button onClick={() => navigate('/blog')} className="px-8 py-3 rounded-lg">Return to Blog</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { mainContent, faqItems } = blog.content ? extractFAQ(blog.content) : { mainContent: '', faqItems: [] };
  const cleanedContent = cleanBlogHtml(mainContent);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.category && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/50 font-medium">
                  {blog.category}
                </span>
              )}
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-left">
              {blog.title}
            </h1>
            {blog.excerpt && <p className="text-lg md:text-xl text-muted-foreground mt-2 text-left">{blog.excerpt}</p>}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt={blog.author || "Author"} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{blog.author || "Team DietaryGuide"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
              </div>
              {blog.readingTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readingTime}</span>
                </div>
              )}
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 md:my-12 shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Render cleaned HTML content, left-aligned */}
          <div className="blog-content text-left" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
          
          {faqItems.length > 0 && (
            <div className="mt-8 text-left">
              <h2 className="font-headline text-2xl md:text-3xl font-bold mt-10 mb-6 text-left">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex items-start mb-2">
                      <span className="mr-2 text-xl">❓</span>
                      <span className="font-semibold text-lg md:text-xl leading-snug">{item.question}</span>
                    </div>
                    <div className="flex items-start ml-7">
                      <span className="mr-2 text-lg">✅</span>
                      <span className="text-base leading-relaxed">{item.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 
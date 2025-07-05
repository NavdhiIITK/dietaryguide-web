import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Clock, ChevronLeft, UserCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { blogs } from "@/data/blogs";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { BlogPost } from '@/types';
import { getBlogPostBySlug } from '@/lib/blog-data';

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
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        const postData = await getBlogPostBySlug(slug);
        if (!postData) {
          setError('Post not found');
        } else {
          setPost(postData);
        }
      } catch (err) {
        setError('Error loading post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const renderWithBold = (text: string) => {
    if (!text.includes('**')) {
      return text;
    }
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
    );
  };

  const extractFAQ = (content: string) => {
    // First try the old format with [FAQ] tags
    const contentParts = content.split('[FAQ]');
    if (contentParts.length > 1) {
    const mainContent = contentParts[0];
      const faqContent = contentParts[1].replace('[/FAQ]', '').trim();

    const faqItems = faqContent
      ? faqContent.split('--').map((qa) => {
          const parts = qa.trim().split('\n');
          const question = parts[0]?.replace('Q: ', '').trim() || '';
          const answer = parts.slice(1).join('\n').replace('A: ', '').trim() || '';
          return { question, answer };
        }).filter(item => item.question && item.answer)
      : [];

    return { mainContent, faqItems };
    }

    // Try to extract FAQ from HTML content with faq-section class
    const faqSectionMatch = content.match(/<section class="faq-section">([\s\S]*?)<\/section>/i);
    if (faqSectionMatch) {
      const faqSection = faqSectionMatch[1];
      const mainContent = content.replace(/<section class="faq-section">[\s\S]*?<\/section>/i, '');
      
      // Extract FAQ items from the HTML structure
      const faqItemMatches = faqSection.match(/<div class="faq-q">([^<]+)<\/div>\s*<div class="faq-a">([^<]+)<\/div>/gi);
      const faqItems = faqItemMatches ? faqItemMatches.map(match => {
        const questionMatch = match.match(/<div class="faq-q">([^<]+)<\/div>/i);
        const answerMatch = match.match(/<div class="faq-a">([^<]+)<\/div>/i);
        return {
          question: questionMatch ? questionMatch[1].trim() : '',
          answer: answerMatch ? answerMatch[1].trim() : ''
        };
      }).filter(item => item.question && item.answer) : [];

      return { mainContent, faqItems };
    }

    return { mainContent: content, faqItems: [] };
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

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Post Not Found</h2>
            <p className="mb-8 text-lg text-foreground/70">{error || 'The requested post could not be found.'}</p>
            <Link to="/blog" className="text-primary hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { mainContent, faqItems } = post.content ? extractFAQ(post.content) : { mainContent: '', faqItems: [] };
  const cleanedContent = cleanBlogHtml(mainContent);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <article className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              <ChevronLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>

          {/* Enhanced Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border-transparent">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>
            )}
            
            {/* Enhanced Author and Metadata */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-t border-b border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {post.author.name ? post.author.name.split(' ').map(n => n[0]).join('') : 'TD'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{post.author.name || "Team DietaryGuide"}</span>
                  <span className="text-sm text-muted-foreground">Nutrition Expert</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.created_at}>
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8 md:my-12 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Enhanced Content Rendering */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content text-left leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: cleanedContent }} 
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
            <h3 className="font-headline text-xl font-bold mb-4 text-primary flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>The 30-30-30 rule combines morning protein intake with gentle exercise for sustainable weight loss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Perfect for busy Indians who want effective health strategies without complex routines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Focuses on habit formation rather than restrictive dieting for long-term success</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Adaptable to Indian lifestyle, climate, and cultural eating patterns</span>
              </li>
            </ul>
          </div>
          
          {/* Enhanced FAQ Section */}
          {faqItems.length > 0 && (
            <div className="mt-12">
              <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="bg-muted/30 rounded-xl p-6">
                <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-b border-border/50 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
              </div>
            </div>
          )}

          {/* Related Articles Section */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <h3 className="font-headline text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-semibold mb-2">Protein Power: Meet Your Daily Protein Needs</h4>
                <p className="text-sm text-muted-foreground">Discover the best Indian protein sources for optimal health...</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-semibold mb-2">Mindful Eating in Indian Culture</h4>
                <p className="text-sm text-muted-foreground">Transform your relationship with food through mindfulness...</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 
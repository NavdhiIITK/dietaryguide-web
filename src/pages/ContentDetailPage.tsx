
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Content {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  author: string;
}

// Import curated blogs from BlogPage for local content access
// This allows us to show the blogs that are hardcoded in BlogPage.tsx
import { curatedBlogs } from "@/pages/BlogPage";

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isRecipe = window.location.pathname.includes('/recipes/');

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) {
        setError("No content ID provided");
        setLoading(false);
        return;
      }
      
      console.log("Fetching content for ID:", id);
      
      // First, check if the ID matches any of our curated content
      // Use case-insensitive comparison to be more resilient against URL variations
      const curatedContent = curatedBlogs.find(
        blog => blog.id.toLowerCase() === id.toLowerCase()
      );
      
      if (curatedContent) {
        console.log("Found curated content:", curatedContent.title);
        // Handle curated content
        setContent({
          id: curatedContent.id,
          title: curatedContent.title,
          content: curatedContent.content || curatedContent.excerpt,
          date: curatedContent.date,
          category: curatedContent.category,
          imageUrl: curatedContent.imageUrl || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          author: 'DietaryGuide Team'
        });
        setLoading(false);
        return;
      }
      
      // If not found in curated content, try to fetch from database
      try {
        // Check if the ID is a valid UUID format before querying
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        
        if (!uuidRegex.test(id)) {
          console.log("Not a valid UUID, checking for slug match in curated blogs");
          // Additional check for any slug-based matches in case URL format is different
          const slugMatch = curatedBlogs.find(blog => {
            // Create a slug from the title and check if it matches
            const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return slug === id.toLowerCase();
          });
          
          if (slugMatch) {
            setContent({
              id: slugMatch.id,
              title: slugMatch.title,
              content: slugMatch.content || slugMatch.excerpt,
              date: slugMatch.date,
              category: slugMatch.category,
              imageUrl: slugMatch.imageUrl || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
              author: 'DietaryGuide Team'
            });
            setLoading(false);
            return;
          }
          
          // Not found in any format
          setError("Content not found");
          setLoading(false);
          return;
        }
        
        console.log("Fetching from database with UUID:", id);
        const { data, error } = await supabase
          .from('auto_blogs')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (!data) {
          setError("Content not found");
          return;
        }
        
        console.log("Database content found:", data.title);
        setContent({
          id: data.id,
          title: data.title,
          content: data.content,
          date: new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          category: data.category,
          imageUrl: data.image || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          author: data.author || 'DietaryGuide Team'
        });
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
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

  const formatContent = (content: string) => {
    if (!content) return null;
    
    // Split the content by paragraphs or sections
    const parts = content.split('\n\n').map(part => part.trim());
    
    return parts.map((paragraph, index) => {
      // Handle bold text with ** markers
      const processBoldText = (text: string) => {
        if (!text.includes('**')) return text;
        
        return <span dangerouslySetInnerHTML={{ 
          __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        }} />;
      };
      
      // Handle numbered lists with format "1. Text" or "1. **Bold** Text"
      if (/^\d+\.\s/.test(paragraph)) {
        const number = paragraph.match(/^\d+\./)?.[0] || '';
        const content = paragraph.substring(number.length + 1).trim();
        return (
          <div key={index} className="flex gap-2 mb-4">
            <span className="font-bold min-w-[24px]">{number}</span>
            <div className="flex-1">
              {processBoldText(content)}
              
              {/* Handle sub-bullets that might follow a numbered item */}
              {paragraph.includes('\n* ') && (
                <ul className="ml-2 mt-2 list-disc">
                  {paragraph.split('\n* ').slice(1).map((item, i) => (
                    <li key={i} className="ml-4 mb-1">{processBoldText(item)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      }
      
      // Handle headings - we need to check for this before bullet points
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-green-800 dark:text-green-300">{processBoldText(paragraph.substring(2))}</h2>;
      } 
      
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-green-700 dark:text-green-400">{processBoldText(paragraph.substring(3))}</h3>;
      }
      
      if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-bold mt-5 mb-2 text-green-600 dark:text-green-500">{processBoldText(paragraph.substring(4))}</h4>;
      }
      
      // Handle bullet lists (might include nested items)
      if (paragraph.startsWith('* ')) {
        const items = paragraph.split('\n* ');
        return (
          <ul key={index} className="ml-6 mb-4 list-disc">
            {items.filter(item => item.trim()).map((item, i) => {
              // For the first item, remove the initial "* "
              const itemText = i === 0 ? item.substring(2) : item;
              return <li key={i} className="mb-2">{processBoldText(itemText)}</li>;
            })}
          </ul>
        );
      }
      
      // Handle bullet points with dashes
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n- ');
        return (
          <ul key={index} className="ml-6 mb-4 list-disc">
            {items.filter(item => item.trim()).map((item, i) => {
              // For the first item, remove the initial "- "
              const itemText = i === 0 ? item.substring(2) : item;
              return <li key={i} className="mb-2">{processBoldText(itemText)}</li>;
            })}
          </ul>
        );
      }
      
      // Handle multi-level sections that might have * bullets inside them
      if (paragraph.includes('\n* ')) {
        const parts = paragraph.split('\n* ');
        const mainText = parts[0];
        const bulletItems = parts.slice(1);
        
        return (
          <div key={index} className="mb-4">
            <p className="mb-2">{processBoldText(mainText)}</p>
            <ul className="ml-6 list-disc">
              {bulletItems.map((item, i) => (
                <li key={i} className="mb-1">{processBoldText(item)}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Skip empty paragraphs
      if (paragraph.trim() === '') {
        return null;
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {processBoldText(paragraph)}
        </p>
      );
    });
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
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            
            <Skeleton className="h-[400px] w-full mb-8" />
            
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1">
          <Button variant="ghost" className="mb-8" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isRecipe ? "Recipes" : "Blog"}
          </Button>
          
          <div className="max-w-4xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Content Not Found</h2>
            <p className="text-foreground/70 mb-8 dark:text-gray-300">
              We couldn't find the content you're looking for. It may have been removed or you might have followed a broken link.
            </p>
            <Button onClick={goBack} className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              Return to {isRecipe ? "Recipes" : "Blog"}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex-1">
        <Button variant="ghost" className="mb-8 text-green-700 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20" onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isRecipe ? "Recipes" : "Blog"}
        </Button>
        
        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="mb-6 h-[300px] sm:h-[400px] overflow-hidden">
            <img 
              src={content?.imageUrl} 
              alt={content?.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if the original fails to load
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
              }}
            />
          </div>
          
          <div className="px-6 sm:px-10 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-300">{content?.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-foreground/70 dark:text-gray-300 border-b border-green-100 dark:border-green-900/30 pb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content?.date}
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content?.author}
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content?.category}
              </div>
            </div>
            
            <div className="prose max-w-none text-foreground/80 dark:text-gray-200 leading-relaxed">
              {content && formatContent(content.content)}
            </div>
          </div>
        </article>
        
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-green-100 dark:border-green-900/30">
          <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-300">Share this {isRecipe ? "recipe" : "article"}</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30">
              Facebook
            </Button>
            <Button variant="outline" size="sm" className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30">
              Twitter
            </Button>
            <Button variant="outline" size="sm" className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30">
              Pinterest
            </Button>
            <Button variant="outline" size="sm" className="border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30">
              Email
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContentDetailPage;

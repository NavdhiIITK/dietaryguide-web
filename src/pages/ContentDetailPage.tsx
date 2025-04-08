
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

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isRecipe = window.location.pathname.includes('/recipes/');

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      
      try {
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
    
    // Handle Markdown-like content
    const parts = content.split('\n\n');
    
    return parts.map((paragraph, index) => {
      // Handle headings
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-green-800 dark:text-green-300">{paragraph.substring(2)}</h2>;
      } 
      
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-green-700 dark:text-green-400">{paragraph.substring(3)}</h3>;
      }
      
      if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-bold mt-5 mb-2 text-green-600 dark:text-green-500">{paragraph.substring(4)}</h4>;
      }
      
      // Handle lists
      if (paragraph.includes('\n- ')) {
        const listItems = paragraph.split('\n- ');
        const title = listItems.shift(); // Get any text before the list
        
        return (
          <div key={index} className="mb-6">
            {title && title !== "" && <p className="mb-2">{title}</p>}
            <ul className="list-disc pl-6 space-y-1">
              {listItems.map((item, i) => (
                <li key={i} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Handle numbered lists
      if (paragraph.includes('\n1. ')) {
        const listItems = paragraph.split('\n');
        const title = listItems[0].startsWith('1. ') ? null : listItems.shift();
        
        return (
          <div key={index} className="mb-6">
            {title && <p className="mb-2">{title}</p>}
            <ol className="list-decimal pl-6 space-y-1">
              {listItems.map((item, i) => {
                const numberMatch = item.match(/^\d+\.\s/);
                if (numberMatch) {
                  const content = item.substring(numberMatch[0].length);
                  return <li key={i} className="mb-1">{content}</li>;
                }
                return <li key={i} className="mb-1">{item}</li>;
              })}
            </ol>
          </div>
        );
      }
      
      // Handle simple bullet points at start of paragraph
      if (paragraph.startsWith('- ')) {
        return (
          <div key={index} className="mb-4">
            <ul className="list-disc pl-6">
              <li>{paragraph.substring(2)}</li>
            </ul>
          </div>
        );
      }
      
      // Skip empty paragraphs
      if (paragraph.trim() === '') {
        return null;
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
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
              src={content.imageUrl} 
              alt={content.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if the original fails to load
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
              }}
            />
          </div>
          
          <div className="px-6 sm:px-10 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 dark:text-green-300">{content.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm text-foreground/70 dark:text-gray-300 border-b border-green-100 dark:border-green-900/30 pb-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content.date}
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content.author}
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" /> {content.category}
              </div>
            </div>
            
            <div className="prose max-w-none text-foreground/80 dark:text-gray-200 leading-relaxed">
              {formatContent(content.content)}
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

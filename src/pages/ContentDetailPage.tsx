
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
    // Split content by new lines and wrap in paragraph tags
    // This is a simple formatter, could be enhanced further
    return content.split('\n\n').map((paragraph, index) => {
      // Check if it's a heading (starts with # or ##)
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold my-4">{paragraph.substring(2)}</h2>;
      } else if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold my-3">{paragraph.substring(3)}</h3>;
      } else if (paragraph.startsWith('- ')) {
        // It's a list item
        return (
          <ul key={index} className="list-disc pl-6 my-3">
            {paragraph.split('\n').map((item, i) => (
              <li key={i} className="mb-1">{item.substring(2)}</li>
            ))}
          </ul>
        );
      } else if (paragraph.trim() === '') {
        return null;
      } else {
        return <p key={index} className="mb-4">{paragraph}</p>;
      }
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
            <h2 className="text-2xl font-bold mb-4">Content Not Found</h2>
            <p className="text-foreground/70 mb-8">
              We couldn't find the content you're looking for. It may have been removed or you might have followed a broken link.
            </p>
            <Button onClick={goBack}>
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
        <Button variant="ghost" className="mb-8" onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isRecipe ? "Recipes" : "Blog"}
        </Button>
        
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-foreground/70">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> {content.date}
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" /> {content.author}
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" /> {content.category}
            </div>
          </div>
          
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={content.imageUrl} 
              alt={content.title} 
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>
          
          <div className="prose max-w-none text-foreground/80 leading-relaxed">
            {formatContent(content.content)}
          </div>
        </article>
        
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Share this {isRecipe ? "recipe" : "article"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Facebook
            </Button>
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              Pinterest
            </Button>
            <Button variant="outline" size="sm">
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

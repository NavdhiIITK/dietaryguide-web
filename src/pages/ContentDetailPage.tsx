import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { blogs } from "@/data/blogs";

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
  const isRecipe = window.location.pathname.includes('/recipes/');

  // Find the article by ID from the static array
  const content = blogs.find(article => article.id === id) || null;

  const goBack = () => {
    if (isRecipe) {
      navigate('/recipes');
    } else {
      navigate('/blog');
    }
  };

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
            </div>
            <div className="prose prose-lg max-w-none text-foreground/90"
              dangerouslySetInnerHTML={{ __html: content.content || "" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentDetailPage;

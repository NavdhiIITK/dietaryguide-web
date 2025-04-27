import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Loader2, Share2, Download, FileText, Share } from "lucide-react";
import EmailCollectionForm from "./EmailCollectionForm";
import html2pdf from "html2pdf.js";

const ToolsAIRecipeGenerator = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [time, setTime] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('dietaryGuideEmail');
    if (storedEmail) {
      setHasSubmittedEmail(true);
    }
    
    const createBuckets = async () => {
      try {
        await supabase.functions.invoke('create-bucket');
      } catch (error) {
        console.error("Error creating buckets:", error);
      }
    };
    
    createBuckets();
  }, []);

  const generateRecipe = async () => {
    if (!ingredients) {
      toast({
        title: "Missing Information",
        description: "Please enter at least some ingredients.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: `Create a healthy recipe using these ingredients: ${ingredients}. ${mealType ? `This should be a ${mealType} dish.` : ''} ${diet && diet !== 'none' ? `Make it ${diet}.` : ''} ${time ? `The recipe should take about ${time} to prepare and cook.` : ''} Include a title, ingredients with measurements, cooking instructions, and nutritional information if possible. Format the output with proper Markdown to ensure good readability.`,
          type: "recipe",
          model: "google/gemini-flash-1.5"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const content = data.content;
      const titleMatch = content.match(/^#\s(.+)$/m) || content.match(/^(.+)$/m);
      if (titleMatch && titleMatch[1]) {
        setRecipeTitle(titleMatch[1].trim());
      }

      setGeneratedRecipe(content);
      
      toast({
        title: "Recipe Generated",
        description: "Your quick recipe has been generated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "An error occurred while generating the recipe.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    toast({
      title: "Image Added",
      description: "Your image has been added to the recipe.",
    });
  };

  const publishRecipe = async () => {
    if (!generatedRecipe || !recipeTitle) {
      toast({
        title: "Missing Information",
        description: "Please generate a recipe first before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    
    try {
      const description = generatedRecipe.substring(0, 200) + '...';
      
      const { data, error } = await supabase
        .from('auto_blogs')
        .insert({
          title: recipeTitle,
          description: description,
          content: generatedRecipe,
          category: 'Recipes',
          image: imageUrl,
          date: new Date().toISOString(),
          is_published: true,
          search_source: mealType || "Quick Recipe",
          search_query: diet || "Any",
          is_trending: isTrending
        })
        .select();

      if (error) throw error;
      
      toast({
        title: "Recipe Published",
        description: "Your recipe has been published successfully.",
        variant: "default",
      });
      
      setIngredients("");
      setMealType("");
      setDiet("");
      setTime("");
      setIsTrending(false);
      setGeneratedRecipe("");
      setImageUrl("");
      setRecipeTitle("");
      
    } catch (error) {
      console.error("Error publishing recipe:", error);
      toast({
        title: "Publishing Failed",
        description: error.message || "An error occurred while publishing the recipe.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };
  
  const exportToPDF = () => {
    if (!generatedRecipe) {
      toast({
        title: "No Content",
        description: "Please generate a recipe first before exporting.",
        variant: "destructive",
      });
      return;
    }
    
    const element = document.createElement('div');
    element.className = 'recipe-pdf-content';
    element.innerHTML = `
      <style>
        .recipe-pdf-content {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 { color: #2e7d32; margin-bottom: 1.5rem; font-size: 2rem; }
        h2 { color: #43a047; margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.5rem; }
        p { margin-bottom: 1rem; line-height: 1.6; }
        ul, ol { margin-bottom: 1.5rem; margin-left: 1.5rem; }
        li { margin-bottom: 0.5rem; line-height: 1.6; }
        img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
      </style>
    `;
    
    if (imageUrl) {
      element.innerHTML += `<img src="${imageUrl}" alt="${recipeTitle}" />`;
    }
    
    const markdownToHTML = (markdown) => {
      return markdown
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gm, '<em>$1</em>')
        .replace(/\n- (.*)/gm, '\n<li>$1</li>')
        .replace(/<\/li>\n<li>/gm, '</li><li>')
        .replace(/(<li>.*<\/li>)/gm, '<ul>$1</ul>')
        .replace(/<\/ul>\n<ul>/gm, '')
        .replace(/\n/gm, '<br />');
    };
    
    element.innerHTML += markdownToHTML(generatedRecipe);
    document.body.appendChild(element);
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${recipeTitle || 'recipe'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      document.body.removeChild(element);
      toast({
        title: "PDF Exported",
        description: "Your recipe has been exported as a PDF.",
      });
    });
  };
  
  const shareRecipe = () => {
    if (!generatedRecipe) {
      toast({
        title: "No Content",
        description: "Please generate a recipe first before sharing.",
        variant: "destructive",
      });
      return;
    }
    
    if (navigator.share) {
      navigator.share({
        title: recipeTitle || 'Healthy Recipe',
        text: `Check out this healthy recipe: ${recipeTitle}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared",
          description: "Recipe shared successfully!",
        });
      })
      .catch((error) => {
        console.error("Error sharing:", error);
        toast({
          title: "Share Failed",
          description: "Failed to share the recipe.",
          variant: "destructive",
        });
      });
    } else {
      navigator.clipboard.writeText(generatedRecipe)
        .then(() => {
          toast({
            title: "Copied",
            description: "Recipe copied to clipboard!",
          });
        })
        .catch(() => {
          toast({
            title: "Copy Failed",
            description: "Failed to copy the recipe to clipboard.",
            variant: "destructive",
          });
        });
    }
  };
  
  const shareToWhatsApp = () => {
    if (!generatedRecipe) {
      toast({
        title: "No Content",
        description: "Please generate a recipe first before sharing.",
        variant: "destructive",
      });
      return;
    }
    
    const text = encodeURIComponent(`*${recipeTitle || 'Healthy Recipe'}*\n\n${generatedRecipe.substring(0, 200)}...`);
    const whatsappURL = `https://wa.me/?text=${text}`;
    window.open(whatsappURL, '_blank');
  };

  if (!hasSubmittedEmail) {
    return (
      <EmailCollectionForm 
        toolName="AI Recipe Generator" 
        onComplete={() => setHasSubmittedEmail(true)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ingredients" className="text-green-800 dark:text-green-300">Ingredients (comma separated)</Label>
        <Textarea 
          id="ingredients" 
          placeholder="e.g., chicken, broccoli, rice, garlic" 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border-green-200 dark:border-green-900 focus-visible:ring-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="meal-type" className="text-green-800 dark:text-green-300">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type" className="border-green-200 dark:border-green-900">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="diet" className="text-green-800 dark:text-green-300">Dietary Restrictions</Label>
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger id="diet" className="border-green-200 dark:border-green-900">
              <SelectValue placeholder="Select diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="time" className="text-green-800 dark:text-green-300">Time Available</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time" className="border-green-200 dark:border-green-900">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 minutes">15 minutes</SelectItem>
              <SelectItem value="30 minutes">30 minutes</SelectItem>
              <SelectItem value="45 minutes">45 minutes</SelectItem>
              <SelectItem value="60+ minutes">60+ minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="trending"
          checked={isTrending}
          onChange={(e) => setIsTrending(e.target.checked)}
          className="h-4 w-4 text-green-600 rounded border-green-300 focus:ring-green-500"
        />
        <Label htmlFor="trending" className="text-green-800 dark:text-green-300">
          Mark as trending recipe
        </Label>
      </div>
      
      <Button 
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
        onClick={generateRecipe}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : "Generate Recipe"}
      </Button>
      
      {generatedRecipe ? (
        <div className="space-y-6">
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
              <CardTitle className="text-green-800 dark:text-green-300">Generated Recipe</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none mb-4 whitespace-pre-line">
                {generatedRecipe.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-4 mb-2 text-green-800 dark:text-green-300">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-3 mb-2 text-green-700 dark:text-green-400">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-bold mt-2 mb-1 text-green-600 dark:text-green-500">{line.substring(4)}</h3>;
                  }
                  
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 mb-1">{line.substring(2)}</li>;
                  }
                  
                  if (line.includes('**')) {
                    return <p key={index} className="mb-2" dangerouslySetInnerHTML={{ 
                      __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} />;
                  }
                  
                  return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
                })}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  variant="outline" 
                  className="border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                  onClick={() => navigator.clipboard.writeText(generatedRecipe)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Copy Recipe
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                  onClick={exportToPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                  onClick={shareRecipe}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                  onClick={shareToWhatsApp}
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
              <CardTitle className="text-green-800 dark:text-green-300">Recipe Image</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ImageUploader 
                onImageUploaded={handleImageUploaded} 
                existingImageUrl={imageUrl}
              />
              
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
                onClick={publishRecipe}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : "Publish Recipe"}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="bg-muted/30 dark:bg-gray-700/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70 dark:text-gray-300">
            {isGenerating ? (
              <div className="space-y-2">
                <div className="text-lg">Generating recipe...</div>
                <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              "Enter ingredients and preferences to generate a recipe."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsAIRecipeGenerator;

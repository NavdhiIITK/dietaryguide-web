
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from "lucide-react";

const ToolsAIRecipeGenerator = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [time, setTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");

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
      // Call the Supabase edge function to generate content
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: `Create a healthy recipe using these ingredients: ${ingredients}. ${mealType ? `This should be a ${mealType} dish.` : ''} ${diet && diet !== 'none' ? `Make it ${diet}.` : ''} ${time ? `The recipe should take about ${time} to prepare and cook.` : ''} Include a title, ingredients with measurements, cooking instructions, and nutritional information if possible.`,
          type: "recipe"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Extract title from content
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
      // Create a short description from the content
      const description = generatedRecipe.substring(0, 200) + '...';
      
      // Insert into Supabase
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
          search_query: diet || "Any"
        })
        .select();

      if (error) throw error;
      
      toast({
        title: "Recipe Published",
        description: "Your recipe has been published successfully.",
        variant: "default",
      });
      
      // Reset form
      setIngredients("");
      setMealType("");
      setDiet("");
      setTime("");
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

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
        <Textarea 
          id="ingredients" 
          placeholder="e.g., chicken, broccoli, rice, garlic" 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type">
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
          <Label htmlFor="diet">Dietary Restrictions</Label>
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger id="diet">
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
          <Label htmlFor="time">Time Available</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time">
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
      
      <Button 
        className="w-full" 
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
          <Card>
            <CardHeader>
              <CardTitle>Generated Recipe</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={generatedRecipe}
                onChange={(e) => setGeneratedRecipe(e.target.value)}
                className="min-h-[300px] font-mono text-sm mb-4 dark:bg-gray-800 dark:text-gray-200"
              />
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(generatedRecipe)}
                >
                  Copy Recipe
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recipe Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader 
                onImageUploaded={handleImageUploaded} 
                existingImageUrl={imageUrl}
                bucketName="content-images"
              />
              
              <Button 
                className="w-full mt-4" 
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
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
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

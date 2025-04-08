
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ToolsAIRecipeGenerator = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [time, setTime] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState("");

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

      setGeneratedRecipe(data.content);
      
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
        {isGenerating ? "Generating..." : "Generate Recipe"}
      </Button>
      
      {generatedRecipe ? (
        <Card>
          <CardContent className="pt-6">
            <Textarea 
              value={generatedRecipe}
              onChange={(e) => setGeneratedRecipe(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              readOnly
            />
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigator.clipboard.writeText(generatedRecipe)}
            >
              Copy Recipe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-muted/30 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70">
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

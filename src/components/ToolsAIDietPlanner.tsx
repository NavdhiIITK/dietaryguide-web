
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ToolsAIDietPlanner = () => {
  const { toast } = useToast();
  const [dietGoal, setDietGoal] = useState("");
  const [dietType, setDietType] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dislikedFoods, setDislikedFoods] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");

  const generateDietPlan = async () => {
    if (!dietGoal || !dietType || !mealsPerDay) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Prepare the prompt
      const prompt = `Create a 7-day healthy meal plan for someone with a goal of ${dietGoal}, following a ${dietType} diet with ${mealsPerDay} meals per day. 
      ${allergies ? `They have these food allergies/intolerances: ${allergies}.` : "They have no food allergies or intolerances."} 
      ${dislikedFoods ? `They dislike these foods: ${dislikedFoods}.` : "They have no specific food dislikes."} 
      Include specific meals with approximate calorie counts and macronutrients (protein, carbs, fat) for each day. 
      Structure the meal plan day by day, with breakfast, lunch, dinner, and snacks clearly labeled. 
      Also include a shopping list for the week and simple preparation instructions.`;

      // Call the Supabase edge function to generate content
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: prompt,
          type: "blog" // Reusing the blog type for diet plan format
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedPlan(data.content);
      
      toast({
        title: "Diet Plan Generated",
        description: "Your personalized diet plan has been created!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating diet plan:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "An error occurred while generating your diet plan.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="diet-goal">Diet Goal</Label>
          <Select value={dietGoal} onValueChange={setDietGoal}>
            <SelectTrigger id="diet-goal">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight loss">Weight Loss</SelectItem>
              <SelectItem value="weight gain">Weight Gain</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="athletic performance">Athletic Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="diet-type">Diet Type</Label>
          <Select value={dietType} onValueChange={setDietType}>
            <SelectTrigger id="diet-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="high protein">High Protein</SelectItem>
              <SelectItem value="low carb">Low Carb</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="meals-per-day">Meals per Day</Label>
          <Select value={mealsPerDay} onValueChange={setMealsPerDay}>
            <SelectTrigger id="meals-per-day">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3 meals">3 meals</SelectItem>
              <SelectItem value="4 meals">4 meals</SelectItem>
              <SelectItem value="5 meals">5 meals</SelectItem>
              <SelectItem value="6 meals">6 meals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="allergies">Food Allergies/Intolerances</Label>
          <Input 
            id="allergies" 
            placeholder="e.g., dairy, gluten, nuts" 
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="disliked-foods">Disliked Foods</Label>
          <Input 
            id="disliked-foods" 
            placeholder="e.g., broccoli, fish, eggs" 
            value={dislikedFoods}
            onChange={(e) => setDislikedFoods(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        className="w-full" 
        onClick={generateDietPlan}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : "Generate Diet Plan"}
      </Button>
      
      {generatedPlan ? (
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none dark:prose-invert whitespace-pre-line">
              {generatedPlan}
            </div>
            <div className="flex gap-4 mt-6">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigator.clipboard.writeText(generatedPlan)}
              >
                Copy Plan
              </Button>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => window.print()}
              >
                Print Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-muted/30 dark:bg-gray-700/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70 dark:text-gray-300">
            {isGenerating ? (
              <div className="space-y-2">
                <div className="text-lg">Creating your diet plan...</div>
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              "Fill in your preferences to generate a personalized diet plan."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsAIDietPlanner;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail } from "lucide-react";

const ToolsAIDietPlanner = () => {
  const { toast } = useToast();
  const [dietGoal, setDietGoal] = useState("");
  const [dietType, setDietType] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dislikedFoods, setDislikedFoods] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('dietaryGuideEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setHasSubmittedEmail(true);
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingEmail(true);
    
    try {
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent("AI Diet Planner");
      const emailParam = encodeURIComponent(email);
      
      const fullUrl = `${formBaseUrl}?entry.453589071=${toolParam}&entry.1562868697=${emailParam}&submit=Submit`;
      
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = fullUrl;
      form.target = 'hidden_iframe';
      document.body.appendChild(form);
      form.submit();
      
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      setHasSubmittedEmail(true);
      localStorage.setItem('dietaryGuideEmail', email);
      
      toast({
        title: "Thank you!",
        description: "Your email has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const generateDietPlan = async () => {
    if (!hasSubmittedEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to use this tool.",
        variant: "destructive",
      });
      return;
    }

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
      const prompt = `Create a 7-day healthy meal plan for someone with a goal of ${dietGoal}, following a ${dietType} diet with ${mealsPerDay} meals per day. 
      ${allergies ? `They have these food allergies/intolerances: ${allergies}.` : "They have no food allergies or intolerances."} 
      ${dislikedFoods ? `They dislike these foods: ${dislikedFoods}.` : "They have no specific food dislikes."}
      
      ${dietType.includes('Indian') ? `For Indian cuisine, include authentic ${dietType} dishes with traditional ingredients and spices. Consider regional variations and traditional cooking methods.` : ''}
      
      Include specific meals with approximate calorie counts and macronutrients (protein, carbs, fat) for each day. 
      Structure the meal plan day by day, with breakfast, lunch, dinner, and snacks clearly labeled. 
      Also include a shopping list for the week and simple preparation instructions.
      
      If suggesting Indian dishes, include proper Indian names of dishes along with brief descriptions in English.`;

      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: prompt,
          type: "blog",
          model: "google/gemini-flash-1.5"
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
      {!hasSubmittedEmail ? (
        <Card className="border-green-500/20 dark:border-green-400/20 shadow-md dark:shadow-green-900/10">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
            <CardTitle className="text-center text-green-800 dark:text-green-300">Enter Your Email to Access This Tool</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="diet-email">Email Address</Label>
                <div className="flex gap-2">
                  <Input 
                    id="diet-email" 
                    placeholder="your.email@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmittingEmail}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    {isSubmittingEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy and will never share your email with third parties.
              </p>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="diet-goal" className="text-green-800 dark:text-green-300">Diet Goal</Label>
              <Select value={dietGoal} onValueChange={setDietGoal}>
                <SelectTrigger id="diet-goal" className="border-green-200 dark:border-green-900">
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
              <Label htmlFor="diet-type" className="text-green-800 dark:text-green-300">Diet Type</Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger id="diet-type" className="border-green-200 dark:border-green-900">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high protein">High Protein</SelectItem>
                  <SelectItem value="low carb">Low Carb</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="North Indian vegetarian">North Indian Vegetarian</SelectItem>
                  <SelectItem value="North Indian non-vegetarian">North Indian Non-Vegetarian</SelectItem>
                  <SelectItem value="South Indian vegetarian">South Indian Vegetarian</SelectItem>
                  <SelectItem value="South Indian non-vegetarian">South Indian Non-Vegetarian</SelectItem>
                  <SelectItem value="Indo-Chinese">Indo-Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="meals-per-day" className="text-green-800 dark:text-green-300">Meals per Day</Label>
              <Select value={mealsPerDay} onValueChange={setMealsPerDay}>
                <SelectTrigger id="meals-per-day" className="border-green-200 dark:border-green-900">
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
              <Label htmlFor="allergies" className="text-green-800 dark:text-green-300">Food Allergies/Intolerances</Label>
              <Input 
                id="allergies" 
                placeholder="e.g., dairy, gluten, nuts" 
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="border-green-200 dark:border-green-900"
              />
            </div>
            
            <div>
              <Label htmlFor="disliked-foods" className="text-green-800 dark:text-green-300">Disliked Foods</Label>
              <Input 
                id="disliked-foods" 
                placeholder="e.g., broccoli, fish, eggs" 
                value={dislikedFoods}
                onChange={(e) => setDislikedFoods(e.target.value)}
                className="border-green-200 dark:border-green-900"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
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
            <Card className="border-green-200 dark:border-green-900">
              <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
                <CardTitle className="text-green-800 dark:text-green-300">Your Personalized Diet Plan</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert whitespace-pre-line">
                  {generatedPlan}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                    onClick={() => navigator.clipboard.writeText(generatedPlan)}
                  >
                    Copy Plan
                  </Button>
                  <Button 
                    variant="default" 
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    onClick={() => window.print()}
                  >
                    Print Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-muted/30 dark:bg-gray-800/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <div className="text-center text-foreground/70 dark:text-gray-300">
                {isGenerating ? (
                  <div className="space-y-2">
                    <div className="text-lg">Creating your diet plan...</div>
                    <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : (
                  "Fill in your preferences to generate a personalized diet plan."
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ToolsAIDietPlanner;

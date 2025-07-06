import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from "lucide-react";
import EmailCollectionForm from "./EmailCollectionForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ToolsAIMealAnalyzer = () => {
  const { toast } = useToast();
  const [mealDescription, setMealDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [analysisMethod, setAnalysisMethod] = useState("text");
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  
  const [mealType, setMealType] = useState("");
  const [goalType, setGoalType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  
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

  const analyzeMeal = async () => {
    if (analysisMethod === "text" && !mealDescription) {
      toast({
        title: "Missing Information",
        description: "Please describe your meal.",
        variant: "destructive",
      });
      return;
    }

    if (analysisMethod === "image" && !imageUrl) {
      toast({
        title: "Missing Information",
        description: "Please upload an image of your meal.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      let prompt = "";
      
      if (analysisMethod === "text") {
        prompt = `Analyze this meal: ${mealDescription}.`;
      } else {
        prompt = `Analyze the meal in the uploaded image. I'll describe what I see: a meal that likely contains various ingredients and components.`;
      }
      
      if (mealType) {
        prompt += ` This is a ${mealType} meal.`;
      }
      
      if (goalType) {
        prompt += ` My nutritional goal is ${goalType}.`;
      }
      
      if (dietaryRestrictions) {
        prompt += ` I have the following dietary restrictions: ${dietaryRestrictions}.`;
      }
      
      if (calorieGoal) {
        prompt += ` My daily calorie goal is around ${calorieGoal} calories.`;
      }
      
      if (additionalNotes) {
        prompt += ` Additional notes: ${additionalNotes}.`;
      }
      
      prompt += ` Please provide a detailed nutritional breakdown including estimated calories, macronutrients (protein, carbs, fats), key vitamins and minerals, and general health insights. Also include pros of the meal and suggestions for improvement if applicable. Format the output with proper Markdown to ensure good readability, using sections and bullet points.`;

      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: prompt,
          type: "meal-analysis",
          model: "google/gemini-flash-1.5"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setAnalysisResult(data.content);
      
      toast({
        title: "Analysis Complete",
        description: "Your meal has been analyzed!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error analyzing meal:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "An error occurred while analyzing your meal.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    toast({
      title: "Image Uploaded",
      description: "Your meal image has been uploaded.",
    });
  };

  if (!hasSubmittedEmail) {
    return (
      <EmailCollectionForm 
        toolName="AI Meal Analyzer" 
        onComplete={() => setHasSubmittedEmail(true)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={analysisMethod} onValueChange={setAnalysisMethod} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="text">Text Description</TabsTrigger>
          <TabsTrigger value="image">Upload Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <div>
            <Label htmlFor="meal-description">Describe Your Meal</Label>
            <Textarea 
              id="meal-description" 
              placeholder="e.g., Grilled chicken breast with brown rice, steamed broccoli, and a small side salad with olive oil dressing." 
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="image">
          <div>
            <Label className="mb-2 block">Upload Meal Image</Label>
            <ImageUploader 
              onImageUploaded={handleImageUploaded} 
              existingImageUrl={imageUrl}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="border-green-200 dark:border-green-900">
        <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/50">
          <CardTitle className="text-green-800 dark:text-green-300">Additional Details (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meal-type">Type of Meal</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger id="meal-type">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                  <SelectItem value="post-workout">Post-Workout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="goal-type">Nutritional Goal</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger id="goal-type">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="improved energy">Improved Energy</SelectItem>
                  <SelectItem value="better health">Better Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
            <Textarea 
              id="dietary-restrictions" 
              placeholder="e.g., vegetarian, gluten-free, dairy-free, allergic to nuts, etc."
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="min-h-[70px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calorie-goal">Daily Calorie Goal (if known)</Label>
              <Input 
                id="calorie-goal" 
                type="text" 
                placeholder="e.g., 2000"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="additional-notes">Additional Notes</Label>
            <Textarea 
              id="additional-notes" 
              placeholder="e.g., I'm trying to increase my protein intake, I'm concerned about sodium levels, etc."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[70px]"
            />
          </div>
        </CardContent>
      </Card>
      
      <Button 
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
        onClick={analyzeMeal}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : "Analyze Meal"}
      </Button>
      
      {analysisResult ? (
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/50">
            <CardTitle>Meal Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-foreground leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>strong]:font-semibold [&>a]:text-primary [&>a]:underline [&>a:hover]:text-primary/80 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-muted/50 [&>blockquote]:py-2 [&>blockquote]:px-4 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-muted [&>pre]:border [&>pre]:p-4 [&>pre]:rounded [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-1 max-w-none mb-4 whitespace-pre-line mt-4">
              {analysisResult.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold mt-4 mb-2 text-green-800 dark:text-green-300">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold mt-3 mb-2 text-green-700 dark:text-green-400">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-bold mt-2 mb-1 text-green-600 dark:text-green-500">{line.substring(4)}</h3>;
                }
                
                if (line.startsWith('* ') || line.startsWith('- ')) {
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
            <Button 
              variant="outline" 
              className="mt-6 w-full"
              onClick={() => navigator.clipboard.writeText(analysisResult)}
            >
              Copy Analysis
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-muted/30 dark:bg-gray-800/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70 dark:text-gray-300">
            {isAnalyzing ? (
              <div className="space-y-2">
                <div className="text-lg">Analyzing your meal...</div>
                <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              analysisMethod === "text" ? 
                "Describe your meal to get a nutritional analysis" : 
                "Upload an image of your meal to get a nutritional analysis"
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsAIMealAnalyzer;

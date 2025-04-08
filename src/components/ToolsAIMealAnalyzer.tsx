
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from "lucide-react";

const ToolsAIMealAnalyzer = () => {
  const { toast } = useToast();
  const [mealDescription, setMealDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [analysisMethod, setAnalysisMethod] = useState("text");

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
        prompt = `Analyze this meal: ${mealDescription}. Please provide a detailed nutritional breakdown including estimated calories, macronutrients (protein, carbs, fats), key vitamins and minerals, and general health insights. Also include pros of the meal and suggestions for improvement if applicable.`;
      } else {
        prompt = `Analyze the meal in the uploaded image. I'll describe what I see: a meal that likely contains various ingredients and components. Please provide a detailed nutritional breakdown including estimated calories, macronutrients (protein, carbs, fats), key vitamins and minerals, and general health insights. Also include pros of the meal and suggestions for improvement if applicable.`;
      }

      // Call the Supabase edge function to generate content
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: prompt,
          type: "meal-analysis"
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
              bucketName="content-images"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full" 
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
        <Card>
          <CardHeader>
            <CardTitle>Meal Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none whitespace-pre-line">
              {analysisResult}
            </div>
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => navigator.clipboard.writeText(analysisResult)}
            >
              Copy Analysis
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-muted/30 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70">
            {isAnalyzing ? (
              <div className="space-y-2">
                <div className="text-lg">Analyzing your meal...</div>
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
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

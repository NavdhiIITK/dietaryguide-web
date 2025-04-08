
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Loader2, Mail } from "lucide-react";

const ToolsAIMealAnalyzer = () => {
  const { toast } = useToast();
  const [mealDescription, setMealDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [analysisMethod, setAnalysisMethod] = useState("text");
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);

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
      // Create the Google Form prefilled URL with the tool name and email
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent("AI Meal Analyzer");
      const emailParam = encodeURIComponent(email);
      
      const fullUrl = `${formBaseUrl}?entry.453589071=${toolParam}&entry.1562868697=${emailParam}&submit=Submit`;
      
      // Use an iframe to submit the form without navigating away
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a form element and submit it to the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = fullUrl;
      form.target = 'hidden_iframe';
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      // Show success message
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

  const analyzeMeal = async () => {
    if (!hasSubmittedEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to use this tool.",
        variant: "destructive",
      });
      return;
    }

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
          type: "meal-analysis",
          model: "google/gemini-flash-1.5" // Use Google's Gemini model
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

  // Check if user has already submitted email
  const storedEmail = localStorage.getItem('dietaryGuideEmail');
  if (storedEmail && !hasSubmittedEmail) {
    setEmail(storedEmail);
    setHasSubmittedEmail(true);
  }

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
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2">
                  <Input 
                    id="email" 
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
                  bucketName="meal-images"
                />
              </div>
            </TabsContent>
          </Tabs>
          
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
                <div className="prose dark:prose-invert max-w-none whitespace-pre-line mt-4">
                  {analysisResult}
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
        </>
      )}
    </div>
  );
};

export default ToolsAIMealAnalyzer;

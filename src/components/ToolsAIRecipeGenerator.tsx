
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
import { Loader2, Mail } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);

  useEffect(() => {
    // Check if user has already submitted email
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
      // Create the Google Form prefilled URL with the tool name and email
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent("AI Recipe Generator");
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

  const generateRecipe = async () => {
    if (!hasSubmittedEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to use this tool.",
        variant: "destructive",
      });
      return;
    }

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
          type: "recipe",
          model: "google/gemini-flash-1.5" // Use Google's Gemini model
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
      {!hasSubmittedEmail ? (
        <Card className="border-green-500/20 dark:border-green-400/20 shadow-md dark:shadow-green-900/10">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
            <CardTitle className="text-center text-green-800 dark:text-green-300">Enter Your Email to Access This Tool</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="recipe-email">Email Address</Label>
                <div className="flex gap-2">
                  <Input 
                    id="recipe-email" 
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
                  <Textarea 
                    value={generatedRecipe}
                    onChange={(e) => setGeneratedRecipe(e.target.value)}
                    className="min-h-[300px] font-mono text-sm mb-4 dark:bg-gray-800 dark:text-gray-200 border-green-200 dark:border-green-900"
                  />
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                      onClick={() => navigator.clipboard.writeText(generatedRecipe)}
                    >
                      Copy Recipe
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
                    bucketName="content-images"
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
        </>
      )}
    </div>
  );
};

export default ToolsAIRecipeGenerator;

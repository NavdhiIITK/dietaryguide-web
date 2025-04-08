import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RecipeGenerator = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [mealType, setMealType] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [recipePrompt, setRecipePrompt] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");

  const handleAuthentication = () => {
    if (password === "Navdhi123@") {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: "Welcome to the Recipe Generator.",
        variant: "default",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateRecipe = async () => {
    if (!recipeTitle || !mealType || !recipePrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: `Create a detailed healthy recipe for "${recipeTitle}". This is a ${mealType} dish. ${dietaryPreference ? `It should be suitable for ${dietaryPreference} diets.` : ''} ${recipePrompt}. Include ingredients with measurements, detailed cooking instructions, nutritional information, and serving suggestions.`,
          type: "recipe"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedRecipe(data.content);
      setImagePrompt(`Professional food photography of ${recipeTitle}, top-down view, beautiful plating, natural lighting, on a rustic wooden table, garnished with fresh herbs, vibrant colors, healthy meal`);
      
      toast({
        title: "Recipe Generated",
        description: "Your recipe has been generated successfully.",
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

  const publishRecipe = () => {
    toast({
      title: "Recipe Published",
      description: "Your recipe has been published successfully.",
      variant: "default",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                This page is password protected. Please enter the password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAuthentication()}
                  />
                </div>
                <Button className="w-full" onClick={handleAuthentication}>
                  Authenticate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Recipe Generator
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Create healthy, delicious recipes with AI assistance.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Information</CardTitle>
                  <CardDescription>
                    Fill in the details to generate your recipe.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipe-title">Recipe Title</Label>
                      <Input 
                        id="recipe-title" 
                        placeholder="e.g., Quinoa Vegetable Bowl with Chickpeas" 
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <SelectItem value="dessert">Dessert</SelectItem>
                            <SelectItem value="drink">Drink/Smoothie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="dietary-preference">Dietary Preference</Label>
                        <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                          <SelectTrigger id="dietary-preference">
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                            <SelectItem value="paleo">Paleo</SelectItem>
                            <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="recipe-prompt">Recipe Prompt</Label>
                      <Textarea 
                        id="recipe-prompt" 
                        placeholder="Describe the recipe you want to create, including any specific ingredients, cooking methods, or health benefits..." 
                        className="min-h-[150px]"
                        value={recipePrompt}
                        onChange={(e) => setRecipePrompt(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={generateRecipe} 
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Recipe"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {imagePrompt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Image Generation Prompt</CardTitle>
                    <CardDescription>
                      Use this prompt with an external AI image generator.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigator.clipboard.writeText(imagePrompt)}
                        >
                          Copy Prompt
                        </Button>
                        <Button variant="outline" className="w-full">
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Generated Recipe</CardTitle>
                  <CardDescription>
                    Edit the generated content as needed before publishing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedRecipe ? (
                    <div className="space-y-4">
                      <Textarea 
                        value={generatedRecipe}
                        onChange={(e) => setGeneratedRecipe(e.target.value)}
                        className="min-h-[500px] font-mono text-sm"
                      />
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigator.clipboard.writeText(generatedRecipe)}
                        >
                          Copy Content
                        </Button>
                        <Button className="w-full" onClick={publishRecipe}>
                          Publish Recipe
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center min-h-[500px]">
                      <div className="text-center text-foreground/60">
                        {isGenerating ? (
                          <div className="space-y-2">
                            <div className="text-lg">Generating recipe content...</div>
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                          </div>
                        ) : (
                          "Generated recipe content will appear here"
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RecipeGenerator;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Flame, Bookmark, ArrowLeft, Heart, Share2, Printer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { allIndianRecipes, Recipe } from "@/data/recipes";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetch with timeout
    const timer = setTimeout(() => {
      const foundRecipe = allIndianRecipes.find(r => r.id === id);
      setRecipe(foundRecipe || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 flex-grow">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full rounded-xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-8 w-1/3 mb-4" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full mb-2" />
                ))}
              </div>
              <div>
                <Skeleton className="h-8 w-1/3 mb-4" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full mb-2" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 flex-grow text-center">
          <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
          <p className="mb-8 text-muted-foreground">We couldn't find the recipe you're looking for.</p>
          <Button asChild>
            <Link to="/recipes">Browse All Recipes</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Recipe Content */}
      <main className="pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6 group">
              <Link to="/recipes" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Recipes
              </Link>
            </Button>
            
            {/* Recipe Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{recipe.description}</p>
            
            {/* Recipe Image */}
            <div className="rounded-xl overflow-hidden mb-8 shadow-md">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Recipe Meta Info */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <ChefHat className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {recipe.dietPreference}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
            
            {/* Recipe Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Flame className="h-6 w-6 mr-2 text-primary" />
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-baseline">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary block mr-3 mt-2 flex-shrink-0"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Nutrition Facts */}
                {recipe.nutritionFacts && (
                  <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Nutrition Facts (Per Serving)</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {recipe.nutritionFacts.calories && (
                        <div>
                          <span className="text-muted-foreground">Calories:</span> {recipe.nutritionFacts.calories}
                        </div>
                      )}
                      {recipe.nutritionFacts.protein && (
                        <div>
                          <span className="text-muted-foreground">Protein:</span> {recipe.nutritionFacts.protein}
                        </div>
                      )}
                      {recipe.nutritionFacts.carbs && (
                        <div>
                          <span className="text-muted-foreground">Carbs:</span> {recipe.nutritionFacts.carbs}
                        </div>
                      )}
                      {recipe.nutritionFacts.fat && (
                        <div>
                          <span className="text-muted-foreground">Fat:</span> {recipe.nutritionFacts.fat}
                        </div>
                      )}
                      {recipe.nutritionFacts.fiber && (
                        <div>
                          <span className="text-muted-foreground">Fiber:</span> {recipe.nutritionFacts.fiber}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <ChefHat className="h-6 w-6 mr-2 text-primary" />
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions?.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
                
                {/* Cooking Tips */}
                {recipe.tips && recipe.tips.length > 0 && (
                  <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Chef's Tips</h3>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="text-sm flex items-baseline">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary block mr-2 mt-2 flex-shrink-0"></span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;

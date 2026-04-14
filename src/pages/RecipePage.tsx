import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOOptimizer from "@/components/SEOOptimizer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, ChefHat } from "lucide-react";
import { allIndianRecipes, Recipe } from "@/data/recipes";

const RecipePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Recipes");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Simulate loading for a more natural feel
    const timer = setTimeout(() => {
      setFilteredRecipes(allIndianRecipes);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter recipes when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All Recipes") {
      setFilteredRecipes(allIndianRecipes);
    } else if (activeFilter === "Trending") {
      setFilteredRecipes(allIndianRecipes.filter(recipe => recipe.isTrending));
    } else if (["Breakfast", "Lunch", "Dinner", "Snack"].includes(activeFilter)) {
      // Filter by meal type
      setFilteredRecipes(allIndianRecipes.filter(recipe => 
        recipe.mealType.toLowerCase() === activeFilter.toLowerCase()
      ));
    } else {
      // Filter by dietary preference
      setFilteredRecipes(allIndianRecipes.filter(recipe => 
        recipe.dietPreference.toLowerCase() === activeFilter.toLowerCase()
      ));
    }
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOOptimizer
        title="Healthy Indian Breakfast Recipes for Weight Loss"
        description="Discover 10+ nutritious, protein-rich Indian breakfast recipes for weight loss. Moong dal chilla, oats upma, besan cheela, ragi porridge & more. ICMR-approved, vegetarian & vegan options."
        keywords="healthy Indian breakfast recipes, weight loss recipes India, moong dal chilla recipe, protein rich breakfast India, vegetarian breakfast recipes, vegan Indian breakfast, low calorie Indian breakfast, oats upma recipe, besan cheela recipe, ragi porridge recipe"
        url="/recipes"
        breadcrumbs={[
          { name: "Home", url: "https://dietaryguide.in/" },
          { name: "Recipes", url: "https://dietaryguide.in/recipes" }
        ]}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthy Indian Breakfast Recipes for Weight Loss
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover 10 nutritious, protein-rich Indian breakfast recipes designed to support your weight loss journey.
          </p>
        </div>
      </section>
      
      {/* Recipe Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant={activeFilter === "All Recipes" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("All Recipes")}
            >
              All Recipes
            </Button>
            <Button 
              variant={activeFilter === "Trending" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Trending")}
            >
              <TrendingUp className="h-4 w-4 mr-1 text-orange-500" />
              Trending
            </Button>
            <Button 
              variant={activeFilter === "Breakfast" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Breakfast")}
            >
              Breakfast
            </Button>
            <Button 
              variant={activeFilter === "Vegetarian" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Vegetarian")}
            >
              Vegetarian
            </Button>
            <Button 
              variant={activeFilter === "Vegan" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Vegan")}
            >
              Vegan
            </Button>
          </div>
        </div>
      </section>
      
      {/* Recipe Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card 
                  key={recipe.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${recipe.isTrending ? 'ring-2 ring-orange-400' : ''}`}
                >
                  <div className="h-48 bg-muted overflow-hidden relative">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    {recipe.isTrending && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> Trending
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.mealType}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="mr-2">{recipe.prepTime}</span>
                        <ChefHat className="h-3 w-3 mr-1" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {recipe.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="text-xs">
                        {recipe.dietPreference}
                      </Badge>
                      {recipe.nutritionFacts?.calories && (
                        <span className="text-xs text-muted-foreground">
                          {recipe.nutritionFacts.calories}
                        </span>
                      )}
                    </div>
                    
                    {recipe.nutritionFacts && (
                      <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                        {recipe.nutritionFacts.protein && (
                          <div className="text-center">
                            <div className="font-medium text-primary">{recipe.nutritionFacts.protein}</div>
                            <div className="text-muted-foreground">Protein</div>
                          </div>
                        )}
                        {recipe.nutritionFacts.carbs && (
                          <div className="text-center">
                            <div className="font-medium text-primary">{recipe.nutritionFacts.carbs}</div>
                            <div className="text-muted-foreground">Carbs</div>
                          </div>
                        )}
                        {recipe.nutritionFacts.fat && (
                          <div className="text-center">
                            <div className="font-medium text-primary">{recipe.nutritionFacts.fat}</div>
                            <div className="text-muted-foreground">Fat</div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link to={`/recipes/${recipe.id}`}>View Full Recipe</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-foreground/70">No recipes found with the selected filter</h3>
              <p className="mt-2 text-foreground/60">Try selecting a different filter or check back later.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Recipe Tips */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden h-[300px]">
              <img 
                src="https://github.com/qubicle232/dietaryguide/blob/main/WhatsApp%20Image%202025-06-11%20at%206.17.28%20PM.jpeg?raw=true"
                alt="Indian cooking preparation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Healthy Indian Cooking Tips</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Opt for dry roasting spices instead of frying them in oil</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use olive oil or mustard oil instead of refined oils</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Replace cream with Greek yogurt or cashew paste for creamy textures</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Add more vegetables to traditional dishes for extra fiber and nutrients</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Incorporate more whole grains like brown rice, millet, and whole wheat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Get Weekly Recipe Inspiration
          </h2>
          <p className="text-lg mb-8 text-foreground/80">
            Subscribe to receive new Indian recipes, cooking tips, and nutrition advice every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 flex-1 rounded-md border border-input bg-background"
            />
            <Button className="px-8">Subscribe</Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RecipePage;

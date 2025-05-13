import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
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
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthy & Delicious Indian Recipes
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover authentic, nutritious, easy-to-prepare Indian meals for every dietary preference and occasion.
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
              variant={activeFilter === "Dinner" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Dinner")}
            >
              Dinner
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
      
      {/* Recipe Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-background rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-[30%] rounded-full" />
                      <Skeleton className="h-4 w-[40%]" />
                    </div>
                    <Skeleton className="h-6 w-[80%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[70%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <div 
                  key={recipe.id} 
                  className={`bg-background rounded-xl overflow-hidden shadow-md card-hover ${recipe.isTrending ? 'ring-2 ring-orange-400' : ''}`}
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
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{recipe.mealType}</span>
                      <div className="flex items-center text-xs text-foreground/60">
                        <span className="mr-2">{recipe.prepTime}</span>
                        <span className="px-2 py-0.5 bg-muted rounded">{recipe.difficulty}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                    <Button asChild variant="link" className="p-0" size="sm">
                      <Link to={`/recipes/${recipe.id}`}>View Recipe →</Link>
                    </Button>
                  </div>
                </div>
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
                src="https://images.unsplash.com/photo-1505253838534-0edb241e5313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
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

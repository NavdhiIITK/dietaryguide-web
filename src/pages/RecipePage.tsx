
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  category: string;
  imageUrl: string;
  difficulty: string;
  mealType: string;
  dietPreference: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80";

const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Recipes");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from('auto_blogs')
          .select('*')
          .eq('category', 'Recipes')
          .eq('is_published', true)
          .order('date', { ascending: false });
          
        if (error) throw error;
        
        // Transform the data
        const transformedRecipes = data.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          prepTime: "20-30 min", // This could be extracted from content if available
          category: "Recipes",
          imageUrl: recipe.image || placeholderImage,
          difficulty: "Medium", // This could be extracted from content if available
          mealType: recipe.search_source || "Any",
          dietPreference: recipe.search_query || "Any"
        }));
        
        setRecipes(transformedRecipes);
        setFilteredRecipes(transformedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);
  
  // Filter recipes when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All Recipes") {
      setFilteredRecipes(recipes);
    } else if (["Breakfast", "Lunch", "Dinner", "Snacks"].includes(activeFilter)) {
      // Filter by meal type
      setFilteredRecipes(recipes.filter(recipe => 
        recipe.mealType.toLowerCase() === activeFilter.toLowerCase()
      ));
    } else {
      // Filter by dietary preference
      setFilteredRecipes(recipes.filter(recipe => 
        recipe.dietPreference.toLowerCase() === activeFilter.toLowerCase()
      ));
    }
  }, [activeFilter, recipes]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthy & Delicious Recipes
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover nutritious, easy-to-prepare meals for every dietary preference and occasion.
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
              variant={activeFilter === "Breakfast" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Breakfast")}
            >
              Breakfast
            </Button>
            <Button 
              variant={activeFilter === "Lunch" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Lunch")}
            >
              Lunch
            </Button>
            <Button 
              variant={activeFilter === "Dinner" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Dinner")}
            >
              Dinner
            </Button>
            <Button 
              variant={activeFilter === "Snack" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Snack")}
            >
              Snacks
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
            <Button 
              variant={activeFilter === "Gluten-Free" ? "default" : "outline"} 
              className="text-sm"
              onClick={() => setActiveFilter("Gluten-Free")}
            >
              Gluten-Free
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
                <div key={recipe.id} className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
                  <div className="h-48 bg-muted overflow-hidden">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
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
          
          {filteredRecipes.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Recipe Tips */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-muted/50 rounded-xl h-[300px] flex items-center justify-center">
              <div className="text-2xl text-foreground/60">Cooking Tips Image</div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Healthy Cooking Tips</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use herbs and spices instead of salt to flavor dishes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Opt for baking, steaming, or grilling instead of frying</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Include a variety of colorful vegetables in every meal</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Measure oils and high-calorie ingredients to control portions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Meal prep to save time and make healthier choices throughout the week</span>
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
            Subscribe to receive new recipes, cooking tips, and nutrition advice every week.
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

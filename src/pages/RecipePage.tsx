
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

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
  isTrending?: boolean;
}

// Curated high-quality recipes
const curatedRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    description: "A protein-rich quinoa bowl with roasted vegetables, feta cheese, and a light lemon dressing.",
    prepTime: "25 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Lunch",
    dietPreference: "Vegetarian",
    isTrending: true
  },
  {
    id: "2",
    title: "Wild Salmon with Roasted Vegetables",
    description: "Omega-3 rich salmon filet with a herb crust, served with seasonal roasted vegetables.",
    prepTime: "35 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Pescatarian"
  },
  {
    id: "3",
    title: "Overnight Oats with Berries",
    description: "Protein-packed overnight oats with mixed berries, chia seeds, and a touch of honey.",
    prepTime: "10 min + overnight",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1502481851512-e93e25e4a8a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    isTrending: true
  },
  {
    id: "4",
    title: "Chickpea and Vegetable Curry",
    description: "A hearty plant-based curry with chickpeas, spinach, and sweet potatoes in a flavorful coconut sauce.",
    prepTime: "40 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Vegan"
  },
  {
    id: "5",
    title: "Protein Power Smoothie Bowl",
    description: "Nutrient-dense smoothie bowl with Greek yogurt, spinach, and topped with seeds and nuts.",
    prepTime: "15 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1504310578167-435ac09e69f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Breakfast",
    dietPreference: "Vegetarian"
  },
  {
    id: "6",
    title: "Turkey and Vegetable Lettuce Wraps",
    description: "Lean ground turkey with colorful vegetables served in crisp lettuce cups for a low-carb option.",
    prepTime: "25 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1539252554965-80893c9f8744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Lunch",
    dietPreference: "Gluten-Free"
  },
  {
    id: "7",
    title: "Baked Cod with Mediterranean Vegetables",
    description: "Flaky cod fillets baked with tomatoes, olives, and herbs for a flavorful dinner option.",
    prepTime: "30 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Pescatarian"
  },
  {
    id: "8",
    title: "Energizing Blueberry Almond Smoothie",
    description: "Quick-to-make smoothie that combines antioxidant-rich blueberries with protein from almond butter.",
    prepTime: "10 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Snack",
    dietPreference: "Vegetarian",
    isTrending: true
  },
  {
    id: "9",
    title: "Black Bean and Sweet Potato Tacos",
    description: "Plant-based tacos featuring roasted sweet potatoes and spiced black beans with fresh toppings.",
    prepTime: "35 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Vegan"
  },
  {
    id: "10",
    title: "Greek Yogurt Parfait with Homemade Granola",
    description: "Layered Greek yogurt with fresh fruits and crunchy homemade granola for a filling breakfast.",
    prepTime: "20 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Breakfast",
    dietPreference: "Vegetarian"
  },
  {
    id: "11",
    title: "Cauliflower Fried Rice",
    description: "Low-carb alternative to traditional fried rice using cauliflower with vegetables and eggs.",
    prepTime: "25 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Gluten-Free"
  },
  {
    id: "12",
    title: "Avocado and Egg Breakfast Bowl",
    description: "Nutrient-dense breakfast bowl featuring avocado, poached eggs, and microgreens on whole grains.",
    prepTime: "20 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    isTrending: true
  }
];

const RecipePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Recipes");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Simulate loading for a more natural feel
    const timer = setTimeout(() => {
      setFilteredRecipes(curatedRecipes);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter recipes when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All Recipes") {
      setFilteredRecipes(curatedRecipes);
    } else if (activeFilter === "Trending") {
      setFilteredRecipes(curatedRecipes.filter(recipe => recipe.isTrending));
    } else if (["Breakfast", "Lunch", "Dinner", "Snacks"].includes(activeFilter)) {
      // Filter by meal type
      setFilteredRecipes(curatedRecipes.filter(recipe => 
        recipe.mealType.toLowerCase() === activeFilter.toLowerCase()
      ));
    } else {
      // Filter by dietary preference
      setFilteredRecipes(curatedRecipes.filter(recipe => 
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

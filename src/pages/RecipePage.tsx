
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample recipe data
const recipes = [
  {
    id: 1,
    title: "Avocado & Egg Breakfast Bowl",
    description: "A protein-packed breakfast bowl with avocado, poached eggs, and whole grains.",
    prepTime: "20 min",
    category: "Breakfast",
    imageUrl: "",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad",
    description: "Fresh vegetables, quinoa, and feta cheese with a light lemon dressing.",
    prepTime: "15 min",
    category: "Lunch",
    imageUrl: "",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Baked Herb Salmon",
    description: "Wild-caught salmon baked with fresh herbs and served with roasted vegetables.",
    prepTime: "35 min",
    category: "Dinner",
    imageUrl: "",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Energizing Protein Balls",
    description: "No-bake protein balls made with dates, nuts, and protein powder for a healthy snack.",
    prepTime: "10 min",
    category: "Snack",
    imageUrl: "",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Green Smoothie Bowl",
    description: "Nutrient-dense smoothie bowl with spinach, banana, and a variety of toppings.",
    prepTime: "10 min",
    category: "Breakfast",
    imageUrl: "",
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Lentil & Vegetable Soup",
    description: "Hearty lentil soup packed with vegetables and spices for a comforting meal.",
    prepTime: "45 min",
    category: "Dinner",
    imageUrl: "",
    difficulty: "Medium",
  },
  {
    id: 7,
    title: "Grilled Chicken & Vegetable Skewers",
    description: "Marinated chicken and colorful vegetables on skewers, perfect for grilling.",
    prepTime: "30 min",
    category: "Dinner",
    imageUrl: "",
    difficulty: "Medium",
  },
  {
    id: 8,
    title: "Berry Chia Pudding",
    description: "Overnight chia seed pudding with mixed berries and a touch of honey.",
    prepTime: "5 min + overnight",
    category: "Breakfast",
    imageUrl: "",
    difficulty: "Easy",
  },
];

const RecipePage = () => {
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
            <Button variant="outline" className="text-sm">All Recipes</Button>
            <Button variant="outline" className="text-sm">Breakfast</Button>
            <Button variant="outline" className="text-sm">Lunch</Button>
            <Button variant="outline" className="text-sm">Dinner</Button>
            <Button variant="outline" className="text-sm">Snacks</Button>
            <Button variant="outline" className="text-sm">Vegetarian</Button>
            <Button variant="outline" className="text-sm">Vegan</Button>
            <Button variant="outline" className="text-sm">Gluten-Free</Button>
          </div>
        </div>
      </section>
      
      {/* Recipe Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground">Image Placeholder</div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{recipe.category}</span>
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
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
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

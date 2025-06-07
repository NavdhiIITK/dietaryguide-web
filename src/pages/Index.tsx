import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Search, Utensils, Calculator, BookOpen, Heart, User, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { allIndianRecipes } from "@/data/recipes";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  category: string | null;
  date: string | null;
}
const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-primary/5 overflow-hidden">
        <HeroCanvas />
        <div className="w-full h-full flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 lg:space-y-10 max-w-6xl mx-auto">
            <span className="inline-block px-4 py-2 text-sm md:text-base font-medium text-secondary bg-secondary/10 rounded-full animate-fade-in">
              Nourish Your Body. Elevate Your Life.
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in" style={{animationDelay: "0.2s"}}>
              Your Path to <span className="text-green-300">Personalized</span> Nutrition & Wellness
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl max-w-4xl text-foreground/80 leading-relaxed animate-fade-in px-4" style={{animationDelay: "0.4s"}}>
              Evidence-based guidance for a healthier, happier life through balanced nutrition and mindful eating.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in w-full max-w-lg" style={{animationDelay: "0.6s"}}>
              <Button asChild size="lg" className="text-base md:text-lg px-8 py-4 rounded-full bg-gradient-to-r from-teal-light to-secondary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto min-w-[160px]">
                <Link to="/tools">Explore Tools</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base md:text-lg px-8 py-4 rounded-full border-2 w-full sm:w-auto min-w-[160px]">
                <Link to="/recipes">View Recipes</Link>
              </Button>
            </div>
            
            <div className="mt-12 lg:mt-16 animate-bounce animate-fade-in" style={{animationDelay: "1s"}}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 w-12 h-12" 
                onClick={scrollToContent} 
                aria-label="Scroll down"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={contentRef} className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Your Complete Wellness Resource</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">Expert insights, healthy recipes, and intelligent tools—everything you need to elevate your wellness journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="overflow-hidden border-none shadow-lg rounded-2xl card-hover">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                  <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Evidence-Based Articles</h3>
                <p className="text-foreground/70 mb-4 md:mb-6">
                  Transform your understanding of health with scientifically-backed insights on nutrition, fitness, and disease prevention. Expert-curated content for evidence-based wellness decisions.
                </p>
                <Button asChild variant="outline" className="rounded-full group">
                  <Link to="/blog" className="flex items-center">
                    Read Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-lg rounded-2xl card-hover">
              <div className="h-2 bg-secondary"></div>
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 md:mb-6">
                  <Utensils className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Healthy Recipes</h3>
                <p className="text-foreground/70 mb-4 md:mb-6">
                  Discover quick, nutritious, and customizable healthy recipes tailored for weight loss, PCOS, diabetes, muscle gain, and holistic living. From Indian vegetarian dishes to keto-friendly meals, we've got every diet covered.
                </p>
                <Button asChild variant="outline" className="rounded-full group">
                  <Link to="/recipes" className="flex items-center">
                    Discover Recipes
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-lg rounded-2xl card-hover">
              <div className="h-2 bg-accent"></div>
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 md:mb-6">
                  <Calculator className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">AI-Powered Tools</h3>
                <p className="text-foreground/70 mb-4 md:mb-6">
                  Access cutting-edge AI-powered tools like calorie calculators, BMI trackers, personalized Indian diet planners, and health progress dashboards. Engineered for precision, designed for results.
                </p>
                <Button asChild variant="outline" className="rounded-full group">
                  <Link to="/tools" className="flex items-center">
                    Try Our Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Articles Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Expert tips, science-backed nutrition guidance, and transformative health strategies—curated to empower your wellness journey.</h2>
              <p className="text-foreground/70">Fresh perspectives on nutrition and wellness</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blog" className="flex items-center">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-none shadow-md rounded-xl card-hover">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Healthy food with vegetables and proteins" className="h-48 w-full object-cover" />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">Nutrition</span>
                  <span className="text-sm text-foreground/60">April 5, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">Understanding Macronutrients: Your Complete Guide</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">Understand the vital role of proteins, fats, and carbohydrates in your body. Learn how to balance your macronutrient intake for weight loss, muscle building, and optimal energy levels.</p>
                <Button asChild variant="link" className="p-0 group">
                  <Link to="/blog" className="flex items-center">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md rounded-xl card-hover">
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Person meditating while eating" className="h-48 w-full object-cover" />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-secondary bg-secondary/10 rounded-full">mental health</span>
                  <span className="text-sm text-foreground/60">March 14, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">Mindful Eating: Developing Healthier Food Relationships</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">Learn powerful techniques to develop mindful eating habits. Improve digestion, reduce emotional eating, and create a healthier connection with your meals.
              </p>
                <Button asChild variant="link" className="p-0 group">
                  <Link to="/blog" className="flex items-center">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md rounded-xl card-hover">
              <img src="https://images.unsplash.com/photo-1629210171765-9582dcb26761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Water bottle and glass on blue background" className="h-48 w-full object-cover" />
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full">Health</span>
                  <span className="text-sm text-foreground/60">March 28, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">The Science of Hydration: Why Water Is Essential</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  Unlock the science behind hydration and discover how drinking enough water improves cognitive function, energy levels, metabolism, and skin health.
                </p>
                <Button asChild variant="link" className="p-0 group">
                  <Link to="/blog" className="flex items-center">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Recipe Preview */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Indian Recipes</h2>
              <p className="text-foreground/70">Healthy, authentic flavors from Indian cuisine</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/recipes" className="flex items-center">
                All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allIndianRecipes.slice(0, 4).map(recipe => <Card key={recipe.id} className="overflow-hidden border-none shadow-md rounded-xl card-hover">
                <div className="h-48 relative">
                  <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
                      <Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{recipe.mealType}</span>
                    <span className="text-xs text-foreground/60 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {recipe.prepTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{recipe.title}</h3>
                  <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <Button asChild variant="link" className="p-0 text-sm group">
                    <Link to={`/recipes/${recipe.id}`} className="flex items-center">
                      View Recipe
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Real stories from people who have transformed their relationship with food and health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md rounded-xl p-6 bg-slate-800">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="Sarah J." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Sarah J.</p>
                  <p className="text-sm text-foreground/60">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">The bespoke meal plans have completely transformed how I view nutrition. I’ve lost over a stone and feel more energised, focused, and motivated than ever. DietaryGuide is the perfect tool for anyone serious about fitness and healthy eating.</p>
            </Card>
            
            <Card className="border-none shadow-md rounded-xl p-6 bg-slate-800">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Michael T." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Michael T.</p>
                  <p className="text-sm text-foreground/60">Marathon Runner</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">As an athlete, smart nutrition is key. DietaryGuide helped me fine-tune my diet for peak performance and faster recovery. The app’s insights are spot-on for endurance training and sports nutrition in the UK.</p>
            </Card>
            
            <Card className="border-none shadow-md rounded-xl p-6 bg-slate-800">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="Lisa M." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Lisa M.</p>
                  <p className="text-sm text-foreground/60">Busy Parent</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">The quick, nutritious recipes are a game-changer for busy mums like me. My children now love their veggies, and planning family meals is no longer stressful. It’s ideal for anyone juggling health and parenting.</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Healthy lifestyle" className="absolute top-0 left-0 w-full h-full object-cover opacity-10" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Wellness Community</h2>
                <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                  Get weekly recipes, nutrition tips, and exclusive content delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
                <input type="email" placeholder="Your email address" className="px-4 py-3 flex-1 rounded-full border border-input bg-background focus:ring-2 focus:ring-primary focus-visible:outline-none" />
                <Button className="px-8 rounded-full">Subscribe</Button>
              </div>
              <p className="text-xs text-center mt-4 text-foreground/60">
                By subscribing, you agree to our Privacy Policy. We'll never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Content */}
      <LatestContent />
      
      <Footer />
    </div>;
};
const LatestContent = () => {
  const [latestBlogs, setLatestBlogs] = useState<ContentItem[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const {
          data: blogData,
          error: blogError
        } = await supabase.from('auto_blogs').select('id, title, description, image, category, date').neq('category', 'Recipes').eq('is_published', true).order('date', {
          ascending: false
        }).limit(3);
        if (blogError) throw blogError;
        const {
          data: recipeData,
          error: recipeError
        } = await supabase.from('auto_blogs').select('id, title, description, image, category, date').eq('category', 'Recipes').eq('is_published', true).order('date', {
          ascending: false
        }).limit(3);
        if (recipeError) throw recipeError;
        setLatestBlogs(blogData as ContentItem[]);
        setLatestRecipes(recipeData as ContentItem[]);
      } catch (error) {
        console.error("Error fetching latest content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestContent();
  }, []);
  if (loading) {
    return <div className="py-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">Latest Content</h2>
            <p className="text-muted-foreground mt-2">Loading our latest articles and recipes...</p>
          </div>
        </div>
      </div>;
  }
  if (latestBlogs.length === 0 && latestRecipes.length === 0) {
    return null;
  }
  return <div className="py-16 bg-green-50 dark:bg-green-950/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">Latest Content</h2>
          <p className="text-muted-foreground mt-2">Discover our newest articles and recipes</p>
        </div>
        
        {latestBlogs.length > 0 && <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-green-700 dark:text-green-400">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBlogs.map(blog => <Card key={blog.id} className="overflow-hidden border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.image || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629'} alt={blog.title} className="w-full h-full object-cover" onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
              }} />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-300 line-clamp-2">{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm line-clamp-3">{blog.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${blog.id}`} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                      Read Article →
                    </Link>
                  </CardFooter>
                </Card>)}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog" className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors dark:bg-green-600 dark:hover:bg-green-700">
                View All Articles
              </Link>
            </div>
          </div>}
        
        {latestRecipes.length > 0 && <div>
            <h3 className="text-2xl font-semibold mb-6 text-green-700 dark:text-green-400">Latest Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestRecipes.map(recipe => <Card key={recipe.id} className="overflow-hidden border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352'} alt={recipe.title} className="w-full h-full object-cover" onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80';
              }} />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-300 line-clamp-2">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm line-clamp-3">{recipe.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/recipes/${recipe.id}`} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                      View Recipe →
                    </Link>
                  </CardFooter>
                </Card>)}
            </div>
            <div className="text-center mt-8">
              <Link to="/recipes" className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors dark:bg-green-600 dark:hover:bg-green-700">
                View All Recipes
              </Link>
            </div>
          </div>}
      </div>
    </div>;
};
export default Home;

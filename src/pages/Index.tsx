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

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative z-10 px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center text-center space-generous max-w-5xl">
            <span className="inline-block px-6 py-3 text-sm md:text-base font-medium text-secondary bg-secondary/10 rounded-full animate-fade-in">
              Nourish Your Body. Elevate Your Life.
            </span>
            
            <h1 className="text-hero font-bold leading-tight animate-fade-in max-w-4xl" style={{
            animationDelay: "0.2s"
          }}>
              Your Path to <span className="text-green-300">Personalized</span> Nutrition & Wellness
            </h1>
            
            <p className="text-subtitle max-w-3xl text-foreground/80 leading-relaxed animate-fade-in px-4" style={{
            animationDelay: "0.4s"
          }}>
              Evidence-based guidance for a healthier, happier life through balanced nutrition and mindful eating.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in w-full max-w-lg mt-8" style={{
            animationDelay: "0.6s"
          }}>
              <Button asChild size="lg" className="btn-primary w-full sm:w-auto min-w-[180px]">
                <Link to="/tools">Explore Tools</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-secondary w-full sm:w-auto min-w-[180px]">
                <Link to="/recipes">View Recipes</Link>
              </Button>
            </div>
            
            <div className="mt-16 animate-bounce animate-fade-in" style={{
            animationDelay: "1s"
          }}>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 w-14 h-14" onClick={scrollToContent} aria-label="Scroll down">
                <ArrowDown className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={contentRef} className="section-container">
        <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-center space-luxurious">
          <div>
            <h2 className="text-section-title font-bold mb-6">Your Complete Wellness Resource</h2>
            <p className="text-subtitle text-foreground/70 max-w-3xl mx-auto">Expert insights, healthy recipes, and intelligent tools—everything you need to elevate your wellness journey.</p>
          </div>
          
          <div className="grid-layout">
            <Card className="overflow-hidden border-none shadow-lg rounded-2xl card-hover">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-8 space-comfortable">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Evidence-Based Articles</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
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
              <CardContent className="p-8 space-comfortable">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Utensils className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Healthy Recipes</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
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
              <CardContent className="p-8 space-comfortable">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Tools</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
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
      <section className="section-container bg-muted/30">
        <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16 space-comfortable">
            <div>
              <h2 className="text-section-title font-bold mb-4 text-left">Latest Wellness Insights</h2>
              <p className="text-foreground/70 text-base text-left">Expert tips, science-backed nutrition guidance, and transformative health strategies—curated to empower your wellness journey.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blog" className="flex items-center">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid-layout">
            <Card className="overflow-hidden border-none shadow-md rounded-xl card-hover">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Healthy food with vegetables and proteins" className="h-48 w-full object-cover" />
              <CardContent className="p-6 space-comfortable">
                <div className="flex justify-between items-center mb-3">
                  <span className="tag text-primary bg-primary/10">Nutrition</span>
                  <span className="text-sm text-foreground/60">April 5, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">Understanding Macronutrients: Your Complete Guide</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">Understand the vital role of proteins, fats, and carbohydrates in your body. Learn how to balance your macronutrient intake for weight loss, muscle building, and optimal energy levels.</p>
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
              <CardContent className="p-6 space-comfortable">
                <div className="flex justify-between items-center mb-3">
                  <span className="tag text-secondary bg-secondary/10">mental health</span>
                  <span className="text-sm text-foreground/60">March 14, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">Mindful Eating: Developing Healthier Food Relationships</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">Learn powerful techniques to develop mindful eating habits. Improve digestion, reduce emotional eating, and create a healthier connection with your meals.</p>
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
              <CardContent className="p-6 space-comfortable">
                <div className="flex justify-between items-center mb-3">
                  <span className="tag text-accent bg-accent/10">Health</span>
                  <span className="text-sm text-foreground/60">March 28, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">The Science of Hydration: Why Water Is Essential</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
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
      <section className="section-container">
        <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16 space-comfortable">
            <div>
              <h2 className="text-section-title font-bold mb-4">Trending Indian Recipes</h2>
              <p className="text-foreground/70">Healthy, authentic flavors from Indian cuisine</p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/recipes" className="flex items-center">
                All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allIndianRecipes.slice(0, 4).map(recipe => <Card key={recipe.id} className="overflow-hidden border-none shadow-md rounded-xl card-hover">
                <div className="h-48 relative">
                  <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
                      <Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 space-comfortable">
                  <div className="flex justify-between items-center mb-2">
                    <span className="tag bg-primary/10 text-primary">{recipe.mealType}</span>
                    <span className="text-xs text-foreground/60 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {recipe.prepTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{recipe.title}</h3>
                  <p className="text-sm text-foreground/70 mb-3 line-clamp-2 leading-relaxed">
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
      <section className="section-container">
        <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-center space-luxurious">
          <div>
            <h2 className="text-section-title font-bold mb-6">What Our Community Says</h2>
            <p className="text-subtitle text-foreground/70 max-w-3xl mx-auto">
              Real stories from people who have transformed their relationship with food and health.
            </p>
          </div>
          
          <div className="grid-layout">
            <Card className="border-none shadow-md rounded-xl p-8 bg-slate-800 space-comfortable">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="Sarah J." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Sarah J.</p>
                  <p className="text-sm text-foreground/60">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-foreground/80 italic leading-relaxed">The bespoke meal plans have completely transformed how I view nutrition. I've lost over a stone and feel more energised, focused, and motivated than ever. DietaryGuide is the perfect tool for anyone serious about fitness and healthy eating.</p>
            </Card>
            
            <Card className="border-none shadow-md rounded-xl p-8 bg-slate-800 space-comfortable">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Michael T." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Michael T.</p>
                  <p className="text-sm text-foreground/60">Marathon Runner</p>
                </div>
              </div>
              <p className="text-foreground/80 italic leading-relaxed">As an athlete, smart nutrition is key. DietaryGuide helped me fine-tune my diet for peak performance and faster recovery. The app's insights are spot-on for endurance training and sports nutrition in the UK.</p>
            </Card>
            
            <Card className="border-none shadow-md rounded-xl p-8 bg-slate-800 space-comfortable">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="Lisa M." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-bold">Lisa M.</p>
                  <p className="text-sm text-foreground/60">Busy Parent</p>
                </div>
              </div>
              <p className="text-foreground/80 italic leading-relaxed">The quick, nutritious recipes are a game-changer for busy mums like me. My children now love their veggies, and planning family meals is no longer stressful. It's ideal for anyone juggling health and parenting.</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-none mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 max-w-5xl mx-auto relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Healthy lifestyle" className="absolute top-0 left-0 w-full h-full object-cover opacity-10" />
            <div className="relative z-10 text-center space-generous">
              <div>
                <h2 className="text-section-title font-bold mb-6">Join Our Wellness Community</h2>
                <p className="text-subtitle text-foreground/70 max-w-2xl mx-auto">
                  Get weekly recipes, nutrition tips, and exclusive content delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input type="email" placeholder="Your email address" className="px-6 py-4 flex-1 rounded-full border border-input bg-background focus:ring-2 focus:ring-primary focus-visible:outline-none" />
                <Button className="px-8 py-4 rounded-full">Subscribe</Button>
              </div>
              <p className="text-xs text-center mt-6 text-foreground/60">
                By subscribing, you agree to our Privacy Policy. We'll never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Content */}
      <LatestContent />
      
      <Footer />
    </div>
  );
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
    return <div className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-teal-950/30 relative overflow-hidden">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.4
      }}></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-green-300/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-teal-200/30 to-emerald-300/30 rounded-full blur-xl animate-float" style={{
        animationDelay: "2s"
      }}></div>
        
        <div className="w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mb-6 shadow-lg animate-pulse">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-section-title font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">Latest Content</h2>
          <p className="text-muted-foreground mt-4 text-lg">Loading our newest articles and recipes...</p>
        </div>
      </div>;
  }
  
  if (latestBlogs.length === 0 && latestRecipes.length === 0) {
    return null;
  }
  
  return <div className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-teal-950/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.4
    }}></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-green-300/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-teal-200/30 to-emerald-300/30 rounded-full blur-xl animate-float" style={{
      animationDelay: "2s"
    }}></div>
      
      <div className="w-full max-w-none mx-auto space-luxurious relative z-10">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-section-title font-bold mb-6">Latest Content</h2>
            <p className="text-subtitle text-foreground/70 max-w-3xl mx-auto">Discover our newest articles and recipes crafted with care</p>
          </div>
        </div>
        
        {latestBlogs.length > 0 && <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold mb-4 text-left">Latest Articles</h3>
              <div className="h-px bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800 dark:to-green-800 flex-1 ml-6"></div>
            </div>
            <div className="grid-layout">
              {latestBlogs.map(blog => <Card key={blog.id} className="group overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img src={blog.image || 'https://images.unsplash.com/photo-1505935428862-770b6f24f629'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
              }} />
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        Article
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{blog.description}</p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Link to={`/blog/${blog.id}`} className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                      Read Article 
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </CardFooter>
                </Card>)}
            </div>
            <div className="text-center mt-12">
              <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium">
                <BookOpen className="w-5 h-5 mr-2" />
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>}
        
        {latestRecipes.length > 0 && <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold mb-4 text-left">Latest Recipes</h3>
              <div className="h-px bg-gradient-to-r from-teal-200 to-emerald-200 dark:from-teal-800 dark:to-emerald-800 flex-1 ml-6"></div>
            </div>
            <div className="grid-layout">
              {latestRecipes.map(recipe => <Card key={recipe.id} className="group overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352'} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80';
              }} />
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        Recipe
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{recipe.description}</p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Link to={`/recipes/${recipe.id}`} className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                      View Recipe 
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </CardFooter>
                </Card>)}
            </div>
            <div className="text-center mt-12">
              <Link to="/recipes" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium">
                <Utensils className="w-5 h-5 mr-2" />
                View All Recipes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>}
      </div>
    </div>;
};

export default Home;

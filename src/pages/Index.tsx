
import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const Home = () => {
  // Ref for scrolling to content
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <HeroCanvas />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl">
            Discover Your Path to <span className="text-primary">Nutrition</span> and <span className="text-secondary">Wellness</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-foreground/80">
            Empowering you with the tools, knowledge, and recipes to live your healthiest life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/tools">Explore Tools</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link to="/recipes">View Recipes</Link>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute bottom-8 animate-bounce hover:bg-transparent"
            onClick={scrollToContent}
            aria-label="Scroll down"
          >
            <ArrowDown className="h-8 w-8" />
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={contentRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Empowering Your Health Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-background rounded-xl p-6 shadow-md flex flex-col items-center text-center card-hover">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Latest Health Blogs</h3>
              <p className="text-foreground/70 mb-6">
                Evidence-based articles on nutrition, fitness, and wellness to keep you informed.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/blog">Read Articles</Link>
              </Button>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md flex flex-col items-center text-center card-hover">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 8H18M18 8H20M18 8V6M18 8V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.5 12L11.5 12.01M7.5 12L7.5 12.01M7.5 16L7.5 16.01M11.5 16L11.5 16.01M15.5 16L15.5 16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Healthy Recipes</h3>
              <p className="text-foreground/70 mb-6">
                Delicious, nutritious, and easy-to-prepare meals for every dietary preference.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/recipes">Discover Recipes</Link>
              </Button>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md flex flex-col items-center text-center card-hover">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7.75736C12.5 7.25736 12.5 6.27208 12.0002 5.77208C11.5003 5.27208 10.5146 5.27208 10.0146 5.77208L7.66675 8.12208L5.31885 10.4711C4.81885 10.9711 4.81885 11.9564 5.31967 12.4551C5.8205 12.9538 6.80492 12.9538 7.30492 12.4551L9.65283 10.1061L12 7.75736Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.3418 10.1032L16.7004 12.4525C17.2004 12.9512 18.1756 12.9505 18.6756 12.4518C19.1756 11.9532 19.1764 10.9678 18.6764 10.4678L16.3345 8.13525" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.225 6.75L15.75 8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18.25C12 18.25 12 16.5 12 16.5C12 15.5 13 14.5 14 14.5C15 14.5 15.6104 14.9071 16.0002 15.5C16.3899 16.0929 17 16.5 18 16.5C19 16.5 20 15.5 20 14.5C20 14.5 20 13.36 20 12.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12.75V18.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Health Tools</h3>
              <p className="text-foreground/70 mb-6">
                Use our AI-powered tools to calculate BMI, plan meals, track nutrition, and more.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/tools">Try Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Latest Articles</h2>
            <Button asChild variant="outline">
              <Link to="/blog">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blog Post Cards */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-foreground/60 mb-2">April 5, 2025</div>
                <h3 className="text-xl font-semibold mb-3">Understanding Macronutrients: Your Guide to Proteins, Fats, and Carbs</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  Learn how macronutrients work in your body and how to balance them for optimal health and fitness goals.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/blog">Read More →</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-foreground/60 mb-2">April 2, 2025</div>
                <h3 className="text-xl font-semibold mb-3">Mindful Eating: How to Develop Healthier Food Relationships</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  Discover techniques to bring awareness to your eating habits and develop a more balanced approach to food.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/blog">Read More →</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-foreground/60 mb-2">March 28, 2025</div>
                <h3 className="text-xl font-semibold mb-3">The Science of Hydration: Why Water Is Your Best Friend</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  Explore how proper hydration affects everything from cognitive function to athletic performance.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/blog">Read More →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recipe Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Recipes</h2>
            <Button asChild variant="outline">
              <Link to="/recipes">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recipe Cards */}
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-foreground/60">Breakfast</span>
                  <span className="text-xs text-foreground/60">20 min</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Avocado & Egg Breakfast Bowl</h3>
                <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                  A protein-packed breakfast bowl with avocado, poached eggs, and whole grains.
                </p>
                <Button asChild variant="link" className="p-0" size="sm">
                  <Link to="/recipes">View Recipe →</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-foreground/60">Lunch</span>
                  <span className="text-xs text-foreground/60">15 min</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Mediterranean Quinoa Salad</h3>
                <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                  Fresh vegetables, quinoa, and feta cheese with a light lemon dressing.
                </p>
                <Button asChild variant="link" className="p-0" size="sm">
                  <Link to="/recipes">View Recipe →</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-foreground/60">Dinner</span>
                  <span className="text-xs text-foreground/60">35 min</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Baked Herb Salmon</h3>
                <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                  Wild-caught salmon baked with fresh herbs and served with roasted vegetables.
                </p>
                <Button asChild variant="link" className="p-0" size="sm">
                  <Link to="/recipes">View Recipe →</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Image Placeholder</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-foreground/60">Snack</span>
                  <span className="text-xs text-foreground/60">10 min</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Energizing Protein Balls</h3>
                <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                  No-bake protein balls made with dates, nuts, and protein powder for a healthy snack.
                </p>
                <Button asChild variant="link" className="p-0" size="sm">
                  <Link to="/recipes">View Recipe →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nutriverse Mobile App</h2>
              <p className="text-xl mb-6 text-foreground/80">
                Take your health journey on the go with our upcoming mobile app. Get early access to premium features.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time meal tracking with image recognition</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized AI workout and diet plans</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Progress tracking and health analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Offline access to recipes and workouts</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">Join Waitlist</Button>
                <Button variant="outline" size="lg" className="text-lg px-8">Learn More</Button>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl h-[400px] flex items-center justify-center">
              <div className="text-2xl text-foreground/60">App Preview Image</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 text-foreground/80">
            Get the latest health tips, recipes, and updates delivered straight to your inbox.
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

export default Home;

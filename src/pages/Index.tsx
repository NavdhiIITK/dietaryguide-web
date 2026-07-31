import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";
import SEOOptimizer from "@/components/SEOOptimizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Utensils, Calculator, BookOpen, Heart, Clock } from "lucide-react";
import { allIndianRecipes } from "@/data/recipes";
import { useLatestBlogPosts } from "@/hooks/use-latest-blog-posts";
import PressGallery from "@/components/PressGallery";
import { format } from "date-fns";

const FALLBACK_BLOG_IMAGE = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { posts: latestInsights, loading: insightsLoading } = useLatestBlogPosts(3);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-900">
      <SEOOptimizer
        title="Dietary Guide – India's #1 AI Nutrition Platform | Diet Plans, Recipes & Tools"
        description="Dietary Guide is India's leading AI nutrition platform by Navdhi. Personalized Indian diet plans based on ICMR guidelines, healthy recipes, BMI calculator, meal planner & expert wellness guidance. Start free today."
        keywords="Dietary Guide, dietaryguide.in, Dietary Guide India, Dietary Guide by Navdhi, AI diet planner India, Indian diet plan for weight loss, healthy Indian recipes, BMI calculator, personalized nutrition, ICMR diet guidelines, meal planner India, AI nutrition assistant, calorie tracker India"
        url="/"
        breadcrumbs={[{ name: "Home", url: "https://dietaryguide.in/" }]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section pt-16">
        <HeroCanvas />
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative z-10 px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center text-center space-comfortable max-w-5xl">
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
      <section ref={contentRef} className="py-24 bg-gray-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Explore Our Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Expert insights, healthy recipes, and intelligent tools—everything you need to elevate your wellness journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 rounded-3xl p-8 text-center hover:bg-gray-750 transition-all duration-300 hover:-translate-y-2 shadow-xl">
              <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 mx-auto">
                <Calculator className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">AI-Powered Tools</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Get personalized recommendations based on your health data and goals.
              </p>
              <Button asChild variant="outline" className="rounded-full border-gray-600 hover:bg-gray-700 text-white">
                <Link to="/tools">Try Our Tools</Link>
              </Button>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-3xl p-8 text-center hover:bg-gray-750 transition-all duration-300 hover:-translate-y-2 shadow-xl">
              <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 mx-auto">
                <Utensils className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">Healthy Recipes</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Explore a variety of delicious and nutritious recipes tailored to your dietary needs.
              </p>
              <Button asChild variant="outline" className="rounded-full border-gray-600 hover:bg-gray-700 text-white">
                <Link to="/recipes">Discover Recipes</Link>
              </Button>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-3xl p-8 text-center hover:bg-gray-750 transition-all duration-300 hover:-translate-y-2 shadow-xl">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 mx-auto">
                <BookOpen className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">Evidence-Based Articles</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Access a library of articles written by experts, covering a wide range of health topics.
              </p>
              <Button asChild variant="outline" className="rounded-full border-gray-600 hover:bg-gray-700 text-white">
                <Link to="/blog">Read Articles</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 bg-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-left text-white">Latest Wellness Insights</h2>
              <p className="text-gray-300 text-base text-left">Expert tips, science-backed nutrition guidance, and transformative health strategies—curated to empower your wellness journey.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-gray-600 hover:bg-gray-700 text-white">
              <Link to="/blog" className="flex items-center">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden bg-gray-900 border-gray-700 rounded-2xl shadow-xl">
                  <Skeleton className="h-48 w-full bg-gray-800" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-4 bg-gray-800" />
                    <Skeleton className="h-6 w-full mb-2 bg-gray-800" />
                    <Skeleton className="h-6 w-3/4 mb-4 bg-gray-800" />
                    <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
                    <Skeleton className="h-4 w-2/3 bg-gray-800" />
                  </CardContent>
                </Card>
              ))
            ) : (
              latestInsights.map((post) => (
                <Card key={post.slug} className="overflow-hidden bg-gray-900 border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={post.image || FALLBACK_BLOG_IMAGE}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_BLOG_IMAGE;
                    }}
                  />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                        {post.tags?.[0] || "Health"}
                      </span>
                      <span className="text-sm text-gray-400">
                        {post.created_at ? format(new Date(post.created_at), "MMMM d, yyyy") : ""}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{post.snippet}</p>
                    <Button asChild variant="link" className="p-0 text-primary hover:text-primary/80">
                      <Link to={`/blog/${post.slug}`} className="flex items-center">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <PressGallery />

      {/* Newsletter */}
      <section className="py-24 bg-gray-900">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Healthy lifestyle" className="absolute top-0 left-0 w-full h-full object-cover opacity-10" />
            <div className="relative z-10">
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-6 text-white">Join Our Wellness Community</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Get weekly recipes, nutrition tips, and exclusive content delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input type="email" placeholder="Your email address" className="px-6 py-4 flex-1 rounded-full border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus-visible:outline-none" />
                <Button className="px-8 py-4 rounded-full">Subscribe</Button>
              </div>
              <p className="text-xs text-center mt-6 text-gray-400">
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
  const { posts: latestBlogs, loading } = useLatestBlogPosts(3);

  // Get most popular recipes (trending ones)
  const popularRecipes = allIndianRecipes.filter(recipe => recipe.isTrending).slice(0, 3);

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

  if (latestBlogs.length === 0 && popularRecipes.length === 0) {
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
          <p className="text-subtitle text-foreground/70 max-w-3xl mx-auto">Discover our newest articles and most popular recipes</p>
        </div>
      </div>

      {latestBlogs.length > 0 && <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold mb-4 text-left">Latest Articles</h3>
          <div className="h-px bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800 dark:to-green-800 flex-1 ml-6"></div>
        </div>
        <div className="grid-layout">
          {latestBlogs.map((blog) => <Card key={blog.slug} className="group overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img src={blog.image || FALLBACK_BLOG_IMAGE} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => {
                (e.target as HTMLImageElement).src = FALLBACK_BLOG_IMAGE;
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
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{blog.snippet}</p>
            </CardContent>
            <CardFooter className="pt-4">
              <Link to={`/blog/${blog.slug}`} className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
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

      {popularRecipes.length > 0 && <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold mb-4 text-left">Most Popular Recipes</h3>
          <div className="h-px bg-gradient-to-r from-teal-200 to-emerald-200 dark:from-teal-800 dark:to-emerald-800 flex-1 ml-6"></div>
        </div>
        <div className="grid-layout">
          {popularRecipes.map(recipe => <Card key={recipe.id} className="group overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80';
              }} />
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  <Heart className="w-3 h-3 inline mr-1" />
                  Popular
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{recipe.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {recipe.prepTime}
                </span>
                {recipe.nutritionFacts?.calories && (
                  <span>{recipe.nutritionFacts.calories}</span>
                )}
              </div>
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

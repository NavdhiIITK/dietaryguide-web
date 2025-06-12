
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calculator, Utensils, Brain, Calendar, Heart, Smartphone } from "lucide-react";
import SEOOptimizer from "./SEOOptimizer";
import SEOAnalytics from "./SEOAnalytics";

const SEOHomepage = () => {
  return (
    <>
      <SEOOptimizer
        title="AI Meal Planner India | Best Indian Nutrition App 2025 | DietaryGuide"
        description="India's #1 AI-powered nutrition app with smart meal planning, BMI calculator, healthy Indian recipes, and Google Calendar integration. Get personalized diet plans for Indian cuisine."
        keywords="AI meal planner India, Indian nutrition app, BMI calculator India, healthy Indian recipes, vegan Indian meal tracker, AI nutrition assistant, Google integrated meal planner, AI health coach app, best diet planning app India"
        type="website"
        schemaType="WebPage"
        schemaData={{
          title: "AI Meal Planner India | Best Indian Nutrition App 2025",
          description: "India's leading AI-powered nutrition platform with smart meal planning, healthy Indian recipes, and personalized diet coaching",
          features: ["AI Meal Planning", "BMI Calculator", "Indian Recipe Database", "Google Calendar Integration", "Nutrition Tracking"]
        }}
      />
      
      <SEOAnalytics
        pageName="Homepage - AI Meal Planner India"
        keywords={["AI meal planner India", "Indian nutrition app", "BMI calculator India", "healthy Indian recipes"]}
        contentType="homepage"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        {/* Hero Section - Optimized for Primary Keywords */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-forest to-spring bg-clip-text text-transparent">
              India's #1 AI Meal Planner & Nutrition App
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Smart AI nutrition assistant designed for Indian cuisine. Get personalized diet plans, 
              track Indian meals with our BMI calculator, discover healthy Indian recipes, and integrate 
              seamlessly with Google Calendar for effortless meal planning.
            </p>
            
            {/* Key Features Highlighting Target Keywords */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
              <span className="px-4 py-2 bg-forest/10 text-forest rounded-full">
                🤖 AI Meal Planner India
              </span>
              <span className="px-4 py-2 bg-spring/10 text-spring rounded-full">
                📊 BMI Calculator India
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full">
                🥗 Healthy Indian Recipes
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                📅 Google Calendar Integration
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button asChild size="lg" className="bg-forest hover:bg-spring text-white min-w-[200px]">
                <Link to="/tools/ai-diet-planner">Start AI Meal Planning</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                <Link to="/tools">Try BMI Calculator</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Features - Targeting Commercial Keywords */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why DietaryGuide is India's Best AI Nutrition Assistant
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered platform combines cutting-edge technology with deep understanding 
                of Indian dietary patterns to deliver personalized nutrition guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-forest/20 hover:border-forest/40 transition-colors h-full">
                <CardHeader className="text-center">
                  <Brain className="h-12 w-12 text-forest mx-auto mb-4" />
                  <CardTitle className="text-xl">Smart AI Meal Planner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our AI meal planner understands Indian cuisine, from South Indian dosas to 
                    North Indian rotis. Get personalized meal plans that respect your cultural 
                    preferences while meeting your health goals.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>✓ 10,000+ Indian recipes analyzed</li>
                    <li>✓ Regional cuisine expertise</li>
                    <li>✓ Vegan & vegetarian specialized tracking</li>
                    <li>✓ ICMR nutrition standards compliance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-forest/20 hover:border-forest/40 transition-colors h-full">
                <CardHeader className="text-center">
                  <Calculator className="h-12 w-12 text-forest mx-auto mb-4" />
                  <CardTitle className="text-xl">Advanced BMI Calculator India</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our BMI calculator is calibrated for Indian body types and provides 
                    personalized recommendations based on Indian nutritional guidelines 
                    and lifestyle factors.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>✓ Indian population-specific calculations</li>
                    <li>✓ Age and gender adjustments</li>
                    <li>✓ Health risk assessments</li>
                    <li>✓ Personalized improvement plans</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-forest/20 hover:border-forest/40 transition-colors h-full">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-forest mx-auto mb-4" />
                  <CardTitle className="text-xl">Google Calendar Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Seamlessly integrate your meal plans with Google Calendar and Google Tasks. 
                    Never miss a meal or forget grocery shopping with our smart scheduling system.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>✓ Automatic meal scheduling</li>
                    <li>✓ Smart grocery list generation</li>
                    <li>✓ Cooking time optimization</li>
                    <li>✓ Family meal coordination</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Indian Recipe Focus Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Healthy Indian Recipes for Every Diet Goal
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From traditional dal recipes to modern vegan Indian meals, our AI nutrition assistant 
                helps you discover and track healthy Indian recipes perfectly suited to your dietary needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Utensils className="h-8 w-8 text-forest mx-auto mb-2" />
                  <CardTitle className="text-lg">Weight Loss Recipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Low-calorie Indian recipes designed for healthy weight management
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-8 w-8 text-forest mx-auto mb-2" />
                  <CardTitle className="text-lg">Diabetic-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Blood sugar-friendly Indian meals with low glycemic index
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Utensils className="h-8 w-8 text-forest mx-auto mb-2" />
                  <CardTitle className="text-lg">Vegan Indian Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plant-based Indian nutrition tracking with protein optimization
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-8 w-8 text-forest mx-auto mb-2" />
                  <CardTitle className="text-lg">High Protein Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Protein-rich Indian recipes for muscle building and fitness
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-forest hover:bg-spring text-white">
                <Link to="/recipes">Explore Healthy Indian Recipes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Technology Section - Highlighting Advanced Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Advanced AI Health Coach for Indians
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powered by cutting-edge AI technology, our platform provides intelligent 
                health coaching tailored specifically for Indian dietary patterns and lifestyle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">AI-Powered Features</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-forest font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Image-Based Food Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Upload photos of your Indian meals for instant nutritional analysis and recommendations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-forest font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Mood-Reactive AI Avatars</h4>
                      <p className="text-sm text-muted-foreground">
                        Personalized AI coaching that adapts to your mood and energy levels
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-forest font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">ICMR-Standard Meal Scoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time meal quality assessment based on Indian Council of Medical Research guidelines
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-forest/5 to-spring/5 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Try Our AI Tools</h3>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/tools/ai-meal-analyzer">
                      <Smartphone className="mr-2 h-4 w-4" />
                      AI Meal Analyzer
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/tools/ai-recipe-generator">
                      <Utensils className="mr-2 h-4 w-4" />
                      AI Recipe Generator
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/tools/ai-workout-planner">
                      <Heart className="mr-2 h-4 w-4" />
                      AI Workout Planner
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & Trust Signals */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">
              Trusted by Indians Nationwide for Smart Nutrition
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="text-3xl font-bold text-forest mb-2">50,000+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest mb-2">10,000+</div>
                <div className="text-muted-foreground">Indian Recipes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest mb-2">95%</div>
                <div className="text-muted-foreground">User Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest mb-2">24/7</div>
                <div className="text-muted-foreground">AI Support</div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                "DietaryGuide.in has transformed how I approach nutrition. The AI meal planner 
                understands my Indian food preferences while helping me achieve my health goals. 
                The Google Calendar integration makes meal planning effortless!"
              </p>
              <div className="text-sm font-medium">
                - Priya S., Mumbai | Verified User
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-forest to-spring text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your AI-Powered Nutrition Journey Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of Indians who have transformed their health with our 
              AI meal planner and nutrition coaching platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="min-w-[200px]">
                <Link to="/tools/ai-diet-planner">Get Free AI Meal Plan</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white hover:text-forest">
                <Link to="/app">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SEOHomepage;

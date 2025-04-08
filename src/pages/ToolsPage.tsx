
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolsAIRecipeGenerator from "@/components/ToolsAIRecipeGenerator";
import ToolsAIMealAnalyzer from "@/components/ToolsAIMealAnalyzer";
import ToolsAIWorkoutPlanner from "@/components/ToolsAIWorkoutPlanner";
import ToolsAIDietPlanner from "@/components/ToolsAIDietPlanner";
import EmailCollectionForm from "@/components/EmailCollectionForm";
import { Calculator, ChefHat, Dumbbell, Pizza, Salad, FileCode } from "lucide-react";

const ToolsPage = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [activeTab, setActiveTab] = useState("bmi");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  useEffect(() => {
    // Check if user has already submitted email in this session
    const storedEmail = localStorage.getItem('dietaryGuideEmail');
    if (storedEmail) {
      setIsAccessGranted(true);
    }
  }, []);

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    const heightInMeters = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightKg)) return;
    
    const bmi = weightKg / (heightInMeters * heightInMeters);
    setBmiResult(parseFloat(bmi.toFixed(1)));
    
    // Determine BMI category
    if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi < 25) {
      setBmiCategory("Normal Weight");
    } else if (bmi < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  };

  const handleTabClick = (tabId: string) => {
    // Only show email form if user hasn't granted access yet
    if (!isAccessGranted && tabId !== "bmi") {
      setShowEmailForm(true);
      // Store which tab they were trying to access
      localStorage.setItem('pendingTabAccess', tabId);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleEmailSubmissionComplete = () => {
    setIsAccessGranted(true);
    setShowEmailForm(false);
    
    // Navigate to the tab they were trying to access
    const pendingTab = localStorage.getItem('pendingTabAccess');
    if (pendingTab) {
      setActiveTab(pendingTab);
      localStorage.removeItem('pendingTabAccess');
    }
  };

  // If showing email form, render it in a modal
  if (showEmailForm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80">
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <EmailCollectionForm 
              toolName={activeTab} 
              onComplete={handleEmailSubmissionComplete} 
            />
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            AI-Powered Health & Nutrition Tools
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Optimize your diet, fitness, and overall wellness with our cutting-edge AI tools.
          </p>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="max-w-5xl mx-auto"
          >
            <div className="overflow-x-auto pb-6">
              <TabsList className="inline-flex w-auto p-1 rounded-full bg-muted/70 mb-8 flex-wrap justify-center gap-1 sm:flex-nowrap">
                <TabsTrigger 
                  value="bmi" 
                  onClick={() => handleTabClick("bmi")}
                  className="rounded-full flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                >
                  <Calculator className="h-4 w-4" />
                  BMI Calculator
                </TabsTrigger>
                <TabsTrigger 
                  value="recipe-gen" 
                  onClick={() => handleTabClick("recipe-gen")}
                  className="rounded-full flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                >
                  <ChefHat className="h-4 w-4" />
                  Recipe Generator
                </TabsTrigger>
                <TabsTrigger 
                  value="workout" 
                  onClick={() => handleTabClick("workout")}
                  className="rounded-full flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                >
                  <Dumbbell className="h-4 w-4" />
                  Workout Planner
                </TabsTrigger>
                <TabsTrigger 
                  value="diet" 
                  onClick={() => handleTabClick("diet")}
                  className="rounded-full flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                >
                  <Pizza className="h-4 w-4" />
                  Diet Planner
                </TabsTrigger>
                <TabsTrigger 
                  value="meal-tracker" 
                  onClick={() => handleTabClick("meal-tracker")}
                  className="rounded-full flex items-center gap-2 px-4 py-2 whitespace-nowrap"
                >
                  <Salad className="h-4 w-4" />
                  Meal Analyzer
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* BMI Calculator */}
            <TabsContent value="bmi" id="bmi" className="space-y-6 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-lg dark:bg-gray-800/50">
                <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/20">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    BMI Calculator
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Calculate your Body Mass Index (BMI) to see if you're at a healthy weight.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input 
                          id="height" 
                          type="number" 
                          placeholder="e.g., 175" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input 
                          id="weight" 
                          type="number" 
                          placeholder="e.g., 70" 
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={calculateBMI}>Calculate BMI</Button>
                    </div>
                    
                    <div className="bg-muted/30 dark:bg-gray-700/50 rounded-lg p-6 flex flex-col items-center justify-center">
                      {bmiResult ? (
                        <>
                          <h3 className="text-2xl font-bold mb-2">Your BMI</h3>
                          <div className="text-4xl font-bold text-primary mb-4">{bmiResult}</div>
                          <div className="text-lg font-medium px-4 py-1 rounded-full bg-primary/20 dark:bg-primary/30">{bmiCategory}</div>
                          <div className="mt-4 text-sm text-foreground/70 dark:text-gray-300 text-center">
                            BMI is a screening tool, not a diagnostic of body fatness or health.
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-foreground/70 dark:text-gray-300">
                          Enter your height and weight to calculate your BMI.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Recipe Generator */}
            <TabsContent value="recipe-gen" id="recipe-generator" className="space-y-6 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-lg dark:bg-gray-800/50">
                <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/20">
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    AI Recipe Generator
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Generate healthy recipes based on the ingredients you have available.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ToolsAIRecipeGenerator />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Workout Planner */}
            <TabsContent value="workout" id="workout-planner" className="space-y-6 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-lg dark:bg-gray-800/50">
                <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/20">
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    AI Workout Planner
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Generate a personalized weekly workout plan based on your fitness goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ToolsAIWorkoutPlanner />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Diet Planner */}
            <TabsContent value="diet" id="diet-planner" className="space-y-6 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-lg dark:bg-gray-800/50">
                <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/20">
                  <CardTitle className="flex items-center gap-2">
                    <Pizza className="h-5 w-5" />
                    AI Diet Planner
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Create a personalized meal plan based on your nutritional needs and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ToolsAIDietPlanner />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Meal Analyzer */}
            <TabsContent value="meal-tracker" id="meal-tracker" className="space-y-6 animate-fade-in">
              <Card className="overflow-hidden border border-border/40 shadow-lg dark:bg-gray-800/50">
                <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border/20">
                  <CardTitle className="flex items-center gap-2">
                    <Salad className="h-5 w-5" />
                    AI Meal Analyzer
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Get an AI analysis of your meal by uploading a photo or describing what you've eaten.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ToolsAIMealAnalyzer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/10 dark:from-gray-900 dark:to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Tools Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-110">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Your Data</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Provide your personal information, preferences, goals, and any relevant details.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-110">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Our advanced AI analyzes your input and generates personalized recommendations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-110">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Receive tailored plans, recipes, or nutritional analyses to support your health journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Are these tools free to use?</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Yes, all the tools on this page are completely free to use. We're committed to making health and nutrition resources accessible to everyone.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">How accurate are the AI-generated results?</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Our AI tools provide good estimations based on the data you provide, but they should be used as guidance rather than medical advice. For specific health concerns, always consult with a healthcare professional.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Can I save or download my generated plans?</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                Yes, all generated workout and diet plans can be downloaded as PDF files for your convenience. You can also save them to your account if you create one.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">What information do you collect from users?</h3>
              <p className="text-foreground/70 dark:text-gray-300">
                We only collect your email address to provide access to our AI tools. This helps us improve our services and keep you updated with new features. We don't share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ToolsPage;

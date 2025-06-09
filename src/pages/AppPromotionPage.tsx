import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Smartphone, 
  Download, 
  MessageCircle, 
  Camera, 
  Calendar,
  TrendingUp,
  User,
  Shield,
  Brain,
  CheckCircle,
  Star,
  Check,
  X
} from "lucide-react";

const GooglePlayLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
  </svg>
);

const AppleStoreLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
  </svg>
);

const AppPromotionPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Getting to Know You",
      description: "Answer a few simple questions about your health, goals, and preferences",
      features: ["Height & Weight", "Age & Lifestyle", "Health Goals", "Exercise Routine", "Dietary Preferences"]
    },
    {
      id: 2,
      title: "Welcome to IRA's Home!",
      description: "Meet IRA, your AI nutrition buddy with personality and smart meal tracking",
      features: ["Emoji-based AI Avatar", "Mood-responsive Interface", "Smart Meal Logging", "Photo Recognition"]
    }
  ];

  const stats = [
    { number: "2000+", label: "Happy Users" },
    { number: "500+", label: "Health Goals Achieved" }
  ];

  const comparisonFeatures = [
    {
      feature: "AI Nutrition Buddy (IRA)",
      dietaryGuide: true,
      competitors: false,
      description: "Personalized AI companion with emoji-based personality"
    },
    {
      feature: "Photo Meal Recognition",
      dietaryGuide: true,
      competitors: "Limited",
      description: "Advanced AI recognizes food from photos instantly"
    },
    {
      feature: "Expert Consultations",
      dietaryGuide: true,
      competitors: "Paid Separately",
      description: "Built-in access to nutrition experts"
    },
    {
      feature: "Local Indian Recipes",
      dietaryGuide: true,
      competitors: false,
      description: "Extensive database of authentic Indian recipes"
    },
    {
      feature: "Google Calendar Sync",
      dietaryGuide: true,
      competitors: false,
      description: "Automatic meal and workout scheduling"
    },
    {
      feature: "Personalized Diet Plans",
      dietaryGuide: true,
      competitors: "Basic",
      description: "Tailored plans based on lifestyle and goals"
    },
    {
      feature: "Chat-based Interface",
      dietaryGuide: true,
      competitors: false,
      description: "Natural conversation with your AI buddy"
    },
    {
      feature: "Mood-responsive Design",
      dietaryGuide: true,
      competitors: false,
      description: "Interface adapts to your mood and preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your <span className="text-gradient">Smart Nutrition</span> Buddy 
                <br />is Waiting For You
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Meet the Dietary Guide App featuring IRA - your emoji-based AI nutrition companion that understands your lifestyle, 
                plans your meals, and helps you achieve your health goals with personality.
              </p>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-forest hover:bg-spring text-white rounded-full px-8">
                  <GooglePlayLogo />
                  <span className="ml-2">Get it on Google Play</span>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  <AppleStoreLogo />
                  <span className="ml-2">Download on App Store</span>
                </Button>
              </div>

              {/* Free Trial */}
              <div className="flex items-center gap-4 pt-6">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  Free
                </div>
                <span className="text-muted-foreground">Start 7 Days Free Trial Now</span>
              </div>
            </div>

            {/* Phone Mockups */}
            <div className="relative flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-forest/20 to-spring/20 blur-3xl rounded-full"></div>
                <div 
                  className="relative bg-card border rounded-3xl p-6 max-w-sm mx-auto shadow-2xl transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Dietary Guide</h3>
                      <div className="w-8 h-8 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center text-white text-sm">
                        😊
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm font-medium">Good Morning!</div>
                        <div className="text-xs text-muted-foreground">Ready to log your breakfast?</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-forest/10 rounded-lg p-3 text-center">
                          <Camera className="h-6 w-6 mx-auto mb-2 text-forest" />
                          <div className="text-xs">Photo Log</div>
                        </div>
                        <div className="bg-spring/10 rounded-lg p-3 text-center">
                          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-spring" />
                          <div className="text-xs">Chat with IRA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* What is IRA Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">🌟 What is the Dietary Guide App?</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The Dietary Guide App features IRA, your smart, emoji-based nutrition buddy. IRA talks to you, helps you plan what to eat, 
              tracks your meals, and even gives you reminders to stay on track. Think of it like a health coach 
              that lives in your phone, understands your lifestyle, and actually cares.
            </p>
          </div>

          {/* Comparison Table Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              📊 Why Choose Dietary Guide Over Other Apps?
            </h2>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="font-bold text-lg">Feature</TableHead>
                    <TableHead className="font-bold text-lg text-center">
                      <span className="text-gradient">Dietary Guide</span>
                    </TableHead>
                    <TableHead className="font-bold text-lg text-center">Other Diet Apps</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonFeatures.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{item.feature}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.dietaryGuide === true ? (
                          <div className="flex items-center justify-center">
                            <Check className="h-6 w-6 text-forest" />
                          </div>
                        ) : (
                          <span className="text-forest font-semibold">{item.dietaryGuide}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.competitors === false ? (
                          <div className="flex items-center justify-center">
                            <X className="h-6 w-6 text-destructive" />
                          </div>
                        ) : item.competitors === true ? (
                          <div className="flex items-center justify-center">
                            <Check className="h-6 w-6 text-forest" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">{item.competitors}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg text-muted-foreground">
                ✨ <span className="font-semibold text-gradient">Dietary Guide</span> offers features that other apps simply don't have!
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">👣 How It Works — Step-by-Step</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {steps.map((step) => (
                <Card 
                  key={step.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === step.id ? 'border-forest shadow-lg' : 'border-border'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center text-white font-bold">
                        {step.id}
                      </div>
                      <CardTitle className="text-xl">🟢 Step {step.id}: {step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">🍽️ Smart Meal Logging</h3>
              <p className="text-sm text-muted-foreground">Take photos or type what you eat. IRA's AI recognizes and tracks everything.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">📅 Auto Scheduling</h3>
              <p className="text-sm text-muted-foreground">Syncs with Google Calendar for meal and workout reminders.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">💬 Chat with IRA</h3>
              <p className="text-sm text-muted-foreground">Ask IRA anything about nutrition, get instant expert advice.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-forest to-spring rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">📊 Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor BMI, health improvements, and goal achievements.</p>
            </Card>
          </div>

          {/* Navigation Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">🧭 Four Simple Tabs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "H", title: "Home", desc: "Main dashboard with meal logging and IRA" },
                { icon: <MessageCircle className="h-6 w-6" />, title: "Chat", desc: "Full conversation with your AI buddy IRA" },
                { icon: <TrendingUp className="h-6 w-6" />, title: "Stats", desc: "Health progress and achievements" },
                { icon: <User className="h-6 w-6" />, title: "Profile", desc: "Update your preferences anytime" }
              ].map((tab, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    {typeof tab.icon === 'string' ? (
                      <span className="font-bold text-lg">{tab.icon}</span>
                    ) : (
                      tab.icon
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{tab.title}</h3>
                  <p className="text-sm text-muted-foreground">{tab.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-muted rounded-lg p-8 mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">✅ What You Can Expect with the Dietary Guide App</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "No more confusion about what to eat",
                "No more missed meals or inconsistent dieting",
                "No boring calorie counting",
                "A real-time, living, friendly AI assistant (IRA) helping you become your best self"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-forest" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6">🔒 Safe and Private</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Shield className="h-8 w-8" />, title: "Secure Login", desc: "One-click Google sign-in, no passwords needed" },
                { icon: <Brain className="h-8 w-8" />, title: "Smart AI", desc: "Advanced AI that learns and improves with you" },
                { icon: <Star className="h-8 w-8" />, title: "Privacy First", desc: "Your data is never sold or shared" }
              ].map((item, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="text-forest mx-auto mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-forest to-spring rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Meet IRA?</h2>
            <p className="text-xl mb-8 opacity-90">
              Download the Dietary Guide App and start your journey to better health with your personal AI nutrition buddy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8">
                <Download className="mr-2 h-5 w-5" />
                Download Now - It's Free!
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent border-white text-white hover:bg-white hover:text-forest">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppPromotionPage;

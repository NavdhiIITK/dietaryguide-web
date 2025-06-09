
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Apple,
  Play
} from "lucide-react";

const AppPromotionPage = () => {
  const [activeStep, setActiveStep] = useState(1);

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
                  <Play className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  <Apple className="mr-2 h-5 w-5" />
                  Download on App Store
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
                <div className="relative bg-card border rounded-3xl p-6 max-w-sm mx-auto shadow-2xl">
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

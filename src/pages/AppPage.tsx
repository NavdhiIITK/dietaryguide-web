
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Monitor, Tablet, Download } from "lucide-react";

const AppPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-forest to-spring bg-clip-text text-transparent">
              Dietary Guide App
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Take your nutrition journey on the go with our mobile and desktop applications. 
              Access personalized meal plans, AI-powered nutrition tools, and healthy recipes anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-forest hover:bg-spring text-white">
                <Download className="mr-2 h-5 w-5" />
                Download for Mobile
              </Button>
              <Button variant="outline" size="lg">
                <Monitor className="mr-2 h-5 w-5" />
                Desktop Version
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-forest/20 hover:border-forest/40 transition-colors">
              <CardHeader className="text-center">
                <Smartphone className="h-12 w-12 text-forest mx-auto mb-4" />
                <CardTitle>Mobile App</CardTitle>
                <CardDescription>
                  Native iOS and Android app for nutrition tracking on the go
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Offline recipe access</li>
                  <li>• Push notifications for meal times</li>
                  <li>• Camera-based food recognition</li>
                  <li>• Sync across all devices</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-forest/20 hover:border-forest/40 transition-colors">
              <CardHeader className="text-center">
                <Monitor className="h-12 w-12 text-forest mx-auto mb-4" />
                <CardTitle>Desktop App</CardTitle>
                <CardDescription>
                  Full-featured desktop application for comprehensive meal planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Advanced meal planning tools</li>
                  <li>• Detailed nutrition analytics</li>
                  <li>• Bulk recipe management</li>
                  <li>• Export meal plans to PDF</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-forest/20 hover:border-forest/40 transition-colors">
              <CardHeader className="text-center">
                <Tablet className="h-12 w-12 text-forest mx-auto mb-4" />
                <CardTitle>Web App</CardTitle>
                <CardDescription>
                  Access all features directly in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• No installation required</li>
                  <li>• Works on any device</li>
                  <li>• Real-time sync</li>
                  <li>• Regular feature updates</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* App Screenshots */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">App Screenshots</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <span className="text-muted-foreground">Mobile Screenshot 1</span>
              </div>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <span className="text-muted-foreground">Mobile Screenshot 2</span>
              </div>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <span className="text-muted-foreground">Desktop Screenshot</span>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="text-center bg-muted rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Download the Dietary Guide app today and start your journey towards healthier eating habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-forest hover:bg-spring text-white"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.cyrusdemon7.dg&hl=en_IN', '_blank')}
              >
                Download for iOS
              </Button>
              <Button 
                size="lg" 
                className="bg-forest hover:bg-spring text-white"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.cyrusdemon7.dg&hl=en_IN', '_blank')}
              >
                Download for Android
              </Button>
              <Button variant="outline" size="lg">
                Open Web App
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppPage;

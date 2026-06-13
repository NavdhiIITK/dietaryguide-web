import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const logoSrc = theme === "dark" 
    ? "/lovable-uploads/0ffc85f3-226e-419d-85af-b8f96d17a9db.png"
    : "/lovable-uploads/1def17a1-8b2c-4324-aa03-39944f17998d.png";

  return (
    <footer className="bg-muted/50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-primary">
              <img src={logoSrc} alt="Dietary Guide Logo" className="h-16 w-16 object-contain" />
            </Link>
            <p className="mt-4 text-foreground/80">
              Empowering you to make healthier choices through nutrition, fitness, and wellness.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/recipes" className="hover:text-primary transition-colors">Recipes</Link></li>
              <li><Link to="/tools" className="hover:text-primary transition-colors">Health Tools</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Tools</h3>
            <ul className="space-y-2">
              <li><span className="text-foreground/80">BMI Calculator</span></li>
              <li><span className="text-foreground/80">Recipe Generator</span></li>
              <li><span className="text-foreground/80">Workout Planner</span></li>
              <li><span className="text-foreground/80">Diet Planner</span></li>
              <li><span className="text-foreground/80">Meal Tracker</span></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-foreground/80">
              Dietary Guide Mobile App<br />
              iOS & Android
            </p>
            <div className="pt-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Dietary Guide. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
            <a
              href="https://capsules.anvevoice.app/dietary-guide"
              target="_blank"
              rel="noopener"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              AI Knowledge Capsule
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

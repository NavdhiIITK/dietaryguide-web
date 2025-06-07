
import { Link } from "react-router-dom";
import dgLogo from "../../logo/dg.png";

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-primary">
              <img src={dgLogo} alt="Dietary Guide Logo" className="h-12 w-12 object-contain" />
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
              <li><Link to="/tools#bmi" className="hover:text-primary transition-colors">BMI Calculator</Link></li>
              <li><Link to="/tools#recipe-generator" className="hover:text-primary transition-colors">Recipe Generator</Link></li>
              <li><Link to="/tools#workout-planner" className="hover:text-primary transition-colors">Workout Planner</Link></li>
              <li><Link to="/tools#diet-planner" className="hover:text-primary transition-colors">Diet Planner</Link></li>
              <li><Link to="/tools#meal-tracker" className="hover:text-primary transition-colors">Meal Tracker</Link></li>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Recipes", href: "/recipes" },
    { name: "Products", href: "/products" },
    { name: "APP", href: "/app" },
    { name: "Health Tools", href: "/tools" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Determine which logo to use based on theme
  const logoSrc = theme === "dark" 
    ? "/lovable-uploads/0ffc85f3-226e-419d-85af-b8f96d17a9db.png"
    : "/lovable-uploads/1def17a1-8b2c-4324-aa03-39944f17998d.png";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl md:text-3xl font-display font-bold"
        >
          <img src={logoSrc} alt="Dietary Guide Logo" className="h-24 w-24 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`font-medium hover:text-primary transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border-forest dark:border-spring"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-spring" />
            ) : (
              <Moon className="h-5 w-5 text-forest" />
            )}
          </Button>
          <Button asChild variant="default" className="rounded-full bg-forest hover:bg-spring text-white">
            <Link to="/tools">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border-forest dark:border-spring"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-spring" />
            ) : (
              <Moon className="h-5 w-5 text-forest" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden p-4 pt-2 bg-background/95 backdrop-blur-lg border-b">
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium p-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" className="rounded-full bg-forest hover:bg-spring text-white mt-2">
              <Link to="/tools" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

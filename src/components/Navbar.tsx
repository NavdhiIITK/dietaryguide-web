
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Menu, X, ShoppingCart, User, LogOut, Package, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { theme } = useTheme();
  const { totalItems, openCart } = useCart();
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Recipes", href: "/recipes" },
    { name: "AI MODELS", href: "/products" },
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

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = profileDropdownRef.current?.contains(target);
      const inMobile = mobileDropdownRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isStorePage = location.pathname === "/products" || location.pathname.startsWith("/products/");

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
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl md:text-3xl font-display font-bold"
        >
          <img src={logoSrc} alt="Dietary Guide Logo" className="h-24 w-24 object-contain" />
        </Link>

        {/* Desktop Navigation - absolutely centered */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
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
          {isStorePage && (
            <Button
              variant="outline"
              size="icon"
              onClick={openCart}
              aria-label="Open cart"
              className="rounded-full border-forest dark:border-spring relative"
            >
              <ShoppingCart className="h-5 w-5 text-forest dark:text-spring" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          )}
          {isStorePage && !user && (
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="rounded-full border-forest dark:border-spring text-forest dark:text-spring"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
          {isStorePage && user && (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-forest dark:border-spring px-3 py-1.5 hover:bg-muted transition-colors"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold">
                    {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-foreground/80 max-w-[100px] truncate hidden lg:inline">
                  {user.displayName || user.email?.split("@")[0] || "Account"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-foreground/60" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-[200]">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => { navigate("/products/profile"); setProfileDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
                      <User className="h-4 w-4" /> Profile
                    </button>
                    <button onClick={() => { navigate("/products/orders"); setProfileDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
                      <Package className="h-4 w-4" /> Orders
                    </button>
                  </div>
                  <div className="border-t border-border py-1">
                    <button
                      onClick={() => { signOutUser(); setProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {!isStorePage && (
            <Button asChild variant="default" className="rounded-full bg-forest hover:bg-spring text-white">
              <Link to="/products">Get Started</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          {isStorePage && (
            <Button
              variant="outline"
              size="icon"
              onClick={openCart}
              aria-label="Open cart"
              className="rounded-full border-forest dark:border-spring relative"
            >
              <ShoppingCart className="h-5 w-5 text-forest dark:text-spring" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          )}
          {isStorePage && !user && (
            <Button
              variant="outline"
              size="icon"
              onClick={signInWithGoogle}
              aria-label="Login"
              className="rounded-full border-forest dark:border-spring"
            >
              <User className="h-5 w-5 text-forest dark:text-spring" />
            </Button>
          )}
          {isStorePage && user && (
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="rounded-full overflow-hidden border-2 border-forest dark:border-spring"
              aria-label="Account menu"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          )}
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
            {!isStorePage && (
              <Button asChild variant="default" className="rounded-full bg-forest hover:bg-spring text-white mt-2">
                <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            )}
          </div>
        </nav>
      )}

      {/* Mobile profile dropdown */}
      {isStorePage && user && profileDropdownOpen && (
        <div ref={mobileDropdownRef} className="md:hidden absolute right-4 top-[72px] w-52 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-[200]">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground truncate">{user.displayName || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <button onClick={() => { navigate("/products/profile"); setProfileDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
              <User className="h-4 w-4" /> Profile
            </button>
            <button onClick={() => { navigate("/products/orders"); setProfileDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
              <Package className="h-4 w-4" /> Orders
            </button>
          </div>
          <div className="border-t border-border py-1">
            <button
              onClick={() => { signOutUser(); setProfileDropdownOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

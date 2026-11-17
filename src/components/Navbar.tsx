import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Menu, X, ShoppingCart, User, LogOut, Package, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { LOGO } from "@/data/brand";

interface NavChild {
  name: string;
  href: string;
  note: string;
}
interface NavItem {
  name: string;
  href: string;
  children?: NavChild[];
}

const navigation: NavItem[] = [
  {
    name: "Platform",
    href: "/#platform",
    children: [
      { name: "AI Nutrition Assistant", href: "/#ira", note: "Meet IRA, your nutrition companion" },
      { name: "Meal Logging", href: "/#meal-logging", note: "Log a meal with a photograph" },
      { name: "Diet Guidance", href: "/#diet-guidance", note: "Plans shaped around Indian food" },
      { name: "Health Analytics", href: "/#analytics", note: "BMI, metrics and progress" },
      { name: "Free Health Tools", href: "/tools", note: "Try the tools on the web" },
    ],
  },
  {
    name: "Our Products",
    href: "/products",
    children: [
      { name: "Healthy Snacks", href: "/#products-snacks", note: "Chana Jor and Rajma Jor Masala" },
      { name: "Protein Products", href: "/#products-protein", note: "Millet granola and protein bars" },
      { name: "Wellness Range", href: "/#products-wellness", note: "Digestion Tea and The Wellness Treat" },
      { name: "Shop everything", href: "/products", note: "Visit the Dietary Guide store" },
    ],
  },
  {
    name: "Technology",
    href: "/technology",
    children: [
      { name: "About Our Technology", href: "/technology", note: "Navdhi, the company behind the platform" },
      { name: "NAPA", href: "/technology#napa", note: "Advanced Pulse Analyser, in research" },
      { name: "NAHACE", href: "/technology#nahace", note: "Turmeric adulteration detection, in research" },
    ],
  },
  {
    name: "Learn",
    href: "/blog",
    children: [
      { name: "Journal", href: "/blog", note: "Nutrition articles and guides" },
      { name: "Recipes", href: "/recipes", note: "Healthy Indian cooking" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/about#contact" },
];

const Navbar = () => {
  const { totalItems, openCart } = useCart();
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = profileDropdownRef.current?.contains(target);
      const inMobile = mobileDropdownRef.current?.contains(target);
      if (!inDesktop && !inMobile) setProfileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isStorePage = location.pathname === "/products" || location.pathname.startsWith("/products/");

  const isActive = (item: NavItem) => {
    const path = item.href.split("#")[0];
    if (item.href.includes("#") && path === "/about") return false;
    if (path === "/") return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const hoverOpen = (name: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const iconBtn =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-teal/25 text-brand-teal transition-colors hover:bg-brand-teal hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terra";

  const profileMenu = (
    <>
      <div className="border-b border-brand-teal/10 px-4 py-3">
        <p className="truncate text-sm font-semibold text-brand-teal">{user?.displayName || "User"}</p>
        <p className="truncate text-xs text-brand-teal/60">{user?.email}</p>
      </div>
      <div className="py-1">
        <button
          onClick={() => {
            navigate("/products/profile");
            setProfileDropdownOpen(false);
          }}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-brand-teal/85 transition-colors hover:bg-brand-teal/5"
        >
          <User className="h-4 w-4" /> Profile
        </button>
        <button
          onClick={() => {
            navigate("/products/orders");
            setProfileDropdownOpen(false);
          }}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-brand-teal/85 transition-colors hover:bg-brand-teal/5"
        >
          <Package className="h-4 w-4" /> Orders
        </button>
      </div>
      <div className="border-t border-brand-teal/10 py-1">
        <button
          onClick={() => {
            signOutUser();
            setProfileDropdownOpen(false);
          }}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-700 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  );

  const avatar = (size: string) =>
    user?.photoURL ? (
      <img src={user.photoURL} alt="" className={`${size} rounded-full object-cover`} referrerPolicy="no-referrer" />
    ) : (
      <div className={`${size} flex items-center justify-center rounded-full bg-brand-teal text-xs font-bold text-brand-cream`}>
        {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
      </div>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 text-left font-sans md:px-6 md:pt-4">
      <div
        className={`relative mx-auto flex h-[60px] max-w-[1320px] items-center justify-between rounded-full border pl-5 pr-2.5 transition-all duration-300 md:h-[66px] md:pl-7 md:pr-3 ${
          isScrolled || mobileMenuOpen
            ? "border-brand-teal/10 bg-brand-paper/95 shadow-[0_10px_40px_-18px_rgba(13,38,40,0.45)] backdrop-blur-md"
            : "border-brand-teal/10 bg-brand-paper/90 backdrop-blur-sm"
        }`}
      >
        <Link to="/" aria-label="Dietary Guide, home" className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-terra">
          <img src={LOGO.onLight} alt="Dietary Guide" width={500} height={152} className="h-8 w-auto md:h-9" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative" onMouseEnter={() => hoverOpen(item.name)} onMouseLeave={hoverClose}>
                <button
                  type="button"
                  aria-expanded={openMenu === item.name}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.86rem] font-semibold transition-colors hover:bg-brand-teal/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terra ${
                    isActive(item) ? "text-brand-terra" : "text-brand-teal"
                  }`}
                >
                  {item.name}
                  <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${openMenu === item.name ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-4 transition-all duration-200 ${
                    openMenu === item.name ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-brand-paper p-2 shadow-[0_24px_60px_-24px_rgba(13,38,40,0.5)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="group flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-brand-cream focus-visible:bg-brand-cream focus-visible:outline-none"
                      >
                        <span>
                          <span className="block text-sm font-bold text-brand-teal">{child.name}</span>
                          <span className="mt-0.5 block text-xs text-brand-teal/60">{child.note}</span>
                        </span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-terra opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`rounded-full px-3.5 py-2 text-[0.86rem] font-semibold transition-colors hover:bg-brand-teal/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terra ${
                  isActive(item) ? "text-brand-terra" : "text-brand-teal"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isStorePage && (
            <button onClick={openCart} aria-label="Open cart" className={iconBtn}>
              <ShoppingCart className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terra text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          )}
          {isStorePage && !user && (
            <>
              <button
                onClick={signInWithGoogle}
                className="hidden h-10 items-center gap-2 rounded-full border border-brand-teal/25 px-4 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-teal hover:text-brand-cream md:inline-flex"
              >
                <User className="h-4 w-4" /> Login
              </button>
              <button onClick={signInWithGoogle} aria-label="Login" className={`${iconBtn} md:hidden`}>
                <User className="h-[18px] w-[18px]" />
              </button>
            </>
          )}
          {isStorePage && user && (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="Account menu"
                aria-expanded={profileDropdownOpen}
                className="flex items-center gap-2 rounded-full border border-brand-teal/25 p-1 transition-colors hover:bg-brand-teal/5 md:pr-3"
              >
                {avatar("h-8 w-8")}
                <span className="hidden max-w-[100px] truncate text-sm font-semibold text-brand-teal xl:inline">
                  {user.displayName || user.email?.split("@")[0] || "Account"}
                </span>
                <ChevronDown className="hidden h-3.5 w-3.5 text-brand-teal/60 md:block" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full z-[200] mt-3 hidden w-52 overflow-hidden rounded-xl border border-brand-teal/10 bg-brand-paper shadow-lg md:block">
                  {profileMenu}
                </div>
              )}
            </div>
          )}
          {!isStorePage && (
            <Link to="/app" className="dg-btn dg-btn-terra hidden !py-2.5 !px-5 !text-[0.86rem] sm:inline-flex">
              Get Started
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className={`${iconBtn} lg:hidden`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile profile dropdown */}
      {isStorePage && user && profileDropdownOpen && (
        <div
          ref={mobileDropdownRef}
          className="absolute right-4 top-[80px] z-[200] w-52 overflow-hidden rounded-xl border border-brand-teal/10 bg-brand-paper shadow-lg md:hidden"
        >
          {profileMenu}
        </div>
      )}

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="mx-auto mt-2 max-h-[calc(100dvh-92px)] max-w-[1320px] overflow-y-auto rounded-[1.75rem] bg-brand-teal p-6 text-brand-cream shadow-2xl lg:hidden"
        >
          <ul className="divide-y divide-brand-cream/10">
            {navigation.map((item) => (
              <li key={item.name} className="py-4 first:pt-0">
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between font-editorial text-[1.75rem] leading-none"
                >
                  {item.name}
                  {!item.children && <ArrowRight className="h-5 w-5 text-brand-terra" />}
                </Link>
                {item.children && (
                  <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2.5 min-[420px]:grid-cols-2">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          to={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-0.5 text-[0.92rem] font-medium text-brand-cream/75 hover:text-brand-cream"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 min-[420px]:grid-cols-2">
            <Link to="/app" onClick={() => setMobileMenuOpen(false)} className="dg-btn dg-btn-terra">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="dg-btn dg-btn-line-light">
              Explore Our Products
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

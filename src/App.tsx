import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { AuthProvider } from "@/context/auth-context";
import { AdminAuthProvider } from "@/context/admin-auth-context";
import { CartProvider } from "@/context/cart-context";
import { AnalyticsRouteTracker } from "@/components/AnalyticsRouteTracker";

// Pages
import LinksPage from "./pages/LinksPage";
const Index = lazy(() => import("./pages/Index"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminBlogEditor = lazy(() => import("./pages/AdminBlogEditor"));
const ContentDetailPage = lazy(() => import("./pages/ContentDetailPage"));
const RecipePage = lazy(() => import("./pages/RecipePage"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AppPage = lazy(() => import("./pages/AppPage"));
const AppPromotionPage = lazy(() => import("./pages/AppPromotionPage"));
const SEODashboardPage = lazy(() => import("./pages/SEODashboardPage"));
const StoreAccountPage = lazy(() => import("./pages/StoreAccountPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TechnologyPage = lazy(() => import("./pages/TechnologyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

import "./App.css";

// Synchronously forces light theme for all store pages before browser paints
function StoreLayout({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    setTheme("light");
    return () => {
      root.classList.remove("light");
      root.classList.add("dark");
      setTheme("dark");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AdminAuthProvider>
        <CartProvider>
        <AnalyticsRouteTracker />
        <Suspense fallback={<div className="min-h-screen bg-[#FBF9F1]" />}>
        <Routes>
          {/* "/" is the link-in-bio landing page; the full marketing homepage lives at /home */}
          <Route path="/" element={<LinksPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Hidden Admin Routes */}
          <Route path="/admin_blog_maker_editor/login" element={<AdminLogin />} />
          <Route path="/admin_blog_maker_editor" element={<AdminDashboard />} />
          <Route path="/admin_blog_maker_editor/new" element={<AdminBlogEditor />} />
          <Route path="/admin_blog_maker_editor/edit/:slug" element={<AdminBlogEditor />} />

          {/* Legacy routes */}
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/products" element={<StoreLayout><ProductsPage /></StoreLayout>} />
          <Route path="/products/account" element={<StoreLayout><StoreAccountPage /></StoreLayout>} />
          <Route path="/products/profile" element={<StoreLayout><ProfilePage /></StoreLayout>} />
          <Route path="/products/orders" element={<StoreLayout><OrdersPage /></StoreLayout>} />
          <Route path="/products/:id" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
          <Route path="/app" element={<AppPromotionPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/seo-dashboard" element={<SEODashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

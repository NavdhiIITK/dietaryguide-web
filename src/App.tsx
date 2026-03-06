import { Routes, Route } from "react-router-dom";
import { useLayoutEffect, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";

// Pages
import Index from "./pages/Index";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogEditor from "./pages/AdminBlogEditor";
import AdminDatabaseCleanup from "./pages/AdminDatabaseCleanup";
import AdminPage from "./pages/AdminPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import BlogDebugPage from "./pages/BlogDebugPage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import ToolsPage from "./pages/ToolsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AppPage from "./pages/AppPage";
import AppPromotionPage from "./pages/AppPromotionPage";
import SEODashboardPage from "./pages/SEODashboardPage";
import StoreAccountPage from "./pages/StoreAccountPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/NotFound";

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
        <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Hidden Admin Routes */}
          <Route path="/admin_blog_maker_editor/login" element={<AdminLogin />} />
          <Route path="/admin_blog_maker_editor" element={<AdminDashboard />} />
          <Route path="/admin_blog_maker_editor/new" element={<AdminBlogEditor />} />
          <Route path="/admin_blog_maker_editor/edit/:slug" element={<AdminBlogEditor />} />
          <Route path="/admin_blog_maker_editor/cleanup" element={<AdminDatabaseCleanup />} />

          {/* Legacy routes */}
          <Route path="/blog-debug" element={<BlogDebugPage />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/products" element={<StoreLayout><ProductsPage /></StoreLayout>} />
          <Route path="/products/account" element={<StoreLayout><StoreAccountPage /></StoreLayout>} />
          <Route path="/products/profile" element={<StoreLayout><ProfilePage /></StoreLayout>} />
          <Route path="/products/orders" element={<StoreLayout><OrdersPage /></StoreLayout>} />
          <Route path="/products/:id" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
          <Route path="/app" element={<AppPromotionPage />} />
          <Route path="/seo-dashboard" element={<SEODashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

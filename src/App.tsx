import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "@/context/auth-context";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
import AppPage from "./pages/AppPage";
import AppPromotionPage from "./pages/AppPromotionPage";
import SEODashboardPage from "./pages/SEODashboardPage";
import NotFound from "./pages/NotFound";

import "./App.css";
import "./i18n";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <AuthProvider>
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/app" element={<AppPromotionPage />} />
          <Route path="/seo-dashboard" element={<SEODashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

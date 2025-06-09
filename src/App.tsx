
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";

// Pages
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import ToolsPage from "./pages/ToolsPage";
import ProductsPage from "./pages/ProductsPage";
import AppPage from "./pages/AppPage";
import AppPromotionPage from "./pages/AppPromotionPage";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ContentDetailPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/app-promotion" element={<AppPromotionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

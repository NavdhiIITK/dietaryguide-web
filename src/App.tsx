import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ToolsPage from "@/pages/ToolsPage";
import BlogPage from "@/pages/BlogPage";
import RecipePage from "@/pages/RecipePage";
import BlogGenerator from "@/pages/BlogGenerator";
import RecipeGenerator from "@/pages/RecipeGenerator";
import ProductGenerator from "@/pages/ProductGenerator";
import ProductsPage from "@/pages/ProductsPage";
import ContentDetailPage from "@/pages/ContentDetailPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/**
 * Main Application Component
 * 
 * Page Documentation:
 * - Index/Home: Landing page showcasing nutrition & wellness services, featured content, and tools
 * - ToolsPage: Collection of AI-powered tools for meal analysis, diet planning, and workout creation
 * - BlogPage: Archive of nutrition and wellness articles with filtering capabilities
 * - RecipePage: Collection of healthy recipes with filtering and search functionality
 * - BlogGenerator: Tool to create nutrition and wellness blog content with AI assistance
 * - RecipeGenerator: Tool to generate healthy recipes based on ingredients and preferences
 * - ProductGenerator: Tool to generate product information based on ingredients and preferences
 * - ProductsPage: Collection of products with filtering and search functionality
 * - ContentDetailPage: Displays full content for both blogs and recipes with sharing options
 * - NotFound: Error page when routes don't exist
 */
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <NotFound />,
    },
    {
      path: "/tools",
      element: <ToolsPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/blog/:id",
      element: <ContentDetailPage />,
    },
    {
      path: "/recipes",
      element: <RecipePage />,
    },
    {
      path: "/recipes/:id",
      element: <ContentDetailPage />,
    },
    {
      path: "/blog-generator",
      element: <BlogGenerator />,
    },
    {
      path: "/recipe-generator",
      element: <RecipeGenerator />,
    },
    {
      path: "/product-generator",
      element: (
        <ProtectedRoute>
          <ProductGenerator />
        </ProtectedRoute>
      ),
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

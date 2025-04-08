
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ToolsPage from "@/pages/ToolsPage";
import BlogPage from "@/pages/BlogPage";
import RecipePage from "@/pages/RecipePage";
import BlogGenerator from "@/pages/BlogGenerator";
import RecipeGenerator from "@/pages/RecipeGenerator";
import ContentDetailPage from "@/pages/ContentDetailPage";
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
 * - ContentDetailPage: Displays full content for both blogs and recipes with sharing options
 * - NotFound: Error page when routes don't exist
 */
function App() {
  // Routes
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

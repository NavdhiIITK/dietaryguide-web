
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

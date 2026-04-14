
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import CartDrawer from "@/components/CartDrawer";
import SEOOptimizer from "@/components/SEOOptimizer";
import { storeProducts } from "@/data/store-products";
import { Toaster } from "@/components/ui/toaster";

const ProductsPage = () => {

  // Hide AnveVoice widget on /products page only
  useEffect(() => {
    const selectors = [
      "#anve-voice-btn",
      ".chatbot-voice-button",
      "#anve-ai-widget",
      "[id*='anve']",
      "[class*='anve']",
      "[id*='voxcraft']",
      "[class*='voxcraft']",
      "#voxcraft-btn",
      "#voxcraft-branding",
      ".voxcraft-widget-btn",
      ".voxcraft-mode-btn",
    ];
    const hide = () => {
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.setProperty("display", "none", "important");
        });
      });
    };
    hide();
    // Also watch for late-injected elements
    const observer = new MutationObserver(hide);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      // Restore visibility on unmount
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.removeProperty("display");
        });
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#faf9f6" }}>
      <SEOOptimizer
        title="Healthy Snacks & Nutrition Products – Buy Online"
        description="Shop premium healthy snacks: high-protein millet granola, roasted chana jor, protein bars, digestion tea & wellness gift boxes. Clean-label, no preservatives. Free shipping on ₹999+."
        keywords="healthy snacks online India, protein bars India, millet granola buy online, roasted chana snack, digestion tea online, clean label snacks, no preservatives snacks India, protein rich snacks, diet snacks online, wellness gift box India"
        url="/products"
        schemaType="ItemList"
        schemaData={storeProducts}
        breadcrumbs={[
          { name: "Home", url: "https://dietaryguide.in/" },
          { name: "Products", url: "https://dietaryguide.in/products" }
        ]}
      />
      <Navbar />
      <div className="flex-grow" style={{ paddingTop: 0 }}>
        <Products />
      </div>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  );
};

export default ProductsPage;

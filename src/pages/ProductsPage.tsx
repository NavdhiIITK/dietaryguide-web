
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "@/components/ThemeProvider";

const ProductsPage = () => {
  const { theme, setTheme } = useTheme();

  // Force light theme on the products/store page so navbar text is visible
  useEffect(() => {
    const prev = theme;
    if (theme === "dark") setTheme("light");
    return () => {
      // restore on unmount only if we changed it
      if (prev === "dark") setTheme(prev);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

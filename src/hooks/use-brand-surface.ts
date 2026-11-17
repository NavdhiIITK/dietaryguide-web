import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Brand pages are designed on a light cream surface. Force the light theme while
 * they are mounted and restore whatever was active when they unmount.
 */
export function useBrandSurface() {
  const { theme, setTheme } = useTheme();
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = theme;
    root.classList.remove("dark");
    root.classList.add("light");
    if (previous !== "light") setTheme("light");
    return () => {
      if (previous !== "light") {
        root.classList.remove("light");
        root.classList.add(previous === "dark" ? "dark" : "light");
        setTheme(previous);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Scroll to the element named in the URL hash, including after client-side navigation. */
export function useHashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // product range anchors all live inside the product section
    const targetId = id.startsWith("products-") ? "products" : id;
    let tries = 0;
    const attempt = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 20) {
        window.setTimeout(attempt, 60);
      }
    };
    attempt();
  }, [hash, pathname]);
}

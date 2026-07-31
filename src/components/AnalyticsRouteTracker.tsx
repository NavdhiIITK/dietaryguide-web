import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-LQB1MPTV63';

// Internal tooling, not public content — keep staff/admin usage out of
// traffic analytics.
const EXCLUDED_PREFIXES = ['/admin_blog_maker_editor', '/seo-dashboard'];

function isExcluded(pathname: string) {
  return EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * The gtag base snippet in index.html fires exactly one page_view, for
 * whatever URL was actually requested. Every navigation after that is a
 * client-side route change via React Router — no reload, so GA never sees it
 * — which meant Analytics could only ever see the first page of a session,
 * on every route in the app: home, blog list, every blog post, recipes,
 * tools, products. Mounted once here (inside the Router, above <Routes> in
 * App.tsx) it fires the missing page_view on every subsequent navigation, so
 * new blog posts are covered automatically with no per-page wiring.
 */
export function AnalyticsRouteTracker() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // index.html's own gtag('config', ...) already counted this first URL.
      isFirstRender.current = false;
      return;
    }

    if (isExcluded(location.pathname)) return;
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    // react-helmet-async commits the new <title> asynchronously; deferring a
    // tick lets it land before this reads document.title.
    const timer = window.setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `${location.pathname}${location.search}`,
        send_to: GA_MEASUREMENT_ID,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}

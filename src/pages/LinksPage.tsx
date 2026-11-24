import { useLayoutEffect, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import Mascot from "@/components/links/Mascot";
import LinkButton from "@/components/links/LinkButton";
import SocialLinks from "@/components/links/SocialLinks";
import { BRAND, PRIMARY_LINKS, SEO } from "@/data/links";
import { structuredDataSchemas } from "@/data/seoConfig";

/** Browser chrome colour for this page (matches `brand.sage`) and for the rest of the site. */
const SAGE = "#ACB9A3";
const SITE_THEME_COLOR = "#16393C";

/** Entrance stagger: each element rises in `ms` after the page mounts. */
const rise = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// The same entity nodes every other page emits, so the root keeps its Organization and
// WebSite identity for search engines. `author` is the founder node Organization refers to.
const SCHEMAS = [structuredDataSchemas.organization, structuredDataSchemas.website, structuredDataSchemas.author];

/**
 * Link-in-bio landing page served at "/". A standalone microsite: no site navbar or footer.
 * All copy and destinations come from src/data/links.ts.
 */
const LinksPage = () => {
  // Paint the whole viewport sage, including overscroll and the mobile browser chrome.
  // index.html applies the same two changes before React loads, so there is no flash.
  // Every colour on this page is explicit, so it renders the same in the light and dark
  // themes and deliberately leaves the app's theme state alone.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    root.classList.add("dg-links-route");
    themeColor?.setAttribute("content", SAGE);
    return () => {
      root.classList.remove("dg-links-route");
      themeColor?.setAttribute("content", SITE_THEME_COLOR);
    };
  }, []);

  return (
    <div className="dg-links dg-grain">
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <link rel="canonical" href={SEO.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BRAND.name} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:image:alt" content={SEO.imageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:image" content={SEO.image} />
        {SCHEMAS.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <main id="main" className="dg-links-main">
        <header className="dg-links-profile">
          <Mascot />
          <h1 className="dg-links-name dg-links-rise" style={rise(120)}>
            {BRAND.name}
          </h1>
          <p className="dg-links-tagline dg-links-rise" style={rise(190)}>
            {BRAND.tagline}
          </p>
        </header>

        <nav aria-label="Dietary Guide links">
          <ul className="dg-links-list">
            {PRIMARY_LINKS.map((link, index) => (
              <li key={link.id} className="dg-links-rise" style={rise(280 + index * 80)}>
                <LinkButton link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks delay={560} />
      </main>

      <footer className="dg-links-foot dg-links-rise" style={rise(780)}>
        <p>{BRAND.footnote}</p>
      </footer>
    </div>
  );
};

export default LinksPage;

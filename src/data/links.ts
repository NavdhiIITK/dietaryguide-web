// Single source of truth for the link-in-bio landing page served at "/".
// Every destination, label and asset on that page lives here. Edit this file, not the components.

/**
 * Newest public long-form upload on the official YouTube channel (Shorts excluded).
 *
 * To point the "Watch Our Latest Video" button at a newer upload, replace these four
 * values. The button URL is built from `id`, so nothing else needs to change.
 *
 * Last checked 24 Nov 2026 against the channel's uploads. One newer upload was skipped on
 * purpose: "AI Nutrition App for Indian Food | Dietary Guide" (id b8owC3qhDIg, 24 Nov 2026)
 * is a 39-second app promo, not long-form. Use that id here if it should be the target.
 */
export const LATEST_VIDEO = {
  id: "Xss50R2PtwI",
  title: "KYU CHAIYE WHEY PROTEIN?",
  publishedAt: "2026-11-18",
  duration: "6:56",
} as const;

export const SITE_ORIGIN = "https://dietaryguide.in";

export const BRAND = {
  name: "Dietary Guide",
  tagline: "Eat Better. Live Healthier.",
  footnote: "Made with care by Dietary Guide",
} as const;

export const MASCOT = {
  alt: "Dietary Guide's bunny mascot",
  /** Self-hosted, resized copies of the artwork below. Served first because they are ~50x lighter. */
  src: "/brand/mascot/bunny-256.webp",
  srcSet: "/brand/mascot/bunny-256.webp 256w, /brand/mascot/bunny-512.webp 512w",
  /** The original artwork. Used if the self-hosted copies fail to load. */
  fallbackSrc: "https://github.com/amishardev/dgblog/blob/main/Adorable%20Glossy-Eyed%20Bunny%20Portrait.png?raw=true",
} as const;

export const SEO = {
  title: "Dietary Guide | Eat Better. Live Healthier.",
  description:
    "Dietary Guide in one place. Download the app, explore our products, watch our latest video and follow us on YouTube, LinkedIn and Instagram.",
  url: `${SITE_ORIGIN}/`,
  image: `${SITE_ORIGIN}/social-preview.png`,
  imageAlt: "Dietary Guide. Eat Better. Live Healthier.",
} as const;

export type PrimaryLinkIcon = "googlePlay" | "shoppingBag" | "play";

export interface PrimaryLink {
  id: string;
  label: string;
  /** Absolute URL for external destinations, or an in-app path such as "/products". */
  href: string;
  /** External links open in a new tab. In-app links use client-side routing. */
  external: boolean;
  icon: PrimaryLinkIcon;
  /** "primary" fills the button in deep teal. Reserve it for the single most important action. */
  emphasis?: "primary";
  /** Small line shown underneath the button. */
  caption?: string;
  /** Extra context for screen readers, appended to the label. */
  description?: string;
}

/** The three calls to action, in display order. */
export const PRIMARY_LINKS: PrimaryLink[] = [
  {
    id: "app",
    label: "Download Our App",
    href: "https://play.google.com/store/apps/details?id=com.cyrusdemon7.dg&hl=en_IN",
    external: true,
    icon: "googlePlay",
    emphasis: "primary",
    description: "on Google Play",
  },
  {
    id: "products",
    label: "Explore Our Products",
    href: "/products",
    external: false,
    icon: "shoppingBag",
  },
  {
    id: "video",
    label: "Watch Our Latest Video",
    href: `https://www.youtube.com/watch?v=${LATEST_VIDEO.id}`,
    external: true,
    icon: "play",
    caption: "Latest from Dietary Guide on YouTube",
    description: `"${LATEST_VIDEO.title}" on YouTube`,
  },
];

export type SocialIcon = "youtube" | "linkedin" | "instagram";

export interface SocialLink {
  id: SocialIcon;
  name: string;
  href: string;
}

/** Official brand accounts only. */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "youtube", name: "YouTube", href: "https://www.youtube.com/channel/UCdftZAdHaGhQ3yYjWBHQozg" },
  { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/company/dietary-guide" },
  { id: "instagram", name: "Instagram", href: "https://www.instagram.com/dietaryguide.in/" },
];

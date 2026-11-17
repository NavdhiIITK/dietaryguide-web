// Single source of truth for brand assets, links and the product showcase.
// Product facts here mirror what is printed on the packaging or listed in store-products.ts.

export const LOGO = {
  /** Official wordmark, dark teal. For cream and light surfaces. */
  onLight: "/lovable-uploads/1def17a1-8b2c-4324-aa03-39944f17998d.png",
  /** Official wordmark, blush. For deep teal and dark surfaces. */
  onDark: "/lovable-uploads/0ffc85f3-226e-419d-85af-b8f96d17a9db.png",
  /** DG food monogram as printed on the packaging. */
  monogram: "/logo/dg.png",
};

export const LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=com.cyrusdemon7.dg",
  email: "contact@dietaryguide.in",
  instagram: "https://instagram.com/dietaryguide",
  facebook: "https://facebook.com/dietaryguide",
  capsule: "https://capsules.anvevoice.app/dietary-guide",
};

export const COMPANY = {
  address: "236A, Regent Shipra Sun City, Indirapuram, Ghaziabad, Uttar Pradesh - 201014, India",
};

export interface ShowcaseProduct {
  id: string;
  name: string;
  category: string;
  range: "snacks" | "protein" | "wellness";
  image: string;
  /** Packshots on a white ground are blended onto the card instead of shown in a box. */
  blend?: boolean;
  line: string;
  facts: string[];
  price: number;
}

export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "sp-2",
    name: "Chana Jor",
    category: "Roasted snack",
    range: "snacks",
    image: "/brand/products/chana.webp",
    line: "Roasted chana, pressed flat and tossed in masala. The evening namkeen, minus the deep fryer.",
    facts: ["100% roasted", "Vegan", "Clean label"],
    price: 149,
  },
  {
    id: "sp-2b",
    name: "Rajma Jor Masala",
    category: "Roasted snack",
    range: "snacks",
    image: "/brand/products/rajma.webp",
    line: "Kidney beans given the jor treatment. Dense, earthy crunch with a bold masala finish.",
    facts: ["100% roasted", "Vegan", "Clean label"],
    price: 149,
  },
  {
    id: "sp-1",
    name: "High-Protein Millet Granola",
    category: "Breakfast",
    range: "protein",
    image: "/brand/products/granola.webp",
    line: "Millet-based granola built for the first meal of the day, with protein doing the heavy lifting.",
    facts: ["21g protein per serving", "No added sugar", "Clean label"],
    price: 149,
  },
  {
    id: "sp-6",
    name: "Almond Protein Bar",
    category: "Protein bar",
    range: "protein",
    image: "/brand/products/almondbar.webp",
    blend: true,
    line: "A dense almond bar for the gap between lunch and the gym.",
    facts: ["10g plant protein", "No added sugar", "Vegan"],
    price: 55,
  },
  {
    id: "sp-5",
    name: "Mixed Seed Protein Bar",
    category: "Protein bar",
    range: "protein",
    image: "/brand/products/seedbar.webp",
    blend: true,
    line: "Seeds, pressed into a bar. Protein from plants and nothing fried.",
    facts: ["10g plant protein", "No added sugar", "Oil-free"],
    price: 55,
  },
  {
    id: "sp-4",
    name: "Digestion Tea",
    category: "Herbal tea",
    range: "wellness",
    image: "/brand/products/tea.webp",
    line: "A herbal blend for after meals. Light, gentle, and made for a slow cup.",
    facts: ["7 tea bags", "Herbal blend", "Supports digestive wellness"],
    price: 149,
  },
  {
    id: "wt-1",
    name: "The Wellness Treat",
    category: "Gift box",
    range: "wellness",
    image: "/brand/products/wellness.webp",
    line: "Our range in one keepsake box. Built for gifting, or for stocking your own shelf.",
    facts: ["Curated snack box", "Granola, jor, bars and tea", "Ready to gift"],
    price: 999,
  },
];

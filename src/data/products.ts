/* ─── Extended Product Data ─── */

export interface ProductDetail {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  tags: string[];
  badge?: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  ingredients: string[];
  benefits: string[];
  nutrition: { label: string; value: string }[];
}

const HERO_PRODUCT_IMG =
  "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/refs/heads/main/324t32t4erwt-removebg-preview.png";

export const storeProducts: ProductDetail[] = [
  {
    id: "wt-1",
    name: "The Wellness Treat",
    subtitle: "Premium Diet Snack Gift Box",
    price: 1499,
    originalPrice: 1999,
    image: HERO_PRODUCT_IMG,
    images: [
      HERO_PRODUCT_IMG,
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_06_57%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_07_12%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_07_19%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_07_21%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_07_23%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_07_09%20AM.png",
    ],
    tags: ["bestseller", "gift-box", "no-sugar"],
    badge: "Bestseller",
    category: "Gift Box",
    rating: 4.9,
    reviewCount: 124,
    description:
      "A premium wellness gift box curated by Dietary Guide. Includes High-Protein Millet Granola, roasted Chana Jor, plant-protein bars, and a soothing Digestion Tea — all clean-label, no added sugar and no preservatives. Comes in a keepsake branded box with a Dietary Guide branded pouch/tee — ideal for gifting fitness fans, busy professionals, and anyone who prefers healthy, nutrient-dense snacks.",
    ingredients: [
      "High-Protein Millet Granola",
      "Roasted Chana Jor Masala",
      "Plant-Protein Bars",
      "Digestion Tea Sachets",
      "Dietary Guide Branded Pouch/Tee",
    ],
    benefits: [
      "Complete wellness gift — everything in one box",
      "No added sugar, no preservatives",
      "High in protein and fibre",
      "Perfect for gifting health-conscious friends and family",
      "Clean-label, science-backed ingredients",
    ],
    nutrition: [
      { label: "Energy", value: "Varies per product" },
      { label: "Protein", value: "High (21g+ per granola serving)" },
      { label: "Added Sugar", value: "0g" },
      { label: "Preservatives", value: "None" },
    ],
  },
  {
    id: "sp-1",
    name: "High-Protein Millet Granola",
    subtitle: "21g protein / serving",
    price: 449,
    originalPrice: 549,
    image:
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/WhatsApp%20Image%202026-03-01%20at%2012.14.15%20AM-Photoroom.png",
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/WhatsApp%20Image%202026-03-01%20at%2012.14.15%20AM-Photoroom.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_35_55%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_36_04%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_36_08%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_36_17%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_37_08%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_37_11%20AM.png",
    ],
    tags: ["protein", "millet"],
    badge: "New",
    category: "Snacks",
    rating: 4.7,
    reviewCount: 86,
    description:
      "Our high-protein millet granola delivers 21g of plant protein per serving. Made with a blend of jowar, bajra, and ragi millets combined with nuts, seeds, and natural sweeteners. Perfect as a breakfast cereal, smoothie topper, or on-the-go snack.",
    ingredients: [
      "Jowar (Sorghum) Flakes",
      "Bajra (Pearl Millet) Puffs",
      "Ragi (Finger Millet) Crisps",
      "Almonds",
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Flax Seeds",
      "Whey Protein Isolate",
      "Honey (minimal)",
      "Coconut Oil",
    ],
    benefits: [
      "21g protein per serving",
      "Rich in dietary fibre from millets",
      "No refined sugar — sweetened with honey",
      "Gluten-free and easy to digest",
      "Great source of iron and calcium",
    ],
    nutrition: [
      { label: "Energy", value: "420 kcal / 100g" },
      { label: "Protein", value: "21g / serving" },
      { label: "Carbs", value: "48g / 100g" },
      { label: "Fat", value: "14g / 100g" },
      { label: "Fibre", value: "8g / 100g" },
      { label: "Added Sugar", value: "0g" },
    ],
  },
  {
    id: "sp-2",
    name: "Roasted Chana Jor Masala",
    subtitle: "Crunchy & guilt-free",
    price: 199,
    image:
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2012_15_18%20AM-Photoroom.png",
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2012_15_18%20AM-Photoroom.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_42_06%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_42_11%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_42_23%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_46_03%20AM.png",
    ],
    tags: ["snack", "roasted"],
    category: "Snacks",
    rating: 4.6,
    reviewCount: 62,
    description:
      "Crunchy roasted chana seasoned with a signature masala blend. A guilt-free snacking option packed with plant protein and fibre — perfect for evening munchies or as a salad topper.",
    ingredients: [
      "Roasted Bengal Gram (Chana)",
      "Rock Salt",
      "Chaat Masala",
      "Red Chilli Powder",
      "Amchur (Dry Mango Powder)",
      "Black Pepper",
      "Cumin Powder",
    ],
    benefits: [
      "High in plant protein",
      "Rich in dietary fibre",
      "No deep frying — dry roasted",
      "Zero added sugar",
      "Low in saturated fat",
    ],
    nutrition: [
      { label: "Energy", value: "360 kcal / 100g" },
      { label: "Protein", value: "18g / 100g" },
      { label: "Carbs", value: "52g / 100g" },
      { label: "Fat", value: "5g / 100g" },
      { label: "Fibre", value: "12g / 100g" },
    ],
  },
  {
    id: "sp-2b",
    name: "Rajma Jor Masala",
    subtitle: "Spicy & protein-rich snack",
    price: 199,
    image:
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/RAJMAJOR.png",
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/RAJMAJOR.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_46_11%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_46_18%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_46_19%20AM.png",
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2001_50_33%20AM.png",
    ],
    tags: ["snack", "roasted"],
    category: "Snacks",
    rating: 4.5,
    reviewCount: 41,
    description:
      "Roasted rajma (kidney beans) tossed in our signature masala blend. A spicy, protein-rich snack that's crunchy, satisfying, and perfect for health-conscious snackers.",
    ingredients: [
      "Roasted Rajma (Kidney Beans)",
      "Rock Salt",
      "Red Chilli Powder",
      "Coriander Powder",
      "Cumin Powder",
      "Amchur (Dry Mango Powder)",
      "Black Pepper",
    ],
    benefits: [
      "High in plant protein and iron",
      "Rich in fibre for better digestion",
      "No deep frying — dry roasted",
      "No added sugar or preservatives",
      "Great alternative to fried chips",
    ],
    nutrition: [
      { label: "Energy", value: "340 kcal / 100g" },
      { label: "Protein", value: "20g / 100g" },
      { label: "Carbs", value: "48g / 100g" },
      { label: "Fat", value: "4g / 100g" },
      { label: "Fibre", value: "14g / 100g" },
    ],
  },
  {
    id: "sp-3",
    name: "Plant-Protein Bars",
    subtitle: "Clean-label energy on the go",
    price: 349,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=600&q=80",
    ],
    tags: ["protein", "plant-based"],
    category: "Protein",
    rating: 4.8,
    reviewCount: 93,
    description:
      "Clean-label plant-protein bars made with pea protein, nuts, and seeds. No artificial flavours, no added sugar — just wholesome energy for your active lifestyle. Great pre/post workout or as a mid-day snack.",
    ingredients: [
      "Pea Protein Isolate",
      "Almonds",
      "Cashews",
      "Dates",
      "Oats",
      "Coconut Oil",
      "Cocoa Powder",
      "Chia Seeds",
      "Vanilla Extract",
    ],
    benefits: [
      "15g plant protein per bar",
      "No artificial sweeteners or flavours",
      "Rich in healthy fats from nuts",
      "Perfect pre/post workout snack",
      "Vegan and gluten-free",
    ],
    nutrition: [
      { label: "Energy", value: "210 kcal / bar" },
      { label: "Protein", value: "15g / bar" },
      { label: "Carbs", value: "22g / bar" },
      { label: "Fat", value: "9g / bar" },
      { label: "Fibre", value: "5g / bar" },
      { label: "Added Sugar", value: "0g" },
    ],
  },
  {
    id: "sp-4",
    name: "Digestion Tea",
    subtitle: "Soothing herbal blend",
    price: 299,
    image:
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/diegetiontea.png",
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/diegetiontea.png",
    ],
    tags: ["tea", "digestion"],
    category: "Tea",
    rating: 4.7,
    reviewCount: 57,
    description:
      "A soothing herbal tea blend formulated to support healthy digestion. Made with traditional Ayurvedic herbs including fennel, ajwain, and ginger — naturally caffeine-free and perfect after meals.",
    ingredients: [
      "Fennel Seeds (Saunf)",
      "Ajwain (Carom Seeds)",
      "Ginger Root",
      "Peppermint Leaves",
      "Cumin Seeds",
      "Licorice Root",
      "Coriander Seeds",
    ],
    benefits: [
      "Supports healthy digestion",
      "Reduces bloating and gas",
      "Caffeine-free — safe for any time of day",
      "Traditional Ayurvedic ingredients",
      "Soothing and calming after meals",
    ],
    nutrition: [
      { label: "Energy", value: "2 kcal / cup" },
      { label: "Caffeine", value: "0mg" },
      { label: "Servings", value: "25 sachets / pack" },
    ],
  },
];

export function getProductById(id: string): ProductDetail | undefined {
  return storeProducts.find((p) => p.id === id);
}

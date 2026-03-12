export interface StoreProduct {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  nutrition: { label: string; per100g: string; perServing: string }[];
  servingSize: string;
  category: string;
  faqs: { q: string; a: string }[];
}

const HERO_IMG =
  "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/refs/heads/main/324t32t4erwt-removebg-preview.png";

export const storeProducts: StoreProduct[] = [
  {
    id: "wt-1",
    name: "The Wellness Treat",
    subtitle: "Premium Diet Snack Gift Box",
    price: 1499,
    originalPrice: 1999,
    images: [HERO_IMG],
    badge: "Bestseller",
    tags: ["bestseller", "gift-box", "no-sugar"],
    rating: 4.9,
    reviewCount: 128,
    category: "Gift Box",
    servingSize: "Varies per product",
    shortDescription:
      "A premium wellness gift box curated by Dietary Guide — packed with clean-label, no-added-sugar snacks perfect for gifting or stocking up.",
    description:
      "The Wellness Treat is a carefully curated gift box by Dietary Guide that brings together our best-selling, science-backed snacks in one premium keepsake box. Ideal for fitness enthusiasts, busy professionals, or anyone who values clean, nutrient-dense eating. Every item inside is free from artificial additives, no added sugar, and no preservatives. Comes in a branded Dietary Guide box with a branded pouch or tee.",
    ingredients: [
      "High-Protein Millet Granola",
      "Roasted Chana Jor Masala",
      "Plant-Protein Bars",
      "Digestion Tea",
      "Branded Pouch / Tee",
    ],
    benefits: [
      "Clean-label, no artificial additives",
      "No added sugar across all products",
      "High protein, nutrient-dense snacks",
      "Premium keepsake branded box",
      "Perfect for gifting or self-care",
    ],
    nutrition: [
      { label: "Energy", per100g: "420 kcal", perServing: "Varies" },
      { label: "Protein", per100g: "18g", perServing: "Varies" },
      { label: "Carbohydrates", per100g: "52g", perServing: "Varies" },
      { label: "Total Fat", per100g: "12g", perServing: "Varies" },
      { label: "Dietary Fibre", per100g: "6g", perServing: "Varies" },
    ],
    faqs: [
      { q: "What is included in The Wellness Treat box?", a: "The box includes High-Protein Millet Granola, Roasted Chana Jor, Plant-Protein Bars, Digestion Tea, and a branded Dietary Guide pouch or tee." },
      { q: "Is this box suitable for diabetics?", a: "Yes! All products are no-added-sugar and low-glycemic, making them suitable for most diabetics. Please consult your doctor for specific advice." },
      { q: "How long do the products last?", a: "Each product has a shelf life of 3–6 months. Best consumed within 30 days of opening." },
      { q: "Is this available for delivery across India?", a: "Yes, we deliver pan-India. Free shipping on orders above ₹999." },
    ],
  },
  {
    id: "sp-1",
    name: "High-Protein Millet Granola",
    subtitle: "21g protein / serving",
    price: 449,
    originalPrice: 549,
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/WhatsApp%20Image%202026-03-01%20at%2012.14.15%20AM-Photoroom.png",
    ],
    badge: "New",
    tags: ["protein", "millet"],
    rating: 4.7,
    reviewCount: 64,
    category: "Breakfast",
    servingSize: "50g (approx. ½ cup)",
    shortDescription:
      "A crunchy, protein-packed granola made with ancient millet — 21g of protein per serving, no added sugar.",
    description:
      "Our High-Protein Millet Granola is crafted using nutritious millet grains fortified with plant-based protein. It's the perfect high-protein breakfast or snack that keeps you full and energised without the sugar crash. Each batch is made in small quantities to ensure maximum freshness and flavour.",
    ingredients: [
      "Foxtail Millet",
      "Rolled Oats",
      "Pea Protein Isolate",
      "Flaxseeds",
      "Sunflower Seeds",
      "Almonds",
      "Coconut Oil",
      "Stevia (natural sweetener)",
      "Cinnamon",
    ],
    benefits: [
      "21g protein per serving",
      "No added sugar",
      "Rich in dietary fibre",
      "High in iron and magnesium",
      "Slow-release energy for sustained focus",
    ],
    nutrition: [
      { label: "Energy", per100g: "412 kcal", perServing: "206 kcal" },
      { label: "Protein", per100g: "42g", perServing: "21g" },
      { label: "Carbohydrates", per100g: "38g", perServing: "19g" },
      { label: "Total Fat", per100g: "14g", perServing: "7g" },
      { label: "Dietary Fibre", per100g: "9g", perServing: "4.5g" },
      { label: "Sugar", per100g: "0g", perServing: "0g" },
    ],
    faqs: [
      { q: "How should I eat this granola?", a: "Great with unsweetened yogurt, plant-based milk, or even dry as a snack. Works as overnight oats too." },
      { q: "Is it gluten-free?", a: "It is made with millet which is naturally gluten-free, however it is produced in a facility that handles gluten-containing grains." },
      { q: "Can I eat this if I am trying to lose weight?", a: "Yes! The high protein and fibre content promotes satiety, helping you eat less overall." },
    ],
  },
  {
    id: "sp-2",
    name: "Roasted Chana Jor Masala",
    subtitle: "Crunchy & guilt-free",
    price: 199,
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/ChatGPT%20Image%20Mar%206,%202026,%2012_15_18%20AM-Photoroom.png",
    ],
    tags: ["snack", "roasted"],
    rating: 4.6,
    reviewCount: 92,
    category: "Snacks",
    servingSize: "30g",
    shortDescription:
      "Perfectly spiced roasted chana — crunchy, high-protein, and completely guilt-free. A desi snack reimagined.",
    description:
      "Our Roasted Chana Jor Masala is a traditional Indian snack elevated with clean ingredients. Slow-roasted for maximum crunch and seasoned with a house masala blend — no MSG, no preservatives, just real flavour. High in protein and fibre, it's the ideal snack for any time of day.",
    ingredients: [
      "Roasted Chickpeas (Chana)",
      "Rock Salt",
      "Chaat Masala",
      "Amchur (Dry Mango Powder)",
      "Red Chilli Powder",
      "Cumin",
      "Sunflower Oil (trace)",
    ],
    benefits: [
      "High in plant-based protein",
      "Rich in dietary fibre",
      "No preservatives, no MSG",
      "Low glycemic index",
      "Satisfying crunch without the guilt",
    ],
    nutrition: [
      { label: "Energy", per100g: "380 kcal", perServing: "114 kcal" },
      { label: "Protein", per100g: "22g", perServing: "6.6g" },
      { label: "Carbohydrates", per100g: "48g", perServing: "14.4g" },
      { label: "Total Fat", per100g: "6g", perServing: "1.8g" },
      { label: "Dietary Fibre", per100g: "12g", perServing: "3.6g" },
    ],
    faqs: [
      { q: "Is this spicy?", a: "It has a mild-to-medium spice level. Great for most palates." },
      { q: "How long does it stay crunchy?", a: "Up to 90 days in an airtight container away from moisture." },
    ],
  },
  {
    id: "sp-2b",
    name: "Rajma Jor Masala",
    subtitle: "Spicy & protein-rich snack",
    price: 199,
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/RAJMAJOR.png",
    ],
    tags: ["snack", "roasted"],
    rating: 4.5,
    reviewCount: 41,
    category: "Snacks",
    servingSize: "30g",
    shortDescription:
      "Roasted kidney beans with a bold masala kick — a protein-packed twist on the classic Indian snack.",
    description:
      "Rajma Jor Masala is a bold, crunchy snack made from slow-roasted kidney beans (rajma) tossed in our signature masala blend. Packed with plant protein and earthy flavour, it's a satisfying snack that fits perfectly into a healthy lifestyle. No preservatives, no artificial flavours.",
    ingredients: [
      "Roasted Kidney Beans (Rajma)",
      "Rock Salt",
      "Coriander Powder",
      "Cumin",
      "Red Chilli Powder",
      "Amchur",
      "Black Pepper",
    ],
    benefits: [
      "Excellent source of plant protein",
      "High fibre for gut health",
      "No artificial flavours or preservatives",
      "Rich in iron and folate",
      "Naturally gluten-free",
    ],
    nutrition: [
      { label: "Energy", per100g: "340 kcal", perServing: "102 kcal" },
      { label: "Protein", per100g: "24g", perServing: "7.2g" },
      { label: "Carbohydrates", per100g: "44g", perServing: "13.2g" },
      { label: "Total Fat", per100g: "4g", perServing: "1.2g" },
      { label: "Dietary Fibre", per100g: "14g", perServing: "4.2g" },
    ],
    faqs: [
      { q: "Is Rajma Jor Masala suitable for vegans?", a: "Yes, 100% plant-based and vegan friendly." },
      { q: "How is this different from regular chana snacks?", a: "Rajma has a denser, meatier texture and higher iron content compared to chana. Different flavour profile too." },
    ],
  },
  {
    id: "sp-3",
    name: "Plant-Protein Bars",
    subtitle: "Clean-label energy on the go",
    price: 349,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=600&q=80",
    ],
    tags: ["protein", "plant-based"],
    rating: 4.8,
    reviewCount: 55,
    category: "Bars",
    servingSize: "1 bar (45g)",
    shortDescription:
      "Wholesome plant-protein bars with 15g protein, no added sugar, and real ingredients you can actually read.",
    description:
      "Our Plant-Protein Bars are made for people who demand quality ingredients without compromising on taste. Each bar is cold-pressed with dates, nuts, seeds, and plant protein — no syrups, no artificial sweeteners, no fillers. A perfect pre-workout snack or mid-day energy boost.",
    ingredients: [
      "Medjool Dates",
      "Pea Protein Isolate",
      "Almonds",
      "Cashews",
      "Sunflower Seeds",
      "Cocoa Powder",
      "Chia Seeds",
      "Vanilla Extract",
      "Rock Salt",
    ],
    benefits: [
      "15g plant protein per bar",
      "Naturally sweetened with dates",
      "No added sugar or artificial sweeteners",
      "Clean, whole-food ingredients",
      "Great for pre/post workout",
    ],
    nutrition: [
      { label: "Energy", per100g: "380 kcal", perServing: "171 kcal" },
      { label: "Protein", per100g: "34g", perServing: "15g" },
      { label: "Carbohydrates", per100g: "40g", perServing: "18g" },
      { label: "Total Fat", per100g: "16g", perServing: "7.2g" },
      { label: "Dietary Fibre", per100g: "8g", perServing: "3.6g" },
      { label: "Sugar", per100g: "22g", perServing: "10g (from dates)" },
    ],
    faqs: [
      { q: "Do these bars need refrigeration?", a: "No, they are shelf-stable at room temperature up to 30°C. Refrigeration can extend freshness." },
      { q: "Are these suitable for kids?", a: "Yes, the bars are made with whole food ingredients and are free from artificial additives — suitable for children above 3 years." },
    ],
  },
  {
    id: "sp-4",
    name: "Digestion Tea",
    subtitle: "Soothing herbal blend",
    price: 299,
    images: [
      "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/main/diegetiontea.png",
    ],
    tags: ["tea", "digestion"],
    rating: 4.7,
    reviewCount: 38,
    category: "Teas",
    servingSize: "1 teabag or 1 tsp loose leaf",
    shortDescription:
      "A soothing herbal blend formulated to support digestion, reduce bloating, and calm the gut naturally.",
    description:
      "Our Digestion Tea is a handcrafted herbal blend designed to support your digestive health naturally. Brewed with a combination of time-tested herbs like fennel, ginger, licorice, and peppermint, this caffeine-free tea is perfect after meals or before bed. No artificial flavours, no additives — just pure botanical goodness.",
    ingredients: [
      "Fennel Seeds",
      "Dried Ginger",
      "Peppermint Leaves",
      "Licorice Root",
      "Coriander Seeds",
      "Cardamom",
      "Tulsi (Holy Basil)",
    ],
    benefits: [
      "Reduces bloating and gas",
      "Supports healthy digestion",
      "Calms digestive discomfort",
      "Caffeine-free and soothing",
      "Rich in antioxidants",
    ],
    nutrition: [
      { label: "Energy", per100g: "0 kcal", perServing: "0 kcal" },
      { label: "Carbohydrates", per100g: "0g", perServing: "0g" },
      { label: "Caffeine", per100g: "0mg", perServing: "0mg" },
    ],
    faqs: [
      { q: "How many cups per day is safe?", a: "1–3 cups per day is ideal. Best enjoyed after meals." },
      { q: "Can pregnant women drink this?", a: "Please consult your doctor before consuming herbal teas during pregnancy." },
      { q: "Is this caffeine-free?", a: "Yes, 100% caffeine-free and safe to drink at night." },
    ],
  },
];

// Quick-lookup map
export const productMap = Object.fromEntries(storeProducts.map((p) => [p.id, p]));

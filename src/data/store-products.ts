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
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  topReview?: string;
}

const HERO_IMG =
  "https://raw.githubusercontent.com/amishardev/DGWEBSITEIMG/refs/heads/main/324t32t4erwt-removebg-preview.png";

export const storeProducts: StoreProduct[] = [
  {
    id: "wt-1",
    name: "The Wellness Treat",
    subtitle: "Premium Diet Snack Gift Box",
    price: 999,
    originalPrice: 1499,
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
    seoTitle: "The Wellness Treat – Premium Healthy Snack Gift Box | Buy Online ₹999",
    seoDescription: "Buy The Wellness Treat gift box online ₹999. Includes high-protein millet granola, roasted chana jor, protein bars & digestion tea. No added sugar, no preservatives. Free shipping pan-India. Perfect healthy gift hamper.",
    seoKeywords: "wellness gift box India, healthy snack gift box, protein snack hamper, Dietary Guide gift box, no sugar gift box, healthy gift hamper online, premium diet snack box, fitness gift India, clean label gift box, wellness treat box, healthy gift box online India, buy protein snack gift hamper, no added sugar snack box online, premium wellness gift box for fitness, best healthy snack gift box India, Dietary Guide wellness treat review, clean label gift hamper buy online, diet snack box free shipping India, healthy gift hamper for diabetics, no preservative snack gift box",
    topReview: "Amazing gift box! Gave this to my fitness-conscious friend and they loved it. Every product inside is clean-label and tastes incredible. The granola is our household favourite now.",
  },
  {
    id: "sp-1",
    name: "High-Protein Millet Granola",
    subtitle: "21g protein / serving",
    price: 149,
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
    seoTitle: "High-Protein Millet Granola – 21g Protein | Buy Online ₹149",
    seoDescription: "Buy High-Protein Millet Granola online ₹149. 21g protein per serving, made with foxtail millet, flaxseeds & almonds. No added sugar, no preservatives. Perfect high-protein breakfast cereal for weight loss & muscle gain.",
    seoKeywords: "high protein millet granola, millet granola India, protein granola buy online, 21g protein breakfast, foxtail millet granola, no sugar granola India, healthy breakfast cereal, millet protein snack, Dietary Guide granola, clean label granola, buy millet granola online India, high protein breakfast cereal no sugar, best protein granola for weight loss, foxtail millet granola price India, millet granola 21g protein review, healthy granola for gym India, plant protein breakfast online, no preservative granola India, protein rich millet cereal buy, best clean label granola India",
    topReview: "Best granola I've tried in India! 21g protein per serving is incredible. Tastes amazing with cold milk and keeps me full till lunch. Zero sugar crash. Highly recommend for anyone on a fitness journey.",
  },
  {
    id: "sp-2",
    name: "Roasted Chana Jor Masala",
    subtitle: "Crunchy & guilt-free",
    price: 149,
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
    seoTitle: "Roasted Chana Jor Masala – High Protein Snack | Buy Online ₹149",
    seoDescription: "Buy Roasted Chana Jor Masala online ₹149. Crunchy, high-protein roasted chickpea snack with house masala blend. No MSG, no preservatives, no deep frying. Guilt-free Indian snack for weight management.",
    seoKeywords: "roasted chana jor masala, chana jor garam online, roasted chickpea snack India, high protein snack online, healthy namkeen India, guilt free snack buy online, roasted chana buy, no preservative snack, clean label namkeen, Dietary Guide chana jor, buy roasted chana jor masala online India, healthy chana snack for weight loss, best roasted chickpea snack no MSG, high protein namkeen online India, guilt free Indian snack buy online, roasted chana jor masala price, clean label roasted chana India, no preservative namkeen buy online, low calorie chana snack India, best healthy snack for evening India",
    topReview: "Finally a healthy namkeen that actually tastes good! Perfectly spiced and super crunchy. Great with evening chai. Love that it's high in protein and has zero preservatives.",
  },
  {
    id: "sp-2b",
    name: "Rajma Jor Masala",
    subtitle: "Spicy & protein-rich snack",
    price: 149,
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
    seoTitle: "Rajma Jor Masala – Spicy Roasted Kidney Bean Snack | Buy Online ₹149",
    seoDescription: "Buy Rajma Jor Masala online ₹149. Crunchy roasted kidney beans with bold masala seasoning. High protein, high iron, 100% vegan. No artificial flavours, no preservatives. Unique Indian protein snack.",
    seoKeywords: "rajma jor masala, roasted rajma snack, kidney bean snack India, vegan protein snack, roasted rajma buy online, high iron snack India, healthy masala snack, plant protein snack, Dietary Guide rajma jor, gluten free snack India, buy rajma jor masala online India, roasted kidney bean snack price, vegan protein snack buy online India, high iron healthy snack for women, best roasted rajma masala snack, plant based protein snack India, gluten free roasted snack online, unique Indian health snack buy, rajma jor masala review India, healthy spicy snack no preservatives",
    topReview: "Such a unique snack! Never had roasted rajma before — it's crunchy, spicy, and packed with protein. Great vegan alternative to regular namkeen. My kids love it too.",
  },
  {
    id: "sp-4",
    name: "Digestion Tea",
    subtitle: "Soothing herbal blend",
    price: 149,
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
    seoTitle: "Digestion Tea – Ayurvedic Herbal Blend | Buy Online ₹149",
    seoDescription: "Buy Digestion Tea online ₹149. Ayurvedic herbal blend with fennel, ginger, peppermint & licorice. Reduces bloating, supports gut health. 100% caffeine-free, no artificial flavours. Perfect after-meal tea.",
    seoKeywords: "digestion tea India, herbal tea for bloating, ayurvedic digestion tea, caffeine free tea online, fennel ginger tea, gut health tea India, bloating relief tea, after meal tea, Dietary Guide digestion tea, herbal tea buy online, buy digestion tea online India, ayurvedic herbal tea for bloating relief, best caffeine free digestion tea, fennel ginger peppermint tea price, natural gut health tea India, herbal tea for gas and bloating, after meal ayurvedic tea online, Dietary Guide herbal tea review, bloating relief herbal tea buy online, best digestion tea for IBS India",
    topReview: "This tea has been a game-changer for my digestion. I drink it after every meal and the bloating has reduced significantly. Love the fennel-ginger flavour. Caffeine-free so I can have it at night too.",
  },
  {
    id: "sp-5",
    name: "Mixed Seed Protein Bar",
    subtitle: "Nutrient-packed seed bar",
    price: 55,
    images: [
      "https://raw.githubusercontent.com/amishardev/navdhiweb/main/%2C%202026%2C%2008_29_33%20PM.png",
    ],
    badge: "New",
    tags: ["protein", "seeds", "bar"],
    rating: 4.7,
    reviewCount: 32,
    category: "Bars",
    servingSize: "1 bar (35g)",
    shortDescription:
      "A crunchy, nutrient-dense protein bar loaded with mixed seeds — flax, sunflower, pumpkin, and chia — for sustained energy and wholesome nutrition.",
    description:
      "Our Mixed Seed Protein Bar is crafted with a blend of premium seeds including flaxseeds, sunflower seeds, pumpkin seeds, and chia seeds, bound together with natural sweeteners and plant protein. Each bar delivers a satisfying crunch with a balanced macro profile — ideal as a mid-day snack, pre-workout fuel, or a healthy on-the-go option. No artificial preservatives, no refined sugar.",
    ingredients: [
      "Flaxseeds",
      "Sunflower Seeds",
      "Pumpkin Seeds",
      "Chia Seeds",
      "Pea Protein Isolate",
      "Dates",
      "Honey (minimal)",
      "Coconut Oil",
      "Rock Salt",
    ],
    benefits: [
      "Rich in Omega-3 fatty acids from seeds",
      "High in plant-based protein",
      "No refined sugar or artificial sweeteners",
      "Excellent source of dietary fibre",
      "Sustained energy without sugar crash",
    ],
    nutrition: [
      { label: "Energy", per100g: "390 kcal", perServing: "137 kcal" },
      { label: "Protein", per100g: "28g", perServing: "10g" },
      { label: "Carbohydrates", per100g: "36g", perServing: "12.6g" },
      { label: "Total Fat", per100g: "18g", perServing: "6.3g" },
      { label: "Dietary Fibre", per100g: "10g", perServing: "3.5g" },
      { label: "Sugar", per100g: "12g", perServing: "4.2g (from dates)" },
    ],
    faqs: [
      { q: "How many bars come in a pack?", a: "Each pack contains 1 bar (35g). Bundle packs of 6 and 12 are also available." },
      { q: "Is this bar suitable for vegans?", a: "The bar contains honey, so it is vegetarian but not strictly vegan." },
      { q: "Can kids eat this bar?", a: "Yes, it's made with whole food ingredients and is safe for children above 3 years." },
    ],
    seoTitle: "Mixed Seed Protein Bar – 10g Protein | Buy Online ₹55",
    seoDescription: "Buy Mixed Seed Protein Bar online ₹55. Loaded with flax, sunflower, pumpkin & chia seeds. 10g protein per bar, no refined sugar, no preservatives. Perfect pre-workout or on-the-go snack.",
    seoKeywords: "mixed seed protein bar, seed bar India, protein bar buy online, flax seed bar, pumpkin seed bar, healthy protein bar India, no sugar protein bar, pre workout snack bar, Dietary Guide protein bar, plant protein bar, buy mixed seed protein bar online India, best seed protein bar no sugar, healthy protein bar for gym India, flax sunflower pumpkin chia seed bar, affordable protein bar India ₹55, no preservative protein bar online, plant protein seed bar for weight loss, natural protein bar buy online India, healthy snack bar for kids India, best clean label protein bar India",
    topReview: "Best affordable protein bar I've found! The seed crunch is amazing and 10g protein for ₹55 is unbeatable. No artificial taste at all — you can tell it's made with real ingredients.",
  },
  {
    id: "sp-6",
    name: "Almond Protein Bar",
    subtitle: "Crunchy almond goodness",
    price: 55,
    images: [
      "https://raw.githubusercontent.com/amishardev/navdhiweb/main/08_34_57%20PM.png",
    ],
    badge: "New",
    tags: ["protein", "almond", "bar"],
    rating: 4.8,
    reviewCount: 28,
    category: "Bars",
    servingSize: "1 bar (35g)",
    shortDescription:
      "A premium protein bar packed with real almonds and plant protein — crunchy, satisfying, and naturally delicious with no added sugar.",
    description:
      "Our Almond Protein Bar features whole roasted almonds combined with plant protein, oats, and natural binders for a satisfying crunch in every bite. Each bar is a wholesome source of protein, healthy fats, and fibre — perfect for fitness enthusiasts, busy professionals, or anyone looking for a clean, nutritious snack. No artificial colours, no preservatives, no refined sugar.",
    ingredients: [
      "Whole Roasted Almonds",
      "Pea Protein Isolate",
      "Rolled Oats",
      "Dates",
      "Honey (minimal)",
      "Coconut Oil",
      "Vanilla Extract",
      "Rock Salt",
    ],
    benefits: [
      "Rich in protein and healthy fats from almonds",
      "No added sugar or artificial sweeteners",
      "Excellent source of Vitamin E",
      "Supports muscle recovery post-workout",
      "Clean-label, whole food ingredients",
    ],
    nutrition: [
      { label: "Energy", per100g: "410 kcal", perServing: "144 kcal" },
      { label: "Protein", per100g: "30g", perServing: "10.5g" },
      { label: "Carbohydrates", per100g: "34g", perServing: "11.9g" },
      { label: "Total Fat", per100g: "20g", perServing: "7g" },
      { label: "Dietary Fibre", per100g: "8g", perServing: "2.8g" },
      { label: "Sugar", per100g: "10g", perServing: "3.5g (from dates)" },
    ],
    faqs: [
      { q: "Does this contain tree nuts?", a: "Yes, this product contains almonds. Not suitable for those with tree nut allergies." },
      { q: "Is this bar gluten-free?", a: "It contains rolled oats, which may contain traces of gluten. Not recommended for celiac patients." },
      { q: "How should I store the bars?", a: "Store in a cool, dry place. Avoid direct sunlight. Best consumed within 3 months of manufacture." },
    ],
    seoTitle: "Almond Protein Bar – 10.5g Protein | Buy Online ₹55",
    seoDescription: "Buy Almond Protein Bar online ₹55. Packed with whole roasted almonds & plant protein. 10.5g protein per bar, no added sugar, no preservatives. Rich in Vitamin E. Perfect post-workout recovery snack.",
    seoKeywords: "almond protein bar, almond bar India, protein bar buy online, roasted almond bar, healthy almond snack bar, no sugar almond bar, post workout snack, Dietary Guide almond bar, clean label protein bar, Vitamin E snack bar, buy almond protein bar online India, best almond protein bar no sugar, healthy almond bar for gym India, whole roasted almond protein bar price, affordable almond protein bar India ₹55, no preservative almond bar online, almond protein bar for muscle recovery, natural almond snack bar buy online India, best clean label almond bar India, healthy protein bar with real almonds",
    topReview: "Love the real almond chunks in every bite! Tastes like a premium bar but at ₹55 it's a steal. Great post-gym snack. No artificial sweetness — just real almond goodness.",
  },
];

// Quick-lookup map
export const productMap = Object.fromEntries(storeProducts.map((p) => [p.id, p]));


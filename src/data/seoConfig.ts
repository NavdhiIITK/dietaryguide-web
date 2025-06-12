
export interface SEOKeywordGroup {
  category: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
}

export const targetKeywords: SEOKeywordGroup[] = [
  {
    category: "Health & Nutrition",
    primaryKeywords: [
      "healthy diet",
      "nutrition guide",
      "healthy lifestyle",
      "weight loss tips",
      "balanced diet"
    ],
    secondaryKeywords: [
      "healthy eating habits",
      "nutrition facts",
      "diet plan",
      "healthy living",
      "wellness tips"
    ],
    longTailKeywords: [
      "how to maintain healthy diet",
      "best nutrition tips for weight loss",
      "healthy lifestyle changes for beginners",
      "complete guide to balanced nutrition"
    ]
  },
  {
    category: "Indian Diet & Recipes",
    primaryKeywords: [
      "healthy Indian recipes",
      "Indian diet plan",
      "healthy vegan recipes",
      "Indian breakfast recipes",
      "traditional Indian food"
    ],
    secondaryKeywords: [
      "vegetarian Indian recipes",
      "low calorie Indian food",
      "protein rich Indian meals",
      "diabetic friendly Indian recipes",
      "weight loss Indian recipes"
    ],
    longTailKeywords: [
      "healthy Indian breakfast recipes for weight loss",
      "traditional Indian vegan recipes",
      "high protein vegetarian Indian meals",
      "best Indian diet plan for diabetes",
      "authentic healthy Indian cooking methods"
    ]
  },
  {
    category: "AI Health Tools",
    primaryKeywords: [
      "BMI calculator",
      "AI health tools",
      "diet planner",
      "meal analyzer",
      "fitness calculator"
    ],
    secondaryKeywords: [
      "body mass index calculator",
      "AI nutrition planner",
      "smart diet recommendations",
      "health assessment tools",
      "personalized meal plans"
    ],
    longTailKeywords: [
      "free BMI calculator with health recommendations",
      "AI powered personalized diet planning",
      "smart meal analyzer for nutrition tracking",
      "artificial intelligence health assessment tools",
      "automated workout and diet planner"
    ]
  },
  {
    category: "Recipe-Specific",
    primaryKeywords: [
      "moong dal chilla",
      "vegetable oats upma",
      "besan cheela",
      "ragi porridge",
      "millet idli"
    ],
    secondaryKeywords: [
      "healthy breakfast recipes",
      "protein rich breakfast",
      "gluten free Indian breakfast",
      "vegan Indian breakfast",
      "weight loss breakfast"
    ],
    longTailKeywords: [
      "how to make moong dal chilla for weight loss",
      "healthy oats upma recipe with vegetables",
      "spinach besan cheela recipe for protein",
      "calcium rich ragi porridge benefits",
      "traditional millet idli with coconut chutney"
    ]
  }
];

export const seoMetadata = {
  defaultTitle: "DietaryGuide - Healthy Indian Recipes, AI Health Tools & Nutrition Guide",
  defaultDescription: "Your trusted companion for healthy living with authentic Indian recipes, AI-powered health tools, BMI calculator, and personalized nutrition guidance for weight loss and wellness.",
  defaultKeywords: "healthy Indian recipes, AI health tools, BMI calculator, nutrition guide, weight loss diet, vegan recipes, healthy lifestyle, Indian diet plan",
  siteUrl: "https://dietaryguide.in",
  siteName: "DietaryGuide",
  twitterHandle: "@dietaryguide",
  facebookPage: "https://facebook.com/dietaryguide",
  instagramHandle: "@dietaryguide"
};

export const structuredDataSchemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DietaryGuide",
    "url": "https://dietaryguide.in",
    "logo": "https://dietaryguide.in/logo/dg.png",
    "description": "Leading platform for healthy Indian recipes, AI health tools, and nutrition guidance",
    "sameAs": [
      "https://facebook.com/dietaryguide",
      "https://instagram.com/dietaryguide",
      "https://twitter.com/dietaryguide"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    }
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DietaryGuide",
    "url": "https://dietaryguide.in",
    "description": "Your trusted companion for healthy living with authentic Indian recipes and AI-powered health tools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dietaryguide.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
};

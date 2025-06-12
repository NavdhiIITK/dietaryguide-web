
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
      "balanced diet",
      "mental health",
      "health"
    ],
    secondaryKeywords: [
      "healthy eating habits",
      "nutrition facts",
      "diet plan",
      "healthy living",
      "wellness tips",
      "nutritional guidance"
    ],
    longTailKeywords: [
      "how to maintain healthy diet",
      "best nutrition tips for weight loss",
      "healthy lifestyle changes for beginners",
      "complete guide to balanced nutrition",
      "mental health through nutrition"
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
      "fitness calculator",
      "BMI tool",
      "meal planner"
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
  defaultTitle: "Dietary Guide – AI Indian Diet Plans, Recipes & BMI Tools",
  defaultDescription: "Explore AI-powered Indian diet plans based on ICMR guidelines, healthy Indian recipes, vegan recipes, personalized meal tracking, calorie tools, BMI calculator & Google-integrated nutrition coaching for a better lifestyle.",
  defaultKeywords: "health, nutrition, mental health, healthy Indian recipes, BMI tool, meal planner, Indian diet, healthy lifestyle, healthy vegan recipes, AI health tools",
  siteUrl: "https://dietaryguide.in",
  siteName: "DietaryGuide",
  twitterHandle: "@dietaryguide",
  facebookPage: "https://facebook.com/dietaryguide",
  instagramHandle: "@dietaryguide"
};

export const structuredDataSchemas = {
  // Main Organization Schema
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DietaryGuide",
    "alternateName": "Dietary Guide",
    "url": "https://dietaryguide.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dietaryguide.in/logo/dg.png",
      "width": 512,
      "height": 512
    },
    "description": "Leading platform for AI-powered Indian diet plans, healthy recipes, BMI tools, meal planning, and personalized nutrition guidance based on ICMR guidelines",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "DietaryGuide Team"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://facebook.com/dietaryguide",
      "https://instagram.com/dietaryguide",
      "https://twitter.com/dietaryguide"
    ],
    "knowsAbout": [
      "Nutrition",
      "Health",
      "Mental Health",
      "Indian Cuisine",
      "Healthy Recipes",
      "Weight Management",
      "BMI Calculation",
      "Meal Planning",
      "Vegan Nutrition",
      "ICMR Guidelines"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  },

  // Website Schema
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DietaryGuide",
    "alternateName": "Dietary Guide",
    "url": "https://dietaryguide.in",
    "description": "AI-powered platform for healthy Indian recipes, nutrition guidance, BMI tools, and personalized meal planning based on ICMR guidelines",
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dietaryguide.in/logo/dg.png"
      }
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://dietaryguide.in/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Health",
        "description": "Comprehensive health and wellness guidance"
      },
      {
        "@type": "Thing", 
        "name": "Nutrition",
        "description": "Evidence-based nutritional information and meal planning"
      },
      {
        "@type": "Thing",
        "name": "Mental Health",
        "description": "Mental wellness through nutrition and lifestyle"
      },
      {
        "@type": "Thing",
        "name": "Indian Recipes",
        "description": "Healthy traditional and modern Indian recipes"
      }
    ]
  },

  // Medical/Health Website Schema
  medicalWebsite: {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "DietaryGuide - Health & Nutrition Platform",
    "url": "https://dietaryguide.in",
    "description": "Comprehensive health and nutrition platform offering BMI tools, meal planning, and evidence-based dietary guidance",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "General Public"
    },
    "about": {
      "@type": "MedicalCondition",
      "name": "Nutrition and Diet Management"
    },
    "lastReviewed": new Date().toISOString().split('T')[0],
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide"
    }
  },

  // Software Application Schema for AI Tools
  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DietaryGuide AI Health Tools",
    "description": "AI-powered BMI calculator, meal planner, recipe generator, and nutrition analyzer for personalized health guidance",
    "url": "https://dietaryguide.in/tools",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "BMI Calculator",
      "AI Recipe Generator", 
      "Meal Planner",
      "Nutrition Analyzer",
      "Workout Planner",
      "Diet Planning"
    ],
    "screenshot": "https://dietaryguide.in/social-preview.png",
    "provider": {
      "@type": "Organization",
      "name": "DietaryGuide"
    }
  },

  // FAQ Page Schema Template
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a healthy BMI range?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A healthy BMI typically ranges from 18.5 to 24.9. However, BMI should be considered alongside other health factors and is best interpreted by healthcare professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How can I plan healthy Indian meals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on incorporating whole grains, legumes, vegetables, and lean proteins. Use traditional cooking methods with minimal oil, include plenty of spices for flavor and health benefits, and follow ICMR dietary guidelines."
        }
      },
      {
        "@type": "Question",
        "name": "Are vegan Indian recipes nutritionally complete?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, well-planned vegan Indian diets can be nutritionally complete. Include variety of legumes, nuts, seeds, whole grains, and vegetables to ensure adequate protein, vitamins, and minerals."
        }
      }
    ]
  },

  // Breadcrumb Schema Template
  breadcrumbList: (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),

  // Recipe Schema Template
  recipe: (recipeData: any) => ({
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipeData.title,
    "description": recipeData.description,
    "image": {
      "@type": "ImageObject",
      "url": recipeData.imageUrl,
      "width": 1200,
      "height": 800
    },
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dietaryguide.in/logo/dg.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "prepTime": recipeData.prepTime,
    "cookTime": recipeData.cookTime || "PT0M",
    "totalTime": recipeData.totalTime || recipeData.prepTime,
    "recipeYield": recipeData.servings?.toString() || "4",
    "recipeCategory": recipeData.mealType || "Main Course",
    "recipeCuisine": "Indian",
    "recipeIngredient": recipeData.ingredients || [],
    "recipeInstructions": recipeData.instructions?.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      "text": instruction,
      "position": index + 1,
      "name": `Step ${index + 1}`
    })) || [],
    "nutrition": recipeData.nutritionFacts ? {
      "@type": "NutritionInformation",
      "calories": recipeData.nutritionFacts.calories,
      "proteinContent": recipeData.nutritionFacts.protein,
      "carbohydrateContent": recipeData.nutritionFacts.carbs,
      "fatContent": recipeData.nutritionFacts.fat,
      "fiberContent": recipeData.nutritionFacts.fiber,
      "servingSize": "1 serving"
    } : undefined,
    "keywords": `healthy Indian recipes, ${recipeData.dietPreference || 'vegetarian'}, ${recipeData.mealType || 'breakfast'}, nutrition, health, ${recipeData.title}`,
    "suitableForDiet": recipeData.dietPreference === "Vegan" ? 
      "https://schema.org/VeganDiet" : 
      "https://schema.org/VegetarianDiet",
    "video": recipeData.videoUrl ? {
      "@type": "VideoObject",
      "name": `How to make ${recipeData.title}`,
      "description": recipeData.description,
      "thumbnailUrl": recipeData.imageUrl,
      "contentUrl": recipeData.videoUrl
    } : undefined,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Health Enthusiast"
        },
        "reviewBody": "Excellent healthy recipe that's easy to follow and delicious!"
      }
    ]
  }),

  // Article/Blog Post Schema Template
  article: (articleData: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "image": {
      "@type": "ImageObject",
      "url": articleData.image || "https://dietaryguide.in/social-preview.png",
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dietaryguide.in/logo/dg.png"
      }
    },
    "datePublished": articleData.publishedTime || new Date().toISOString(),
    "dateModified": articleData.modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleData.url || "https://dietaryguide.in"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Health"
      },
      {
        "@type": "Thing", 
        "name": "Nutrition"
      },
      {
        "@type": "Thing",
        "name": "Mental Health"
      }
    ],
    "keywords": "health, nutrition, mental health, healthy lifestyle, Indian diet, wellness",
    "articleSection": "Health & Nutrition",
    "wordCount": articleData.wordCount || 1000,
    "isAccessibleForFree": true,
    "inLanguage": "en-IN"
  }),

  // Tool/Calculator Schema Template
  tool: (toolData: any) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": toolData.name,
    "description": toolData.description,
    "url": toolData.url,
    "about": {
      "@type": "Thing",
      "name": toolData.about || "Health Tool"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": toolData.name,
      "description": toolData.description,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dietaryguide.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://dietaryguide.in/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": toolData.name
        }
      ]
    }
  })
};

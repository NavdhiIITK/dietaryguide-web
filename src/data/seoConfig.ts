
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
  defaultTitle: "Dietary Guide – India's #1 AI Nutrition Platform | Diet Plans, Recipes & BMI Tools",
  defaultDescription: "Dietary Guide is India's leading AI nutrition platform by Navdhi. Personalized Indian diet plans based on ICMR guidelines, healthy recipes, BMI calculator, meal planner & expert wellness guidance.",
  defaultKeywords: "Dietary Guide, dietaryguide.in, Dietary Guide India, Dietary Guide by Navdhi, AI diet planner India, Indian diet plan for weight loss, healthy Indian recipes, BMI calculator, personalized nutrition, ICMR diet guidelines, meal planner India, AI nutrition assistant, healthy snacks India",
  siteUrl: "https://dietaryguide.in",
  siteName: "Dietary Guide",
  twitterHandle: "@dietaryguide",
  facebookPage: "https://facebook.com/dietaryguide",
  instagramHandle: "@dietaryguide"
};

export const structuredDataSchemas = {
  // Main Organization Schema
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dietaryguide.in/#organization",
    "name": "Dietary Guide",
    "alternateName": ["Dietary Guide by Navdhi", "DietaryGuide", "dietaryguide.in"],
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
      "name": "Navdhi"
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
    "@id": "https://dietaryguide.in/#website",
    "name": "Dietary Guide",
    "alternateName": ["Dietary Guide by Navdhi", "DietaryGuide", "dietaryguide.in"],
    "url": "https://dietaryguide.in",
    "description": "India's leading AI-powered platform for healthy Indian recipes, nutrition guidance, BMI tools, and personalized meal planning based on ICMR guidelines",
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
      "priceCurrency": "INR"
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
  }),

  // Product Schema Template (enhanced with Review, FAQ, Nutrition)
  product: (productData: any) => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productData.name,
      "description": productData.seoDescription || productData.description,
      "image": productData.images || [productData.image],
      "sku": productData.id,
      "mpn": productData.id,
      "brand": {
        "@type": "Brand",
        "name": "Dietary Guide"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Dietary Guide by Navdhi",
        "url": "https://dietaryguide.in"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://dietaryguide.in/products/${productData.id}`,
        "priceCurrency": "INR",
        "price": productData.price,
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Dietary Guide"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": productData.price >= 999 ? "0" : "49",
            "currency": "INR"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" },
            "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" }
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "IN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail"
        }
      },
      "category": productData.category || "Health Food",
      "material": productData.ingredients?.join(", ")
    };

    if (productData.rating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": productData.rating,
        "bestRating": 5,
        "worstRating": 1,
        "reviewCount": productData.reviewCount || 10,
        "ratingCount": productData.reviewCount || 10
      };
    }

    if (productData.originalPrice && productData.originalPrice > productData.price) {
      schema.offers.priceSpecification = {
        "@type": "UnitPriceSpecification",
        "price": productData.price,
        "priceCurrency": "INR",
        "referenceQuantity": { "@type": "QuantitativeValue", "value": 1 }
      };
    }

    // Add review snippets
    if (productData.reviewCount) {
      schema.review = [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": productData.rating, "bestRating": 5 },
          "author": { "@type": "Person", "name": "Verified Buyer" },
          "reviewBody": productData.topReview || `Great quality ${productData.name}. Clean ingredients and tastes amazing. Highly recommend from Dietary Guide.`,
          "datePublished": "2026-02-15"
        }
      ];
    }

    // Add nutrition info if available
    if (productData.nutrition && productData.nutrition.length > 0) {
      const nutritionObj: any = { "@type": "NutritionInformation" };
      productData.nutrition.forEach((n: any) => {
        const val = n.per100g || n.perServing || n.value || "";
        const label = n.label?.toLowerCase();
        if (label?.includes("energy") || label?.includes("calorie")) nutritionObj.calories = val;
        else if (label?.includes("protein")) nutritionObj.proteinContent = val;
        else if (label?.includes("carb")) nutritionObj.carbohydrateContent = val;
        else if (label?.includes("fat")) nutritionObj.fatContent = val;
        else if (label?.includes("fibre") || label?.includes("fiber")) nutritionObj.fiberContent = val;
        else if (label?.includes("sugar")) nutritionObj.sugarContent = val;
      });
      schema.nutrition = nutritionObj;
    }

    return schema;
  },

  // Product FAQ Schema (separate from Product for FAQ rich results)
  productFAQ: (faqs: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }),

  // Product Collection / ItemList Schema
  productCollection: (products: any[]) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dietary Guide Healthy Snacks & Nutrition Products",
    "description": "Premium healthy snacks, protein bars, granola, herbal tea and wellness gift boxes from Dietary Guide India.",
    "numberOfItems": products.length,
    "itemListElement": products.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": p.name,
      "url": `https://dietaryguide.in/products/${p.id}`,
      "image": p.images?.[0] || p.image
    }))
  }),

  // Mobile Application Schema
  mobileApplication: {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Dietary Guide – AI Nutrition Assistant",
    "operatingSystem": "Android, iOS",
    "applicationCategory": "HealthApplication",
    "description": "AI-powered nutrition app featuring IRA, your personal diet buddy. Smart meal logging, photo food recognition, personalized Indian diet plans, and Google Calendar integration.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "featureList": [
      "AI Nutrition Buddy (IRA)",
      "Photo Meal Recognition",
      "Personalized Indian Diet Plans",
      "Google Calendar Sync",
      "Expert Consultations",
      "Mood-responsive Interface",
      "Smart Meal Logging",
      "BMI & Progress Tracking"
    ],
    "author": {
      "@type": "Organization",
      "name": "Dietary Guide by Navdhi"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2000"
    }
  }
};

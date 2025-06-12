
import { Helmet } from "react-helmet-async";
import { seoMetadata, structuredDataSchemas } from "@/data/seoConfig";

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "recipe";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schemaType?: "Recipe" | "Article" | "FAQPage" | "HowTo" | "WebSite" | "WebPage" | "NutritionInformation";
  schemaData?: any;
}

const SEOOptimizer = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  schemaType,
  schemaData
}: SEOOptimizerProps) => {
  // Updated SEO metadata for homepage optimization
  const isHomepage = !title || title === seoMetadata.defaultTitle;
  const optimizedTitle = isHomepage 
    ? "Dietary Guide – AI Indian Diet Plans, Recipes & BMI Tools"
    : `${title} | ${seoMetadata.siteName}`;
  
  const optimizedDescription = isHomepage
    ? "Explore AI-powered Indian diet plans based on ICMR guidelines, healthy Indian recipes, vegan recipes, personalized meal tracking, calorie tools, BMI calculator & Google-integrated nutrition coaching for a better lifestyle."
    : (description || seoMetadata.defaultDescription);

  const optimizedKeywords = isHomepage
    ? "AI Indian diet plans, ICMR nutrition guidelines, healthy Indian recipes, vegan Indian recipes, BMI calculator, personalized nutrition tools, AI meal planning, Indian diet tracker, Google integrated nutrition, calorie calculator, weight loss Indian food, plant based Indian diet"
    : (keywords || seoMetadata.defaultKeywords);

  const fullUrl = url ? `${seoMetadata.siteUrl}${url}` : seoMetadata.siteUrl;
  const ogImage = image || `${seoMetadata.siteUrl}/logo/dg.png`;

  // Enhanced structured data for homepage
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dietary Guide",
    "alternateName": "DietaryGuide.in",
    "url": seoMetadata.siteUrl,
    "description": optimizedDescription,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${seoMetadata.siteUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoMetadata.siteUrl}/logo/dg.png`
      }
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Dietary Guide AI",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "description": "AI-powered Indian nutrition and diet planning platform",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": optimizedTitle,
    "description": optimizedDescription,
    "url": fullUrl,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${seoMetadata.siteUrl}#website`
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Indian Nutrition"
      },
      {
        "@type": "Thing", 
        "name": "AI Diet Planning"
      },
      {
        "@type": "Thing",
        "name": "ICMR Guidelines"
      },
      {
        "@type": "Thing",
        "name": "Vegan Indian Recipes"
      }
    ],
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": seoMetadata.siteUrl
        }
      ]
    }
  };

  const nutritionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "AI-Powered Indian Nutrition Tools",
    "description": "Comprehensive nutrition tools based on ICMR guidelines for Indian dietary planning",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "General Public"
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "about": "Indian nutrition guidance and AI-powered meal planning"
    }
  };

  const generateRecipeSchema = (recipe: any) => ({
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "image": recipe.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide"
    },
    "prepTime": recipe.prepTime,
    "cookTime": recipe.cookTime || "0M",
    "totalTime": recipe.totalTime || recipe.prepTime,
    "recipeYield": recipe.servings?.toString(),
    "recipeCategory": recipe.mealType,
    "recipeCuisine": "Indian",
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions?.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      "text": instruction,
      "position": index + 1
    })),
    "nutrition": recipe.nutritionFacts ? {
      "@type": "NutritionInformation",
      "calories": recipe.nutritionFacts.calories,
      "proteinContent": recipe.nutritionFacts.protein,
      "carbohydrateContent": recipe.nutritionFacts.carbs,
      "fatContent": recipe.nutritionFacts.fat
    } : undefined,
    "keywords": `${recipe.title}, healthy Indian recipes, ${recipe.dietPreference}, ${recipe.mealType}, ICMR guidelines`,
    "suitableForDiet": recipe.dietPreference === "Vegan" ? "https://schema.org/VeganDiet" : "https://schema.org/VegetarianDiet"
  });

  const generateArticleSchema = (article: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || ogImage,
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DietaryGuide",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoMetadata.siteUrl}/logo/dg.png`
      }
    },
    "datePublished": article.publishedTime || new Date().toISOString(),
    "dateModified": article.modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  });

  const getStructuredData = () => {
    if (schemaType === "Recipe" && schemaData) {
      return generateRecipeSchema(schemaData);
    }
    if (schemaType === "Article" && schemaData) {
      return generateArticleSchema(schemaData);
    }
    return null;
  };

  return (
    <Helmet>
      {/* Enhanced Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={optimizedKeywords} />
      <meta name="author" content={author || "DietaryGuide Team"} />
      <link rel="canonical" href={fullUrl} />

      {/* Enhanced Open Graph Meta Tags */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="DietaryGuide - AI-powered Indian nutrition and diet planning platform" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoMetadata.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Enhanced Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoMetadata.twitterHandle} />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="AI-powered Indian diet plans and healthy recipes" />

      {/* Article specific meta tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Enhanced Structured Data */}
      {isHomepage && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(webPageSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(nutritionSchema)}
          </script>
        </>
      )}
      
      <script type="application/ld+json">
        {JSON.stringify(structuredDataSchemas.organization)}
      </script>
      
      {getStructuredData() && (
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      )}

      {/* Enhanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="language" content="English" />
      <meta name="target_country" content="IN" />
      
      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
};

export default SEOOptimizer;

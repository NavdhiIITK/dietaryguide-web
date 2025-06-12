
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
  schemaType?: "Recipe" | "Article" | "FAQPage" | "HowTo";
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
  const fullTitle = title ? `${title} | ${seoMetadata.siteName}` : seoMetadata.defaultTitle;
  const metaDescription = description || seoMetadata.defaultDescription;
  const metaKeywords = keywords || seoMetadata.defaultKeywords;
  const fullUrl = url ? `${seoMetadata.siteUrl}${url}` : seoMetadata.siteUrl;
  const ogImage = image || `${seoMetadata.siteUrl}/logo/dg.png`;

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
    "recipeYield": recipe.servings.toString(),
    "recipeCategory": recipe.mealType,
    "recipeCuisine": "Indian",
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction: string, index: number) => ({
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
    "keywords": `${recipe.title}, healthy Indian recipes, ${recipe.dietPreference}, ${recipe.mealType}`,
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
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author || "DietaryGuide Team"} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoMetadata.siteName} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoMetadata.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

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

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataSchemas.organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredDataSchemas.website)}
      </script>
      {getStructuredData() && (
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://github.com" />
    </Helmet>
  );
};

export default SEOOptimizer;

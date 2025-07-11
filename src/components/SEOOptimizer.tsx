
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
  schemaType?: "Recipe" | "Article" | "FAQPage" | "HowTo" | "Tool" | "WebPage";
  schemaData?: any;
  breadcrumbs?: Array<{name: string, url: string}>;
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
  schemaData,
  breadcrumbs
}: SEOOptimizerProps) => {
  try {
    const fullTitle = title ? `${title} | ${seoMetadata.siteName}` : seoMetadata.defaultTitle;
    const metaDescription = description || seoMetadata.defaultDescription;
    const metaKeywords = keywords || seoMetadata.defaultKeywords;
    const fullUrl = url ? `${seoMetadata.siteUrl}${url}` : seoMetadata.siteUrl;
    const ogImage = image || `${seoMetadata.siteUrl}/logo/dg.png`;

  const getStructuredData = () => {
    const schemas = [];
    
    // Always include base schemas for every page
    schemas.push(structuredDataSchemas.organization);
    schemas.push(structuredDataSchemas.website);
    
    // Add page-specific schemas
    if (schemaType === "Recipe" && schemaData) {
      schemas.push(structuredDataSchemas.recipe(schemaData));
    }
    
    if (schemaType === "Article" && schemaData) {
      schemas.push(structuredDataSchemas.article(schemaData));
    }
    
    if (schemaType === "Tool" && schemaData) {
      schemas.push(structuredDataSchemas.tool(schemaData));
    }
    
    if (schemaType === "FAQPage") {
      schemas.push(structuredDataSchemas.faqPage);
    }
    
    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(structuredDataSchemas.breadcrumbList(breadcrumbs));
    }
    
    // Add medical website schema for health-related pages
    if (title?.toLowerCase().includes('health') || 
        title?.toLowerCase().includes('nutrition') || 
        title?.toLowerCase().includes('bmi') ||
        description?.toLowerCase().includes('health')) {
      schemas.push(structuredDataSchemas.medicalWebsite);
    }
    
    // Add software application schema for tools pages
    if (url?.includes('/tools') || schemaType === "Tool") {
      schemas.push(structuredDataSchemas.softwareApplication);
    }
    
    return schemas;
  };

  const schemas = getStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author || "DietaryGuide Team"} />
      <link rel="canonical" href={fullUrl} />

      {/* Enhanced Meta Tags for Health & Nutrition */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="subject" content="Health, Nutrition, Mental Health, Indian Recipes, BMI Tools" />
      <meta name="topic" content="Health and Nutrition" />
      <meta name="summary" content={metaDescription} />
      <meta name="classification" content="Health and Nutrition Platform" />
      <meta name="designer" content="DietaryGuide Team" />
      <meta name="reply-to" content="contact@dietaryguide.in" />
      <meta name="owner" content="DietaryGuide" />
      <meta name="url" content={fullUrl} />
      <meta name="identifier-URL" content={fullUrl} />
      <meta name="category" content="Health, Nutrition, Recipes, Tools" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title || 'DietaryGuide'} - Health and Nutrition Platform`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoMetadata.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoMetadata.twitterHandle} />
      <meta name="twitter:creator" content={seoMetadata.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title || 'DietaryGuide'} - Health and Nutrition Platform`} />

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
      {type === "article" && (
        <>
          <meta property="article:section" content="Health & Nutrition" />
          <meta property="article:tag" content="health" />
          <meta property="article:tag" content="nutrition" />
          <meta property="article:tag" content="mental health" />
          <meta property="article:tag" content="Indian recipes" />
          <meta property="article:tag" content="BMI tool" />
          <meta property="article:tag" content="meal planner" />
        </>
      )}

      {/* Recipe specific meta tags */}
      {type === "recipe" && schemaData && (
        <>
          <meta property="recipe:cuisine" content="Indian" />
          <meta property="recipe:category" content={schemaData.mealType || "Main Course"} />
          <meta property="recipe:prep_time" content={schemaData.prepTime} />
          <meta property="recipe:cook_time" content={schemaData.cookTime} />
          <meta property="recipe:serves" content={schemaData.servings} />
        </>
      )}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS prefetch for faster loading */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Structured Data - Multiple schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="msapplication-TileColor" content="#22c55e" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="DietaryGuide" />
      <meta name="application-name" content="DietaryGuide" />
      <meta name="msapplication-tooltip" content="Health and Nutrition Platform" />
      <meta name="msapplication-starturl" content="/" />
    </Helmet>
  );
  } catch (error) {
    console.error('SEOOptimizer error:', error);
    return null;
  }
};

export default SEOOptimizer;

/**
 * Shared meta/schema builders for recipe and product pages — the same
 * client+server pattern as shared/blog-seo.mjs, kept in a separate file so
 * that already-verified module stays untouched.
 *
 * Deliberately NOT reusing src/data/seoConfig.ts's recipe()/product()
 * builders: those unconditionally inject a fabricated aggregateRating and a
 * hardcoded fake review ("Health Enthusiast" / "Verified Buyer" boilerplate
 * text that isn't tied to any real review) on every recipe and most
 * products. That's exactly what Google's structured-data guidelines call out
 * as fake-review markup, and can get rich results suppressed sitewide if
 * caught. These builders only ever emit rating/review data that was actually
 * present in the source record — never a synthesized fallback.
 */

import { SITE_URL, SITE_NAME, LOGO_URL, stripHtml } from './blog-seo.mjs';

/** "10 min" / "1 hr 15 min" -> ISO 8601 duration ("PT10M" / "PT1H15M"). Schema.org Recipe requires this format; the recipe data stores human-readable strings. */
export function toIsoDuration(text) {
  if (!text) return undefined;
  const hours = Number(text.match(/(\d+)\s*h/i)?.[1] || 0);
  const minutes = Number(text.match(/(\d+)\s*m/i)?.[1] || 0);
  if (!hours && !minutes) return undefined;
  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}`;
}

export function buildRecipeMeta(recipe) {
  const description = recipe.description || '';
  return {
    url: `${SITE_URL}/recipes/${recipe.id}`,
    title: `${recipe.title} – Healthy Indian Recipe | ${SITE_NAME}`,
    description,
    image: recipe.imageUrl,
  };
}

export function buildRecipeSchemas(recipe) {
  const meta = buildRecipeMeta(recipe);

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.imageUrl,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL } },
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    recipeYield: recipe.servings ? String(recipe.servings) : undefined,
    recipeCategory: recipe.mealType,
    recipeCuisine: 'Indian',
    recipeIngredient: recipe.ingredients || [],
    recipeInstructions: (recipe.instructions || []).map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
    nutrition: recipe.nutritionFacts
      ? {
          '@type': 'NutritionInformation',
          calories: recipe.nutritionFacts.calories,
          proteinContent: recipe.nutritionFacts.protein,
          carbohydrateContent: recipe.nutritionFacts.carbs,
          fatContent: recipe.nutritionFacts.fat,
          fiberContent: recipe.nutritionFacts.fiber,
        }
      : undefined,
    suitableForDiet:
      recipe.dietPreference === 'Vegan'
        ? 'https://schema.org/VeganDiet'
        : recipe.dietPreference === 'Vegetarian'
          ? 'https://schema.org/VegetarianDiet'
          : undefined,
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: `${SITE_URL}/recipes` },
      { '@type': 'ListItem', position: 3, name: recipe.title, item: meta.url },
    ],
  };

  return [recipeSchema, breadcrumbs];
}

/**
 * `product` is the display record (products.ts — price, images, ingredients).
 * `storeProduct` is the same id's SEO-only record (store-products.ts —
 * seoTitle/seoDescription/faqs/topReview), or undefined if none exists.
 */
export function buildProductMeta(product, storeProduct) {
  const description =
    storeProduct?.seoDescription ||
    product.description ||
    `Buy ${product.name} online from ${SITE_NAME}.`;
  return {
    url: `${SITE_URL}/products/${product.id}`,
    title: `${storeProduct?.seoTitle || `${product.name} – Buy Online`} | ${SITE_NAME} Store`,
    description,
    image: product.image || product.images?.[0],
  };
}

export function buildProductSchemas(product, storeProduct) {
  const meta = buildProductMeta(product, storeProduct);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: meta.description,
    image: product.images?.length ? product.images : [product.image],
    sku: product.id,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      url: meta.url,
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    category: product.category,
  };

  // Only emit rating/review data that genuinely exists on the record — never
  // a synthesized fallback for either field.
  if (product.rating && product.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      bestRating: 5,
      reviewCount: product.reviewCount,
    };
  }

  if (storeProduct?.topReview) {
    schema.review = [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: product.rating || 5, bestRating: 5 },
        author: { '@type': 'Organization', name: 'Dietary Guide Customer' },
        reviewBody: storeProduct.topReview,
      },
    ];
  }

  if (storeProduct?.nutrition?.length) {
    const nutritionObj = { '@type': 'NutritionInformation' };
    for (const n of storeProduct.nutrition) {
      const val = n.per100g || n.perServing;
      const label = n.label?.toLowerCase() || '';
      if (label.includes('energy') || label.includes('calorie')) nutritionObj.calories = val;
      else if (label.includes('protein')) nutritionObj.proteinContent = val;
      else if (label.includes('carb')) nutritionObj.carbohydrateContent = val;
      else if (label.includes('fat')) nutritionObj.fatContent = val;
      else if (label.includes('fibre') || label.includes('fiber')) nutritionObj.fiberContent = val;
    }
    schema.nutrition = nutritionObj;
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: meta.url },
    ],
  };

  const schemas = [schema, breadcrumbs];

  if (storeProduct?.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: storeProduct.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: stripHtml(faq.a) },
      })),
    });
  }

  return schemas;
}

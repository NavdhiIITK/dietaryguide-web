/**
 * Server-renders /recipes/:id — same crawlability problem as blog posts had
 * (empty #root, homepage meta on every recipe), but a simpler fix: recipe
 * data is a static TypeScript array (src/data/recipes.ts) bundled at build
 * time, not a live database, so there's no per-request fetch — just import
 * the data directly. Vercel's Node function builder compiles the imported
 * .ts file automatically, the same way it compiles the api/*.js entry
 * files themselves.
 */

import { escapeHtml, serializeJsonLd, getShell, renderIntoShell } from './_lib.js';
import { buildRecipeMeta, buildRecipeSchemas } from '../shared/site-seo.mjs';
import { allIndianRecipes } from '../src/data/recipes.ts';

function buildHead(recipe) {
  const meta = buildRecipeMeta(recipe);
  const schemas = buildRecipeSchemas(recipe);

  return `
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${escapeHtml(meta.url)}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${escapeHtml(meta.image)}" />
  <meta property="og:url" content="${escapeHtml(meta.url)}" />
  <meta property="og:site_name" content="Dietary Guide" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(meta.image)}" />

${schemas.map((schema) => `  <script type="application/ld+json">${serializeJsonLd(schema)}</script>`).join('\n')}
`;
}

function buildBody(recipe) {
  const url = `https://dietaryguide.in/recipes/${recipe.id}`;
  const ingredients = (recipe.ingredients || [])
    .map((i) => `<li>${escapeHtml(i)}</li>`)
    .join('');
  const instructions = (recipe.instructions || [])
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join('');
  const tips = recipe.tips?.length
    ? `<section><h2>Chef's tips</h2><ul>${recipe.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul></section>`
    : '';
  const nutrition = recipe.nutritionFacts
    ? `<section><h2>Nutrition facts (per serving)</h2><ul>${Object.entries({
        Calories: recipe.nutritionFacts.calories,
        Protein: recipe.nutritionFacts.protein,
        Carbs: recipe.nutritionFacts.carbs,
        Fat: recipe.nutritionFacts.fat,
        Fiber: recipe.nutritionFacts.fiber,
      })
        .filter(([, v]) => v)
        .map(([k, v]) => `<li>${k}: ${escapeHtml(String(v))}</li>`)
        .join('')}</ul></section>`
    : '';

  return `<article>
  <nav aria-label="Breadcrumb"><ol>
    <li><a href="https://dietaryguide.in/">Home</a></li>
    <li><a href="https://dietaryguide.in/recipes">Recipes</a></li>
    <li><a href="${escapeHtml(url)}" aria-current="page">${escapeHtml(recipe.title)}</a></li>
  </ol></nav>
  <header>
    <h1>${escapeHtml(recipe.title)}</h1>
    <p>${escapeHtml(recipe.description)}</p>
    <ul>
      <li>Prep: ${escapeHtml(recipe.prepTime || '')}</li>
      ${recipe.cookTime ? `<li>Cook: ${escapeHtml(recipe.cookTime)}</li>` : ''}
      <li>Difficulty: ${escapeHtml(recipe.difficulty || '')}</li>
      <li>Serves: ${escapeHtml(String(recipe.servings || ''))}</li>
      <li>${escapeHtml(recipe.dietPreference || '')}</li>
    </ul>
  </header>
  <img src="${escapeHtml(recipe.imageUrl)}" alt="${escapeHtml(recipe.title)}" width="1200" height="800" loading="eager" decoding="async" />
  <section>
    <h2>Ingredients</h2>
    <ul>${ingredients}</ul>
  </section>
  <section>
    <h2>Instructions</h2>
    <ol>${instructions}</ol>
  </section>
  ${nutrition}
  ${tips}
  <footer><p><a href="https://dietaryguide.in/recipes">Browse all recipes</a></p></footer>
</article>`;
}

export default async function handler(req, res) {
  const id = String(req.query?.id || '').trim();
  const shell = getShell();

  const recipe = allIndianRecipes.find((r) => r.id === id);

  if (!recipe) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');
    return res.status(404).send(shell);
  }

  const html = renderIntoShell(shell, buildHead(recipe), buildBody(recipe));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Recipe data only changes on deploy, not per-request, so this can cache
  // far longer at the edge than the Firestore-backed blog pages.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(html);
}

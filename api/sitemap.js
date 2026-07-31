/**
 * Generates /sitemap.xml at request time.
 *
 * This replaces the hand-maintained public/sitemap.xml, which listed a fixed
 * set of pages and none of the posts published after it was last edited. The
 * static routes below are carried over from that file; blog URLs now come
 * straight from Firestore, so a post is discoverable the moment it goes live.
 */

import { SITE_URL } from '../shared/blog-seo.mjs';
import { SITEMAP_FIELDS, escapeXml, getPublishedPosts } from './_lib.js';
import { allIndianRecipes } from '../src/data/recipes.ts';
import { storeProducts } from '../src/data/products.ts';

/**
 * Recipe and product URLs are generated from the same data files api/recipe.js
 * and api/product.js import — not hand-copied here. The previous static
 * sitemap listed /products/sp-1b, which was never a real product, and never
 * listed wt-1 ("The Wellness Treat"), which is; it also listed five
 * /tools/* sub-paths that don't correspond to any route ToolsPage registers
 * (it switches tabs via internal state, not routing), so Google was being
 * pointed at five pages that render the catch-all NotFound screen. Deriving
 * the list from source data makes that class of drift impossible.
 */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/recipes', changefreq: 'weekly', priority: '0.9' },
  { path: '/tools', changefreq: 'weekly', priority: '0.9' },
  { path: '/products', changefreq: 'weekly', priority: '0.8' },
  { path: '/app', changefreq: 'monthly', priority: '0.8' },
];

/** Sitemaps take W3C dates; Firestore gives full ISO timestamps. */
function toDate(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default async function handler(req, res) {
  let posts = [];
  try {
    posts = await getPublishedPosts({ select: SITEMAP_FIELDS });
  } catch (error) {
    // A Firestore blip should still leave a valid sitemap of the static pages
    // rather than a 500 that Search Console reports as a fetch error.
    console.error('sitemap: could not load posts:', error);
  }

  const today = toDate(null);
  const entries = [
    ...STATIC_ROUTES.map((route) =>
      urlEntry({
        loc: `${SITE_URL}${route.path}`,
        lastmod: today,
        changefreq: route.changefreq,
        priority: route.priority,
      })
    ),
    ...posts.map((post) =>
      urlEntry({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: toDate(post.updated_at || post.created_at),
        changefreq: 'monthly',
        priority: '0.8',
      })
    ),
    ...allIndianRecipes.map((recipe) =>
      urlEntry({ loc: `${SITE_URL}/recipes/${recipe.id}`, lastmod: today, changefreq: 'monthly', priority: '0.7' })
    ),
    ...storeProducts.map((product) =>
      urlEntry({ loc: `${SITE_URL}/products/${product.id}`, lastmod: today, changefreq: 'weekly', priority: '0.7' })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}

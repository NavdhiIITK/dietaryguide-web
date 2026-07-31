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

/** Routes that are not backed by Firestore, preserved from the old static file. */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/recipes', changefreq: 'weekly', priority: '0.9' },
  { path: '/tools', changefreq: 'weekly', priority: '0.9' },
  { path: '/products', changefreq: 'weekly', priority: '0.8' },
  { path: '/app', changefreq: 'monthly', priority: '0.8' },

  { path: '/recipes/moong-dal-chilla', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/vegetable-oats-upma', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/besan-cheela-spinach', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/vegetable-dalia', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/sprouted-moong-salad', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/ragi-porridge', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/millet-idli-coconut-chutney', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/poha-vegetables', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/tofu-bhurji', changefreq: 'monthly', priority: '0.7' },
  { path: '/recipes/spinach-banana-flaxseed-smoothie', changefreq: 'monthly', priority: '0.7' },

  { path: '/tools/bmi-calculator', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/ai-diet-planner', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/ai-meal-analyzer', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/ai-recipe-generator', changefreq: 'monthly', priority: '0.8' },
  { path: '/tools/ai-workout-planner', changefreq: 'monthly', priority: '0.8' },

  { path: '/products/sp-1', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-1b', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-2', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-2b', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-4', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-5', changefreq: 'weekly', priority: '0.7' },
  { path: '/products/sp-6', changefreq: 'weekly', priority: '0.7' },
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
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}

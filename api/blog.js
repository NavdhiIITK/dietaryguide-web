/**
 * Server-renders /blog/:slug.
 *
 * vercel.json rewrites /blog/:slug here so the very first response already
 * contains the post's own title, description, canonical, social tags,
 * structured data and article text. Search engines, social scrapers and AI
 * crawlers otherwise saw the homepage <head> and an empty <div id="root">,
 * because the SPA only fills those in after JavaScript runs.
 *
 * The same enriched HTML is served to humans too. src/main.tsx mounts with
 * createRoot (not hydrateRoot), so React discards whatever is inside #root and
 * renders over it — there is no hydration mismatch to worry about, and readers
 * see the article sooner.
 */

import {
  SITE_URL,
  SITE_NAME,
  TWITTER_HANDLE,
  buildBlogMeta,
  buildBlogSchemas,
  improveContentImages,
} from '../shared/blog-seo.mjs';
import {
  SUMMARY_FIELDS,
  escapeHtml,
  serializeJsonLd,
  getPostBySlug,
  getPublishedPosts,
  getShell,
} from './_lib.js';

/** Head tags describing the homepage that must not survive onto a post page. */
const STALE_HEAD_PATTERNS = [
  /<title>[\s\S]*?<\/title>/i,
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="author"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
];

function stripStaleHead(html) {
  const headEnd = html.indexOf('</head>');
  if (headEnd === -1) return html;

  let head = html.slice(0, headEnd);
  const rest = html.slice(headEnd);
  for (const pattern of STALE_HEAD_PATTERNS) head = head.replace(pattern, '');
  return head + rest;
}

/** Posts sharing the most tags, for internal linking. */
function findRelated(post, all, limit = 3) {
  const tags = new Set(post.tags);
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => tags.has(t)).length }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.created_at || 0) - new Date(a.post.created_at || 0))
    .slice(0, limit)
    .map((entry) => entry.post);
}

function buildHead(post) {
  const meta = buildBlogMeta(post);
  const schemas = buildBlogSchemas(post);

  const tagMeta = meta.tags
    .map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`)
    .join('\n  ');

  return `
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta name="author" content="${escapeHtml(meta.author)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${escapeHtml(meta.url)}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${escapeHtml(meta.image)}" />
  <meta property="og:image:alt" content="${escapeHtml(post.title)}" />
  <meta property="og:url" content="${escapeHtml(meta.url)}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:locale" content="en_IN" />
  <meta property="article:published_time" content="${escapeHtml(meta.published)}" />
  <meta property="article:modified_time" content="${escapeHtml(meta.modified)}" />
  <meta property="article:author" content="${escapeHtml(meta.author)}" />
  <meta property="article:section" content="Health &amp; Nutrition" />
  ${tagMeta}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${escapeHtml(TWITTER_HANDLE)}" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(meta.image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(post.title)}" />

${schemas.map((schema) => `  <script type="application/ld+json">${serializeJsonLd(schema)}</script>`).join('\n')}
`;
}

function buildBody(post, related) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = post.created_at || '';
  const publishedLabel = published
    ? new Date(published).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const tags = post.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');

  const relatedHtml = related.length
    ? `<nav aria-label="Related posts"><h2>Related reading</h2><ul>${related
        .map((p) => `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`)
        .join('')}</ul></nav>`
    : '';

  return `<article>
  <nav aria-label="Breadcrumb"><ol>
    <li><a href="${SITE_URL}/">Home</a></li>
    <li><a href="${SITE_URL}/blog">Blog</a></li>
    <li><a href="${escapeHtml(url)}" aria-current="page">${escapeHtml(post.title)}</a></li>
  </ol></nav>
  <header>
    <h1>${escapeHtml(post.title)}</h1>
    ${post.subtitle ? `<p>${escapeHtml(post.subtitle)}</p>` : ''}
    <p>By <span>${escapeHtml(post.author_name)}</span>${
      published ? ` · <time datetime="${escapeHtml(published)}">${escapeHtml(publishedLabel)}</time>` : ''
    } · ${escapeHtml(String(post.reading_time))} min read</p>
    ${tags ? `<ul>${tags}</ul>` : ''}
  </header>
  <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" width="1200" height="630" fetchpriority="high" decoding="async" />
  <div>${improveContentImages(post.content, post.title)}</div>
  ${relatedHtml}
  <footer><p><a href="${SITE_URL}/blog">View all posts</a></p></footer>
</article>`;
}

export default async function handler(req, res) {
  const slug = String(req.query?.slug || '').trim();

  try {
    const shell = await getShell(req);

    if (!slug) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(shell);
    }

    const [post, summaries] = await Promise.all([
      getPostBySlug(slug),
      getPublishedPosts({ select: SUMMARY_FIELDS }).catch(() => []),
    ]);

    if (!post) {
      // Unknown or unpublished slug: a real 404 so it never gets indexed, but
      // still the SPA shell so the in-app "not found" screen renders.
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
      res.setHeader('X-Robots-Tag', 'noindex');
      return res.status(404).send(shell);
    }

    const related = findRelated(post, summaries);

    const html = stripStaleHead(shell)
      .replace('</head>', `${buildHead(post)}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${buildBody(post, related)}</div>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Short edge TTL so same-day edits go out quickly, with a long
    // stale-while-revalidate window so readers never wait on Firestore.
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (error) {
    console.error('blog SSR failed:', error);
    // Never hard-fail a reader: fall back to the plain SPA shell, which still
    // renders the post client-side.
    try {
      const shell = await getShell(req);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).send(shell);
    } catch {
      return res.status(500).send('Internal Server Error');
    }
  }
}

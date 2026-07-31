/**
 * Single source of truth for blog-post SEO metadata and structured data.
 *
 * Imported by BOTH the /blog/:slug serverless function (api/blog.js) and the
 * React page (src/pages/BlogDetailPage.tsx). Keeping one implementation is the
 * point: the server writes these tags into the initial HTML and react-helmet
 * rewrites them on mount, so if the two ever disagreed, hydration would quietly
 * replace correct per-post tags with something else.
 *
 * Plain .mjs with no dependencies so both a Vite bundle and a Node function can
 * consume it unchanged.
 */

export const SITE_URL = 'https://dietaryguide.in';
export const SITE_NAME = 'Dietary Guide';
export const AUTHOR_NAME = 'Dietary Guide by Navdhi';
export const TWITTER_HANDLE = '@dietaryguide';
export const LOGO_URL = `${SITE_URL}/logo/dg.png`;
export const FALLBACK_IMAGE = `${SITE_URL}/social-preview.png`;

export function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Build FAQPage entries from the post body: every <h3> is a question and the
 * <p> immediately after it is the answer. That is the shape the daily posts
 * already use under their "Frequently asked questions" heading.
 */
export function extractFaqs(content) {
  const faqs = [];
  const pattern = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pattern.exec(String(content || ''))) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

/**
 * Harden images inside a post body: alt text for crawlers and screen readers,
 * lazy loading for anything below the fold, async decoding. Applied on the
 * server AND on the client, because React re-renders the body from the raw
 * stored HTML and would otherwise drop the server's version.
 */
export function improveContentImages(content, postTitle) {
  return String(content || '').replace(/<img\b([^>]*)>/gi, (tag, attrs) => {
    let next = attrs;
    if (!/\balt\s*=/i.test(next)) next += ` alt="${String(postTitle || '').replace(/"/g, '&quot;')}"`;
    if (!/\bloading\s*=/i.test(next)) next += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(next)) next += ' decoding="async"';
    return `<img${next}>`;
  });
}

/** Resolve the canonical title/description/image/dates for a post. */
export function buildBlogMeta(post) {
  const description = post.meta_description || post.snippet || stripHtml(post.content).slice(0, 155);
  const published = post.created_at || '';
  return {
    url: `${SITE_URL}/blog/${post.slug}`,
    title: post.meta_title || post.title,
    description,
    image: post.image || FALLBACK_IMAGE,
    author: post.author_name || post.author?.name || AUTHOR_NAME,
    published,
    modified: post.updated_at || published,
    tags: Array.isArray(post.tags) ? post.tags.filter((t) => typeof t === 'string') : [],
  };
}

/**
 * Article + BreadcrumbList (+ FAQPage when the body has Q&A pairs), in the
 * order Google's Rich Results Test expects to find them.
 */
export function buildBlogSchemas(post) {
  const meta = buildBlogMeta(post);

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: meta.description,
    image: { '@type': 'ImageObject', url: meta.image },
    datePublished: meta.published,
    dateModified: meta.modified,
    author: { '@type': 'Organization', name: AUTHOR_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': meta.url },
    inLanguage: 'en-IN',
    keywords: meta.tags.join(', '),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: meta.url },
    ],
  };

  const schemas = [article, breadcrumbs];

  const faqs = extractFaqs(post.content);
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return schemas;
}

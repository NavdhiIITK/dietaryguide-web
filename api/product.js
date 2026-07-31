/**
 * Server-renders /products/:id. Same story as recipes: product data is a
 * static array bundled at build time (src/data/products.ts, plus SEO-only
 * fields in src/data/store-products.ts keyed by the same id), so this is a
 * direct import rather than a per-request fetch.
 *
 * /products/account, /products/profile and /products/orders are real pages
 * (not product ids) — vercel.json routes those to the plain SPA shell
 * *before* this function ever sees a request, so no conflict here.
 */

import { escapeHtml, serializeJsonLd, getShell, renderIntoShell } from './_lib.js';
import { buildProductMeta, buildProductSchemas } from '../shared/site-seo.mjs';
import { getProductById } from '../src/data/products.ts';
import { productMap } from '../src/data/store-products.ts';

function buildHead(product, storeProduct) {
  const meta = buildProductMeta(product, storeProduct);
  const schemas = buildProductSchemas(product, storeProduct);

  return `
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${escapeHtml(meta.url)}" />

  <meta property="og:type" content="product" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${escapeHtml(meta.image)}" />
  <meta property="og:url" content="${escapeHtml(meta.url)}" />
  <meta property="og:site_name" content="Dietary Guide" />
  <meta property="product:price:amount" content="${escapeHtml(String(product.price))}" />
  <meta property="product:price:currency" content="INR" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(meta.image)}" />

${schemas.map((schema) => `  <script type="application/ld+json">${serializeJsonLd(schema)}</script>`).join('\n')}
`;
}

function buildBody(product, storeProduct) {
  const url = `https://dietaryguide.in/products/${product.id}`;
  const ingredients = (product.ingredients || []).map((i) => `<li>${escapeHtml(i)}</li>`).join('');
  const benefits = (product.benefits || []).map((b) => `<li>${escapeHtml(b)}</li>`).join('');
  const nutrition = (product.nutrition || [])
    .map((n) => `<li>${escapeHtml(n.label)}: ${escapeHtml(n.value)}</li>`)
    .join('');
  const description = storeProduct?.description || product.description || '';
  const faqs = storeProduct?.faqs?.length
    ? `<section><h2>Frequently asked questions</h2>${storeProduct.faqs
        .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
        .join('')}</section>`
    : '';

  return `<article>
  <nav aria-label="Breadcrumb"><ol>
    <li><a href="https://dietaryguide.in/">Home</a></li>
    <li><a href="https://dietaryguide.in/products">Products</a></li>
    <li><a href="${escapeHtml(url)}" aria-current="page">${escapeHtml(product.name)}</a></li>
  </ol></nav>
  <header>
    <h1>${escapeHtml(product.name)}</h1>
    ${product.subtitle ? `<p>${escapeHtml(product.subtitle)}</p>` : ''}
    <p>₹${escapeHtml(String(product.price))}${product.originalPrice ? ` (was ₹${escapeHtml(String(product.originalPrice))})` : ''}</p>
  </header>
  <img src="${escapeHtml(product.image || product.images?.[0] || '')}" alt="${escapeHtml(product.name)}" width="1200" height="1200" loading="eager" decoding="async" />
  <section>
    <h2>Description</h2>
    <p>${escapeHtml(description)}</p>
  </section>
  ${ingredients ? `<section><h2>Ingredients</h2><ul>${ingredients}</ul></section>` : ''}
  ${benefits ? `<section><h2>Benefits</h2><ul>${benefits}</ul></section>` : ''}
  ${nutrition ? `<section><h2>Nutrition</h2><ul>${nutrition}</ul></section>` : ''}
  ${faqs}
  <footer><p><a href="https://dietaryguide.in/products">Browse the store</a></p></footer>
</article>`;
}

export default async function handler(req, res) {
  const id = String(req.query?.id || '').trim();
  const shell = getShell();

  const product = getProductById(id);

  if (!product) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');
    return res.status(404).send(shell);
  }

  const storeProduct = productMap[id];
  const html = renderIntoShell(shell, buildHead(product, storeProduct), buildBody(product, storeProduct));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(html);
}

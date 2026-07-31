/**
 * Shared helpers for the SEO serverless functions.
 *
 * Blog posts live in Firebase Firestore (project "dietaryguideblog", collection
 * "blogs", document id === the post slug) — not Supabase. We read them over the
 * Firestore REST API rather than firebase-admin so the functions stay
 * dependency-free and need no service-account secret.
 *
 * The public web API key is enough: firestore.blog.rules allows anonymous reads
 * of documents where published == true, so drafts stay private (an unpublished
 * slug comes back as 403, which we treat as "not found"). A bare collection
 * `list` cannot be authorised under those rules, so listing uses :runQuery with
 * an explicit published == true filter.
 */

import { AUTHOR_NAME, FALLBACK_IMAGE, stripHtml } from '../shared/blog-seo.mjs';

const PROJECT_ID = 'dietaryguideblog';
const API_KEY = process.env.FIREBASE_BLOG_API_KEY || 'AIzaSyBen1J_DpKSaugYdEHUrNDmRQds24AR9-M';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Escape text for use in an HTML text node or a double-quoted attribute. */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape the five characters that are illegal in XML character data. */
export function escapeXml(value) {
  return escapeHtml(value);
}

/**
 * JSON-LD is injected inside a <script> element, where the HTML parser ends the
 * script at the first "</script" regardless of JSON quoting. Break that
 * sequence (and the "<!--" comment opener) without changing the parsed value.
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/** Convert one Firestore REST value wrapper into a plain JS value. */
function fromFirestoreValue(value) {
  if (!value || typeof value !== 'object') return undefined;
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('nullValue' in value) return null;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue' in value) return fromFirestoreFields(value.mapValue.fields || {});
  return undefined;
}

function fromFirestoreFields(fields) {
  const out = {};
  for (const [key, value] of Object.entries(fields || {})) {
    out[key] = fromFirestoreValue(value);
  }
  return out;
}

/** Normalise a Firestore document into the shape the templates expect. */
function mapDocument(doc) {
  const data = fromFirestoreFields(doc.fields);
  const slug = doc.name.split('/').pop();
  const content = data.content || '';
  return {
    slug,
    title: data.title || 'Untitled Post',
    subtitle: data.subtitle || '',
    content,
    image: data.image || FALLBACK_IMAGE,
    tags: Array.isArray(data.tags) ? data.tags.filter((t) => typeof t === 'string') : [],
    author_name: data.author_name || AUTHOR_NAME,
    snippet: data.snippet || stripHtml(content).slice(0, 150),
    reading_time: data.reading_time || 5,
    meta_title: data.meta_title || data.title,
    meta_description: data.meta_description || data.snippet || stripHtml(content).slice(0, 155),
    published: data.published === true,
    created_at: data.created_at || null,
    updated_at: data.updated_at || data.created_at || null,
  };
}

/**
 * Fetch a single published post by slug.
 * Returns null for missing slugs and for drafts (rules reject those with 403).
 */
export async function getPostBySlug(slug) {
  const url = `${BASE}/blogs/${encodeURIComponent(slug)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const doc = await res.json();
  if (!doc || !doc.fields) return null;

  const post = mapDocument(doc);
  return post.published ? post : null;
}

/** Field sets for callers that must not pull every post's full content body. */
export const SITEMAP_FIELDS = ['updated_at', 'created_at'];
export const SUMMARY_FIELDS = ['title', 'tags', 'snippet', 'image', 'created_at'];

/**
 * Fetch every published post. Pass `select` to project only the fields needed —
 * the content body is large, and neither the sitemap nor related-post links
 * require it.
 */
export async function getPublishedPosts({ select } = {}) {
  const structuredQuery = {
    from: [{ collectionId: 'blogs' }],
    where: {
      fieldFilter: {
        field: { fieldPath: 'published' },
        op: 'EQUAL',
        value: { booleanValue: true },
      },
    },
  };

  if (select) {
    // `published` is always projected so mapDocument can still see the flag.
    const paths = Array.from(new Set(['published', ...select]));
    structuredQuery.select = { fields: paths.map((fieldPath) => ({ fieldPath })) };
  }

  const res = await fetch(`${BASE}:runQuery?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery }),
  });
  if (!res.ok) throw new Error(`Firestore runQuery failed: ${res.status}`);

  const rows = await res.json();
  if (!Array.isArray(rows)) return [];

  return rows
    .filter((row) => row && row.document)
    .map((row) => mapDocument(row.document))
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

/**
 * Load the built index.html shell.
 *
 * Read from disk rather than over HTTP back to this same deployment.
 * A self-fetch was tried first, but it broke under Vercel Deployment
 * Protection: that internal request carries no bypass credential, so a
 * protected deployment serves the SSO login page instead of the real file,
 * and it gets spliced into the response as if it were the shell. Reading the
 * build artifact directly sidesteps that regardless of whether protection is
 * ever turned on for this project.
 *
 * dist/index.html is not on the function's default trace (nothing in api/
 * imports it as code), so vercel.json declares it via functions.includeFiles
 * to get it bundled alongside the function.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

let shellCache = null;

export function getShell() {
  if (shellCache) return shellCache;
  shellCache = readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
  return shellCache;
}

/** Head tags describing the homepage that must not survive onto any per-item page. */
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

/**
 * Splice per-item <head> tags and <div id="root"> content into the shell,
 * after stripping the homepage's own title/description/canonical/OG/Twitter
 * tags so they can't end up alongside the real ones.
 */
export function renderIntoShell(shell, headHtml, bodyHtml) {
  return stripStaleHead(shell)
    .replace('</head>', `${headHtml}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

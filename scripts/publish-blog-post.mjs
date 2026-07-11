#!/usr/bin/env node
/**
 * Publishes a blog post directly to Firestore (dietaryguideblog project),
 * bypassing the browser admin UI. Used by automated/scheduled posting.
 *
 * Usage:
 *   node scripts/publish-blog-post.mjs post.json
 *   cat post.json | node scripts/publish-blog-post.mjs
 *
 * post.json shape:
 * {
 *   "title": "string (required)",
 *   "content": "string (required) - full post body as HTML",
 *   "tags": ["string", ...],
 *   "image": "string (required) - public thumbnail URL",
 *   "subtitle": "string (optional)",
 *   "author_name": "string (optional, defaults to 'Dietary Guide')",
 *   "meta_title": "string (optional, defaults to title)",
 *   "meta_description": "string (optional, defaults to a snippet of content)",
 *   "published": true | false (optional, defaults to true)
 * }
 *
 * Auth (first match wins):
 *   1. FIREBASE_SERVICE_ACCOUNT_JSON  - full JSON string of the service account key
 *      (this is what the GitHub Action uses, via a repo secret)
 *   2. GOOGLE_APPLICATION_CREDENTIALS - path to a service account key file
 *   3. A key file in this scripts/ folder: dietaryguideblog-service-account.json
 *      or any dietaryguideblog-*.json (for convenient local runs)
 *
 * NOTE: uses the modular firebase-admin v13+/v14 API. The old default-import
 * style (`import admin from 'firebase-admin'; admin.credential.cert(...)`) does
 * NOT work under firebase-admin v14's ESM build.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const PROJECT_ID = 'dietaryguideblog';
const SITE_URL = 'https://dietaryguide.in';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findLocalKey() {
  const preferred = path.join(__dirname, 'dietaryguideblog-service-account.json');
  if (existsSync(preferred)) return preferred;
  try {
    const match = readdirSync(__dirname).find((f) => /^dietaryguideblog.*\.json$/i.test(f));
    if (match) return path.join(__dirname, match);
  } catch {
    /* ignore */
  }
  return null;
}

function initAdmin() {
  if (getApps().length) return;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    initializeApp({ credential: cert(serviceAccount), projectId: PROJECT_ID });
    return;
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
    return;
  }
  const localKey = findLocalKey();
  if (localKey) {
    const serviceAccount = JSON.parse(readFileSync(localKey, 'utf-8'));
    initializeApp({ credential: cert(serviceAccount), projectId: PROJECT_ID });
    return;
  }
  console.error(
    'Missing credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON or ' +
      'GOOGLE_APPLICATION_CREDENTIALS, or save a service account key as ' +
      `${path.join(__dirname, 'dietaryguideblog-service-account.json')}.`
  );
  process.exit(1);
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function computeSnippet(content) {
  const text = stripHtml(content);
  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
}

function computeReadingTime(content) {
  const wordCount = stripHtml(content).split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function readInput() {
  const filePath = process.argv[2];
  if (filePath) {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  const stdin = readFileSync(0, 'utf-8');
  if (!stdin.trim()) {
    console.error('No input. Pass a JSON file path as an argument, or pipe JSON via stdin.');
    process.exit(1);
  }
  return JSON.parse(stdin);
}

async function main() {
  const post = readInput();

  if (!post.title || !post.title.trim()) {
    console.error('post.json is missing required field: title');
    process.exit(1);
  }
  if (!post.content || !post.content.trim()) {
    console.error('post.json is missing required field: content');
    process.exit(1);
  }
  if (!post.image || !post.image.trim()) {
    console.error('post.json is missing required field: image');
    process.exit(1);
  }

  const slug = generateSlug(post.title);
  if (!slug) {
    console.error('Title must contain at least one letter or number to generate a URL slug.');
    process.exit(1);
  }

  initAdmin();
  const db = getFirestore();
  const docRef = db.collection('blogs').doc(slug);

  const existing = await docRef.get();
  if (existing.exists) {
    console.error(`A post with slug "${slug}" already exists. Choose a different title, or edit the existing post manually.`);
    process.exit(1);
  }

  const content = post.content;
  const payload = {
    title: post.title,
    subtitle: post.subtitle || '',
    content,
    image: post.image,
    tags: Array.isArray(post.tags) ? post.tags : [],
    author_name: post.author_name || 'Dietary Guide',
    author_avatar_url: post.author_avatar_url || 'https://placehold.co/40x40.png',
    snippet: computeSnippet(content),
    reading_time: computeReadingTime(content),
    meta_title: post.meta_title || post.title,
    meta_description: post.meta_description || computeSnippet(content),
    published: post.published ?? true,
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
  };

  await docRef.set(payload);

  console.log(`Published: ${post.title}`);
  console.log(`Slug: ${slug}`);
  console.log(`Status: ${payload.published ? 'published' : 'draft'}`);
  console.log(`URL: ${SITE_URL}/blog/${slug}`);
}

main().catch((err) => {
  console.error('Failed to publish post:', err);
  process.exit(1);
});

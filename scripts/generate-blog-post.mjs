#!/usr/bin/env node
/**
 * Generates ONE Dietary Guide blog post as post.json using the Claude API.
 *
 * - Reads existing post titles from Firestore to avoid repeating a topic.
 * - Uses Claude (with web search) to write an SEO + AI-search optimised article
 *   following the Dietary Guide style guide.
 * - Validates the output (no em dashes, no banned phrases, allowed HTML tags,
 *   word count, keyword placement) and retries once if it fails.
 * - Writes post.json (without the image URL, which the workflow fills in after
 *   pushing the thumbnail to GitHub) and prints the slug.
 *
 * Env:
 *   ANTHROPIC_API_KEY   (required)
 *   ANTHROPIC_MODEL     (optional, default 'claude-sonnet-5')
 *   FIREBASE_SERVICE_ACCOUNT_JSON | GOOGLE_APPLICATION_CREDENTIALS (optional, for dedupe)
 *   USE_WEB_SEARCH      (optional, default '1')
 *   OUT                 (optional, default 'post.json')
 */

import { writeFileSync, appendFileSync, readdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
const OUT = process.env.OUT || 'post.json';
const USE_WEB_SEARCH = (process.env.USE_WEB_SEARCH ?? '1') !== '0';

const APPROVED_TAGS = [
  'Weight Loss', 'Weight Gain', 'Protein', 'Carbohydrates', 'Healthy Fats', 'Vitamins',
  'Minerals', 'Fiber', 'Antioxidants', 'Probiotics', 'Meal Plan', 'Indian Diet',
  'Vegetarian', 'Vegan', 'Keto Diet', 'Mediterranean Diet', 'DASH Diet',
  'Intermittent Fasting', 'Diabetes', 'Heart Health', 'Blood Pressure', 'Cholesterol',
  'Digestive Health', 'Gut Health', 'Immunity', 'Bone Health', 'Fitness', 'Exercise',
  'Strength Training', 'Cardio', 'Yoga', 'Mental Health', 'Stress Management', 'Sleep',
  'Hydration', 'Supplements', 'Superfoods', 'Organic', 'Natural Remedies', 'Recipes',
  'Cooking Tips', 'Meal Prep', 'Healthy Snacks', 'Nutrition Facts', 'Calorie Counting',
  'Metabolism', 'Detox',
];

const BANNED = [
  'delve', 'moreover', 'furthermore', 'in today’s fast-paced world', "in today's fast-paced world",
  'in this day and age', 'unlock', 'elevate', 'embark', 'navigate the world of',
  'it is important to note', 'it is worth noting', 'in conclusion', 'to sum up',
  'look no further', 'game-changer', 'game changer', 'tapestry', 'testament to',
  'in the realm of', 'when it comes to', 'that being said', 'dive in', 'let us dive in',
  'treasure trove', 'plethora', 'myriad', 'robust', 'seamless', 'holistic',
  'supercharge', 'powerhouse', 'unleash', 'revolutionise', 'revolutionize',
  'cutting-edge', 'at the end of the day', 'needless to say',
];

const ALLOWED_TAGS = new Set(['h2', 'h3', 'p', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'a']);

const SYSTEM = `You are the senior content writer for Dietary Guide (dietaryguide.in), an Indian nutrition and wellness brand by Navdhi Solutions (incubated at IIT Kanpur). You write one long-form article that must both rank on Google and be quotable by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini), while being genuinely useful to an Indian reader.

BRAND (internalise, do not paste into the article): AI nutrition app (IRA chatbot, meal logging from photos, food-label scanner, personalised diet plans) plus healthy Indian snacks (Chana Jor Masala, Rajma Jor Masala, High-Protein Millet Granola, Mixed Seed and Almond Protein Bars, Digestion Tea, The Wellness Treat). India-first, ICMR-aligned, respects traditional Indian foods (dals, millets, chana, rajma, ghee, dahi). Serves health-conscious Indians, working professionals, vegetarians/vegans, and people managing diabetes, weight, BP, or gut issues.

RESEARCH: Use web search to verify every statistic before writing. Name sources in plain text (e.g. "ICMR recommends around 400g of vegetables per day"). Never invent studies, numbers, or quotes. If you are not confident of an exact figure, state the point qualitatively. For any disease, medication, pregnancy, or specific-condition claim, include one plain line telling the reader to check with a doctor or registered dietitian.

SEO: One primary keyword a real person would type, plus 2-4 secondary keywords. Put the primary keyword in the title, the first 100 words, at least one <h2>, and the meta description. Never keyword-stuff. Match search intent. Length 900-1500 words. Short paragraphs (2-4 sentences), descriptive headings, lists where they help. Include 2-4 internal links using real URLs such as https://dietaryguide.in/ (app) and https://dietaryguide.in/products, only where they genuinely help.

AI-SEARCH: Answer the core question in the first 2-3 sentences. Use question-style headings that mirror how people ask. Make each section self-contained. Use specific, checkable, named facts. Define the key entity once in one clean sentence. End with a 3-5 question FAQ. Prefer clean declarative sentences.

VOICE (STRICT): Warm, clear, direct, address the reader as "you", simple clean Indian English, no Hinglish. NO em dashes anywhere (use commas, full stops, or "and"; a normal hyphen in compounds like "high-protein" is fine). NO emojis. Active voice, short sentences. Do NOT use any of these words/phrases: delve, moreover, furthermore, in today's fast-paced world, in this day and age, unlock, elevate, embark, navigate the world of, it is important to note, it is worth noting, in conclusion, to sum up, look no further, game-changer, tapestry, testament to, realm, in the realm of, landscape (figurative), when it comes to, that being said, dive in, let us dive in, treasure trove, plethora, myriad, robust, seamless, holistic (unless clinically accurate), leverage (as a verb), supercharge, powerhouse (except for a genuinely nutrient-dense food, sparingly), unleash, revolutionise, cutting-edge, at the end of the day, needless to say. No filler intros; open with the answer or a real hook. Include at least one concrete, screenshot-worthy takeaway (a sample day of meals, a swap list, or a checklist).

HTML: content is clean HTML using ONLY these tags: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <a href="...">. No <h1>, no headings above h2. Structure: opening <p> that answers the question; a "Why it matters in India" <h2>; 2-4 question-style <h2> body sections; a "Put it into practice" section; optional myths section; a "Frequently asked questions" <h2> with 3-5 <h3> Q&As; a soft close <p> with one natural link to the app or products (no hard sell).`;

function buildUserPrompt(existingTitles, feedback) {
  const avoid = existingTitles.length
    ? `\n\nAlready-published titles (pick a DIFFERENT topic, do not repeat these or close variants):\n- ${existingTitles.join('\n- ')}`
    : '';
  const fix = feedback ? `\n\nYour previous attempt failed these checks, fix them: ${feedback}` : '';
  return `Write today's article. Pick ONE fresh, high-reach question that many Indians search and need answered, with a clear Indian angle and real ICMR/Indian-food context. Rotate across clusters: Indian protein, millets/whole grains, condition-focused (diabetes, anemia, BP, PCOS), label reading/food safety, everyday habits, myth-busting.${avoid}${fix}

Output ONLY a single JSON object as your final message, with no prose and no code fences, shaped exactly like:
{
  "title": "headline with the primary keyword",
  "subtitle": "one honest hook sentence",
  "content": "the full article body as HTML using only the allowed tags",
  "tags": ["3-6 tags from the approved list"],
  "meta_title": "<=60 characters",
  "meta_description": "<=160 characters, contains the primary keyword, not a copy of the title",
  "primary_keyword": "the primary keyword you targeted"
}

Approved tags (reuse these, do not invent new ones): ${APPROVED_TAGS.join(', ')}.`;
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('No JSON object found in model output.');
  return JSON.parse(text.slice(start, end + 1));
}

function validate(post) {
  const problems = [];
  for (const f of ['title', 'subtitle', 'content', 'tags', 'meta_title', 'meta_description']) {
    if (!post[f] || (Array.isArray(post[f]) && post[f].length === 0)) problems.push(`missing ${f}`);
  }
  if (problems.length) return problems;

  const text = stripHtml(post.content);
  const words = text.split(' ').filter(Boolean).length;
  const kw = (post.primary_keyword || '').toLowerCase();
  const first100 = text.split(' ').slice(0, 100).join(' ').toLowerCase();
  const h2s = [...post.content.matchAll(/<h2>(.*?)<\/h2>/gis)].map((m) => stripHtml(m[1]).toLowerCase());
  const usedTags = [...post.content.matchAll(/<\/?([a-z0-9]+)/gi)].map((m) => m[1].toLowerCase());
  const blob = `${post.title} ${post.subtitle} ${post.content} ${post.meta_title} ${post.meta_description}`;

  if (blob.includes('—')) problems.push('contains an em dash');
  const low = blob.toLowerCase();
  const hits = BANNED.filter((b) => low.includes(b.toLowerCase()));
  if (hits.length) problems.push(`banned phrases: ${hits.join(', ')}`);
  if (words < 900 || words > 1500) problems.push(`word count ${words} (need 900-1500)`);
  const badTags = [...new Set(usedTags)].filter((t) => !ALLOWED_TAGS.has(t));
  if (badTags.length) problems.push(`disallowed HTML tags: ${badTags.join(', ')}`);
  if (kw) {
    if (!post.title.toLowerCase().includes(kw)) problems.push('primary keyword not in title');
    if (!first100.includes(kw)) problems.push('primary keyword not in first 100 words');
    if (!h2s.some((h) => h.includes(kw))) problems.push('primary keyword not in any <h2>');
    if (!post.meta_description.toLowerCase().includes(kw)) problems.push('primary keyword not in meta description');
  }
  if (post.meta_title.length > 60) problems.push(`meta_title ${post.meta_title.length} chars (<=60)`);
  if (post.meta_description.length > 160) problems.push(`meta_description ${post.meta_description.length} chars (<=160)`);
  const faqCount = (post.content.match(/<h3>/gi) || []).length;
  if (faqCount < 3) problems.push('fewer than 3 FAQ <h3> questions');
  const okTags = post.tags.filter((t) => APPROVED_TAGS.includes(t));
  if (okTags.length < 3) problems.push('fewer than 3 approved tags');
  return problems;
}

async function readExistingTitles() {
  try {
    if (!getApps().length) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)), projectId: 'dietaryguideblog' });
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        initializeApp({ credential: applicationDefault(), projectId: 'dietaryguideblog' });
      } else {
        const local = readdirSync(__dirname).find((f) => /^dietaryguideblog.*\.json$/i.test(f));
        if (!local) return [];
        initializeApp({ credential: cert(JSON.parse(readFileSync(path.join(__dirname, local), 'utf-8'))), projectId: 'dietaryguideblog' });
      }
    }
    const snap = await getFirestore().collection('blogs').get();
    const titles = [];
    snap.forEach((doc) => { const t = doc.data().title; if (t) titles.push(t); });
    return titles;
  } catch (e) {
    console.error('Could not read existing titles (continuing without dedupe):', e.message);
    return [];
  }
}

async function callClaude(userPrompt) {
  const body = {
    model: MODEL,
    max_tokens: 6000,
    system: SYSTEM,
    messages: [{ role: 'user', content: userPrompt }],
  };
  if (USE_WEB_SEARCH) {
    body.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 4 }];
  }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${errText}`);
  }
  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
  if (!text) throw new Error('Empty text response from model.');
  return text;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }
  const existing = await readExistingTitles();
  console.error(`Loaded ${existing.length} existing titles for dedupe.`);

  let feedback = '';
  let post = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const raw = await callClaude(buildUserPrompt(existing, feedback));
    let candidate;
    try {
      candidate = extractJson(raw);
    } catch (e) {
      feedback = 'Return only a valid JSON object.';
      console.error(`Attempt ${attempt}: ${e.message}`);
      continue;
    }
    const problems = validate(candidate);
    if (problems.length === 0) { post = candidate; break; }
    feedback = problems.join('; ');
    console.error(`Attempt ${attempt} failed checks: ${feedback}`);
    if (existing.map((t) => t.toLowerCase()).includes((candidate.title || '').toLowerCase())) {
      feedback += '; that title already exists, choose a different topic';
    }
  }

  if (!post) {
    console.error('Could not produce a valid post after 2 attempts.');
    process.exit(1);
  }

  const out = {
    title: post.title,
    subtitle: post.subtitle,
    content: post.content,
    tags: post.tags.filter((t) => APPROVED_TAGS.includes(t)),
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    published: true,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf-8');

  const slug = post.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  console.error(`Wrote ${OUT} | slug: ${slug} | words: ${stripHtml(post.content).split(' ').filter(Boolean).length}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\n`);
    appendFileSync(process.env.GITHUB_OUTPUT, `title=${post.title.replace(/\n/g, ' ')}\n`);
  }
  process.stdout.write(slug);
}

main().catch((err) => { console.error('Generation failed:', err); process.exit(1); });

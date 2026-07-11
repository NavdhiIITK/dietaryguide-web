import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { blogDb } from '@/lib/firebase';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/types/blog';

const COLLECTION = 'blogs';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
const FALLBACK_AVATAR = 'https://placehold.co/40x40.png';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function computeSnippet(content: string): string {
  const text = stripHtml(content);
  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
}

function computeReadingTime(content: string): number {
  const wordCount = stripHtml(content).split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === 'string') return value;
  return new Date().toISOString();
}

const TIMEOUT_MS = 10000;
class FirestoreTimeoutError extends Error {
  constructor() {
    super(
      'Timed out talking to Firestore. If this is a fresh setup, make sure a Firestore database ' +
        'has been created in the "dietaryguideblog" Firebase project (Console → Build → Firestore Database).'
    );
    this.name = 'FirestoreTimeoutError';
  }
}

/** Firestore's SDK can hang indefinitely (rather than reject) when the target database doesn't exist yet. */
function withTimeout<T>(promise: Promise<T>, ms = TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new FirestoreTimeoutError()), ms)),
  ]);
}

function mapDoc(id: string, data: Record<string, any>): BlogPost {
  const content = data.content || '';
  return {
    id,
    slug: id,
    title: data.title || 'Untitled Post',
    subtitle: data.subtitle || '',
    content,
    image: data.image || FALLBACK_IMAGE,
    tags: Array.isArray(data.tags) ? data.tags.filter((t: unknown) => typeof t === 'string') : [],
    author_name: data.author_name || 'Dietary Guide',
    author_avatar_url: data.author_avatar_url || FALLBACK_AVATAR,
    author: {
      name: data.author_name || 'Dietary Guide',
      avatarUrl: data.author_avatar_url || FALLBACK_AVATAR,
    },
    snippet: data.snippet || computeSnippet(content),
    reading_time: data.reading_time || computeReadingTime(content),
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    published: data.published ?? false,
    created_at: toIso(data.created_at),
    updated_at: data.updated_at ? toIso(data.updated_at) : undefined,
  };
}

/** Public reads default to published-only; pass includeUnpublished for the admin dashboard/editor. */
export async function getBlogPosts(opts?: { includeUnpublished?: boolean }): Promise<BlogPost[]> {
  try {
    const colRef = collection(blogDb, COLLECTION);
    const snap = await withTimeout(getDocs(opts?.includeUnpublished ? colRef : query(colRef, where('published', '==', true))));
    const posts = snap.docs.map((d) => mapDoc(d.id, d.data()));
    posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return posts;
  } catch (error) {
    console.error('getBlogPosts error:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string, opts?: { includeUnpublished?: boolean }): Promise<BlogPost | undefined> {
  try {
    const snap = await withTimeout(getDoc(doc(blogDb, COLLECTION, slug)));
    if (!snap.exists()) return undefined;
    const post = mapDoc(snap.id, snap.data());
    if (!post.published && !opts?.includeUnpublished) return undefined;
    return post;
  } catch (error) {
    console.error('getBlogPostBySlug error:', error);
    return undefined;
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const snap = await withTimeout(getDocs(query(collection(blogDb, COLLECTION), where('published', '==', true))));
    const tagSet = new Set<string>();
    snap.docs.forEach((d) => {
      const tags = d.data().tags;
      if (Array.isArray(tags)) tags.forEach((t) => typeof t === 'string' && tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  } catch (error) {
    console.error('getAllTags error:', error);
    return [];
  }
}

export async function createBlogPost(postData: CreateBlogPost): Promise<BlogPost> {
  const slug = generateSlug(postData.title);
  if (!slug) {
    throw new Error('Title must contain at least one letter or number to generate a URL.');
  }

  const docRef = doc(blogDb, COLLECTION, slug);
  const existing = await withTimeout(getDoc(docRef));
  if (existing.exists()) {
    throw new Error('DUPLICATE_SLUG');
  }

  const content = postData.content || '';
  const payload = {
    title: postData.title,
    subtitle: postData.subtitle || '',
    content,
    image: postData.image || FALLBACK_IMAGE,
    tags: Array.isArray(postData.tags) ? postData.tags : [],
    author_name: postData.author_name || 'Dietary Guide',
    author_avatar_url: postData.author_avatar_url || FALLBACK_AVATAR,
    snippet: computeSnippet(content),
    reading_time: computeReadingTime(content),
    meta_title: postData.meta_title || postData.title,
    meta_description: postData.meta_description || computeSnippet(content),
    published: postData.published ?? false,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  await withTimeout(setDoc(docRef, payload));
  const saved = await withTimeout(getDoc(docRef));
  return mapDoc(saved.id, saved.data()!);
}

export async function updateBlogPost(id: string, postData: Partial<UpdateBlogPost>): Promise<BlogPost> {
  const docRef = doc(blogDb, COLLECTION, id);
  const updates: Record<string, unknown> = { updated_at: serverTimestamp() };

  if (postData.title !== undefined) updates.title = postData.title;
  if (postData.subtitle !== undefined) updates.subtitle = postData.subtitle;
  if (postData.content !== undefined) {
    updates.content = postData.content;
    updates.snippet = computeSnippet(postData.content);
    updates.reading_time = computeReadingTime(postData.content);
  }
  if (postData.image !== undefined) updates.image = postData.image;
  if (postData.tags !== undefined) updates.tags = postData.tags;
  if (postData.author_name !== undefined) updates.author_name = postData.author_name;
  if (postData.author_avatar_url !== undefined) updates.author_avatar_url = postData.author_avatar_url;
  if (postData.meta_title !== undefined) updates.meta_title = postData.meta_title;
  if (postData.meta_description !== undefined) updates.meta_description = postData.meta_description;
  if (postData.published !== undefined) updates.published = postData.published;

  await withTimeout(updateDoc(docRef, updates));
  const saved = await withTimeout(getDoc(docRef));
  return mapDoc(saved.id, saved.data()!);
}

export async function deleteBlogPost(id: string): Promise<void> {
  await withTimeout(deleteDoc(doc(blogDb, COLLECTION, id)));
}

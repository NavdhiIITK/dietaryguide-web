/**
 * Types for shared/blog-seo.mjs, which is plain JavaScript so that the Vercel
 * serverless functions in api/ can import the exact same module the React app
 * uses. Keep these signatures in step with that file.
 */
declare module '@shared/blog-seo.mjs' {
  export const SITE_URL: string;
  export const SITE_NAME: string;
  export const AUTHOR_NAME: string;
  export const TWITTER_HANDLE: string;
  export const LOGO_URL: string;
  export const FALLBACK_IMAGE: string;

  export interface BlogSeoMeta {
    url: string;
    title: string;
    description: string;
    image: string;
    author: string;
    published: string;
    modified: string;
    tags: string[];
  }

  export const EXPERT_AUTHOR_NAME: string;
  export const EXPERT_AUTHOR_ID: string;
  export const EXPERT_AUTHOR_TITLE: string;

  export function normalizeAuthorName(name?: string): string;
  export function buildAuthorSchema(authorName?: string): any;
  export function stripHtml(html: string): string;
  export function extractFaqs(content: string): Array<{ question: string; answer: string }>;
  export function buildBlogMeta(post: any): BlogSeoMeta;
  export function buildBlogSchemas(post: any): any[];
}

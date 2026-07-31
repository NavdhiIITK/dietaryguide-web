import { useEffect, useState } from "react";
import { getBlogPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/types/blog";

/**
 * Latest published posts for homepage preview sections. getBlogPosts()
 * already returns published-only, sorted newest-first, so this just caps
 * the count — used by both homepage "latest posts" sections so a newly
 * published post shows up in each without editing either one.
 */
export function useLatestBlogPosts(limit: number) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getBlogPosts()
      .then((all) => {
        if (!cancelled) setPosts(all.slice(0, limit));
      })
      .catch((error) => {
        console.error("useLatestBlogPosts: failed to load posts", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { posts, loading };
}

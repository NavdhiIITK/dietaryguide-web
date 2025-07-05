import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogList } from '@/components/blog/blog-list';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import type { BlogPost } from '@/types';

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, tagsData] = await Promise.all([
          getBlogPosts(),
          getAllTags()
        ]);
        setPosts(postsData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BlogList posts={posts} tags={tags} />
      <Footer />
    </div>
  );
};

export default BlogListPage; 
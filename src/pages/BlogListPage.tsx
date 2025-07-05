import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { BlogList } from '@/components/blog/BlogList';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { BlogPost } from '@/types/blog';
import SEOOptimizer from "@/components/SEOOptimizer";

const BlogListPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
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
        setTags(['All', ...tagsData]);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags.includes(activeFilter)));
    }
  }, [activeFilter, posts]);

  const handleFilterChange = (tag: string) => {
    setActiveFilter(tag);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOOptimizer
        title="Blog - DietaryGuide"
        description="Discover expert insights on nutrition, diet, fitness, and wellness. Read our latest articles on healthy living and dietary guidance."
        keywords="nutrition blog, diet tips, fitness advice, wellness articles, healthy eating, dietary guidance"
        url="/blog"
        type="website"
      />

      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover expert insights on nutrition, diet, fitness, and wellness to help you live your healthiest life.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                onClick={() => handleFilterChange(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>

          {/* Blog posts */}
          <BlogList posts={filteredPosts} loading={loading} />

          {/* Empty state */}
          {!loading && filteredPosts.length === 0 && activeFilter !== "All" && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No posts found for "{activeFilter}"
              </h3>
              <p className="text-muted-foreground mb-4">
                Try selecting a different category or check back later.
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveFilter("All")}
              >
                View All Posts
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage; 
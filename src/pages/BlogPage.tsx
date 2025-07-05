import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { blogs } from "@/data/blogs";
import { supabase } from "@/integrations/supabase/client";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  imageUrl: string;
  content?: string;
  author?: string;
  readingTime?: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const filterTags = ['All', 'Nutrition', 'Diet', 'Fitness', 'Wellness', 'Health'];

// Enhanced BlogCard component for modularity
function BlogCard({ blog }) {
  return (
    <a
      href={`/blog/${blog.id}`}
      className="group block bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/30"
    >
      <div className="flex flex-col gap-4">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {blog.category && (
            <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              {blog.category}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground/80">{blog.author || 'Team DietaryGuide'}</span>
            </div>
            <time dateTime={blog.date} className="text-xs">
              {new Date(blog.date).toLocaleDateString("en-US", { 
                month: "short", 
                day: "numeric", 
                year: "numeric" 
              })}
            </time>
          </div>
          
          <h3 className="font-headline text-xl leading-snug group-hover:text-primary transition-colors font-bold">
            {blog.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
          
          {blog.readingTime && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime}</span>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-border/30">
            <span className="text-primary font-semibold text-sm group-hover:underline transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        // Fetch dynamic blogs from Supabase
        const { data: dynamicBlogs, error } = await supabase
          .from('auto_blogs')
          .select('id, title, description, date, category, image, author')
          .neq('category', 'Recipes')
          .eq('is_published', true)
          .order('date', { ascending: false });

        if (error) {
          console.error("Error fetching dynamic blogs:", error);
        }

        // Convert static blogs to the same format
        const staticBlogs: Blog[] = blogs.map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          date: blog.date,
          category: blog.category,
          imageUrl: blog.imageUrl,
          content: blog.content,
          author: blog.author,
          readingTime: blog.readingTime
        }));

        // Convert dynamic blogs to the same format
        const formattedDynamicBlogs: Blog[] = (dynamicBlogs || []).map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.description,
          date: blog.date || new Date().toISOString(),
          category: blog.category,
          imageUrl: blog.image || placeholderImage,
          author: blog.author
        }));

        // Combine and sort all blogs by date
        const combinedBlogs = [...staticBlogs, ...formattedDynamicBlogs]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setAllBlogs(combinedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to static blogs only
        setAllBlogs(blogs);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  const filteredBlogs = activeFilter === "All"
    ? allBlogs
    : allBlogs.filter(blog => blog.category === activeFilter);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const visibleBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12 md:mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">
              Nutrition & Wellness Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Evidence-based articles on health, nutrition, fitness, and wellness to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-3xl font-bold font-headline">Latest Articles</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {filterTags.map(tag => (
                <Button
                  key={tag}
                  variant={activeFilter === tag ? 'default' : 'outline'}
                  onClick={() => handleFilterChange(tag)}
                  className={`rounded-full px-5 transition-colors ${
                    activeFilter === tag 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-transparent border-foreground/30 hover:bg-foreground/10'
                  }`}
                  disabled={loading}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-background rounded-2xl shadow-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : visibleBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-headline mb-2">No Posts Found</h2>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
          
          {currentPage < totalPages && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" onClick={handleLoadMore}>Load More</Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-8 text-foreground/80">
            Get the latest health tips, recipes, and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 flex-1 rounded-md border border-input bg-background"
            />
            <Button className="px-8">Subscribe</Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;

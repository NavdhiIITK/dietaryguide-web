import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { blogs } from "@/data/blogs";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  imageUrl: string;
  content?: string;
  author?: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const filteredBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const visibleBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nutrition & Wellness Blog
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Evidence-based articles on health, nutrition, fitness, and wellness to help you make informed decisions.
          </p>
        </div>
      </section>
      
      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {["All", "Nutrition", "Diet", "Fitness", "Wellness", "Health"].map(category => (
                <Button 
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"} 
                  className="text-sm"
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {visibleBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBlogs.map((blog) => (
                <div key={blog.id} className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
                  <div className="h-56 bg-muted overflow-hidden">
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground/60">{blog.date}</span>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{blog.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                    <p className="text-foreground/70 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <Button asChild variant="link" className="p-0">
                      <Link to={`/blog/${blog.id}`}>Read More →</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-foreground/70">No articles found in this category</h3>
              <p className="mt-2 text-foreground/60">Try selecting a different category or check back later.</p>
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


import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

// Curated blog data with high-quality health, diet, and fitness content
const curatedBlogs: Blog[] = [
  {
    id: "1",
    title: "The Science Behind Intermittent Fasting",
    excerpt: "Explore how intermittent fasting affects your metabolism, blood sugar levels, and overall health based on recent scientific studies.",
    date: "May 1, 2025",
    category: "Diet",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "2",
    title: "Strength Training Fundamentals for Beginners",
    excerpt: "A comprehensive guide to building a solid foundation in strength training with proper form and sustainable progression.",
    date: "April 28, 2025",
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    title: "Mediterranean Diet: Benefits Beyond Weight Loss",
    excerpt: "Discover how the Mediterranean diet can improve heart health, cognitive function, and longevity according to recent research.",
    date: "April 24, 2025",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "4",
    title: "Sleep Optimization for Better Recovery",
    excerpt: "Learn how quality sleep directly impacts your fitness results, hormone balance, and overall wellness.",
    date: "April 20, 2025",
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "5",
    title: "The Role of Protein in Muscle Development",
    excerpt: "A detailed analysis of how protein intake affects muscle protein synthesis and optimal timing for performance athletes.",
    date: "April 16, 2025",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "6",
    title: "HIIT vs. Steady-State Cardio: What's Right for You?",
    excerpt: "Compare the benefits and limitations of high-intensity interval training and traditional cardio for different fitness goals.",
    date: "April 12, 2025",
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "7",
    title: "Understanding Micronutrients and Their Impact on Health",
    excerpt: "An in-depth look at essential vitamins and minerals that play critical roles in energy production, immune function, and more.",
    date: "April 8, 2025",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "8",
    title: "Mindfulness Practices for Stress Reduction",
    excerpt: "Evidence-based mindfulness techniques that can lower cortisol levels and improve your body's response to stress.",
    date: "April 4, 2025",
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "9",
    title: "Progressive Overload: The Key to Continuous Improvement",
    excerpt: "How to implement progressive overload principles in your training routine for sustained strength and muscle gains.",
    date: "April 1, 2025",
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "10",
    title: "Gut Health and Its Connection to Overall Wellness",
    excerpt: "Exploring the gut-brain axis and how a healthy microbiome influences everything from mood to immunity.",
    date: "March 28, 2025",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1612016668498-4e05e106bb66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "11",
    title: "Hydration Strategies for Optimal Performance",
    excerpt: "Beyond the 8 glasses a day: Learn how proper hydration timing and electrolyte balance can enhance your workouts.",
    date: "March 24, 2025",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "12",
    title: "Plant-Based Nutrition: Building a Balanced Diet",
    excerpt: "How to ensure adequate protein, iron, and B-vitamin intake while following a plant-based or vegan diet.",
    date: "March 20, 2025",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const BlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Limit blogs per page

  useEffect(() => {
    // Simulate loading for a more natural feel
    const timer = setTimeout(() => {
      setFilteredBlogs(curatedBlogs);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter blogs when activeFilter changes
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredBlogs(curatedBlogs);
    } else {
      setFilteredBlogs(curatedBlogs.filter(blog => blog.category === activeFilter));
    }
    
    // Reset to first page when filter changes
    setCurrentPage(1);
  }, [activeFilter]);
  
  // Update visible blogs when page or filtered blogs change
  useEffect(() => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    setVisibleBlogs(filteredBlogs.slice(startIndex, endIndex));
  }, [currentPage, filteredBlogs, blogsPerPage]);
  
  const categories = ["All", "Nutrition", "Diet", "Fitness", "Wellness", "Health"];
  
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
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
              {categories.map(category => (
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
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-background rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-[30%]" />
                      <Skeleton className="h-6 w-[20%] rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-[80%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : visibleBlogs.length > 0 ? (
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
          
          {currentPage < totalPages && filteredBlogs.length > blogsPerPage && (
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

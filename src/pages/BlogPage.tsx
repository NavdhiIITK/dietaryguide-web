
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Understanding Macronutrients: Your Guide to Proteins, Fats, and Carbs",
    excerpt: "Learn how macronutrients work in your body and how to balance them for optimal health and fitness goals.",
    date: "April 5, 2025",
    category: "Nutrition",
    imageUrl: "",
  },
  {
    id: 2,
    title: "Mindful Eating: How to Develop Healthier Food Relationships",
    excerpt: "Discover techniques to bring awareness to your eating habits and develop a more balanced approach to food.",
    date: "April 2, 2025",
    category: "Wellness",
    imageUrl: "",
  },
  {
    id: 3,
    title: "The Science of Hydration: Why Water Is Your Best Friend",
    excerpt: "Explore how proper hydration affects everything from cognitive function to athletic performance.",
    date: "March 28, 2025",
    category: "Health",
    imageUrl: "",
  },
  {
    id: 4,
    title: "Seasonal Eating: Benefits for Your Health and the Planet",
    excerpt: "Why eating seasonal foods can improve nutrition, save money, and help the environment.",
    date: "March 25, 2025",
    category: "Sustainability",
    imageUrl: "",
  },
  {
    id: 5,
    title: "Sleep and Nutrition: The Surprising Connection",
    excerpt: "How your diet affects your sleep quality and vice versa - plus tips for better sleep through nutrition.",
    date: "March 21, 2025",
    category: "Health",
    imageUrl: "",
  },
  {
    id: 6,
    title: "Plant-Based Protein Sources: Complete Guide",
    excerpt: "Everything you need to know about getting sufficient protein from plant sources.",
    date: "March 18, 2025",
    category: "Nutrition",
    imageUrl: "",
  },
];

const BlogPage = () => {
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
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" className="text-sm">All</Button>
              <Button variant="outline" className="text-sm">Nutrition</Button>
              <Button variant="outline" className="text-sm">Fitness</Button>
              <Button variant="outline" className="text-sm">Wellness</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-background rounded-xl overflow-hidden shadow-md card-hover">
                <div className="h-56 bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground">Image Placeholder</div>
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
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
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

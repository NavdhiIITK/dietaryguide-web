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
  content?: string;
  author?: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

// Export the curatedBlogs array so it can be imported in ContentDetailPage
export const curatedBlogs: Blog[] = [
  {
    id: "nutritional-equality",
    title: "Nutritional Equality: Making Healthy Food Accessible for All",
    excerpt: "Explore how we can bridge the nutrition gap in society and ensure everyone has access to healthy food regardless of socioeconomic status.",
    date: "May 13, 2025",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    content: `
# Nutritional Equality: Making Healthy Food Accessible for All

In a nation as diverse as India, where cultures, languages, and traditions blend beautifully, access to nutritious food remains uneven. Nutritional equality is not just a moral obligation but a public health priority. Everyone deserves the right to eat healthy—regardless of their socio-economic background.

## The Importance of Nutritional Equality

Food is more than sustenance—it is a foundation for health, learning, productivity, and longevity. When large sections of the population lack access to balanced, nourishing food, the effects ripple across generations. Malnutrition, obesity, lifestyle disorders, and micronutrient deficiencies are often more prevalent in economically disadvantaged communities.

Ensuring equal access to nutrition is critical for:

* **Public Health:** Preventing diseases and improving overall wellness.
* **Economic Growth:** A healthier population is more productive and innovative.
* **Social Justice:** Everyone deserves the dignity of a healthy life, regardless of income or location.

## Barriers to Healthy Eating in Marginalized Communities

### 1. Affordability
Nutritious food often seems more expensive or inaccessible than processed alternatives. The cost barrier creates a significant divide in who can access healthy options.

### 2. Availability
Rural and urban poor areas may lack stores or vendors offering fresh fruits, vegetables, and whole grains. These "food deserts" force communities to rely on whatever is available locally.

### 3. Awareness
Limited nutrition education leads to choices driven by convenience or misinformation. Without proper knowledge, people cannot make informed decisions about their diets.

### 4. Cultural Factors
Traditional diets may sometimes get replaced by modern junk foods due to aggressive marketing. This shift away from traditional, often more balanced diets has serious health implications.

## Bridging the Gap: What Can Be Done?

Creating nutritional equality requires collective action. Here's how we can move forward:

### Government Policies
Subsidizing healthy food, fortifying staples, and supporting local agriculture can make nutritious options more affordable and available to everyone.

### Community Initiatives
Urban gardens, nutrition education camps, and local food distribution can uplift health in under-served areas. These grassroots efforts often have the most direct impact.

### Affordable Smart Snacks
Innovating affordable, wholesome snacks tailored to local taste and nutritional needs can provide accessible healthy options between meals.

### Partnerships with NGOs and Schools
Educating children early and ensuring mid-day meals are nutrient-rich is essential for developing lifelong healthy eating habits.

### Digital Nutrition Literacy
Use online platforms to spread practical, culturally relevant advice on healthy eating. Digital tools can reach larger audiences and customize information to specific needs.

## Conclusion

Nutritional equality is not just about food—it's about dignity, opportunity, and a healthier future for all. By supporting affordable and nutritious food initiatives, we invest in a stronger, more resilient society.

Let's continue to work together toward a world where healthy food is not a luxury but a right accessible to everyone. Through collaboration between government, communities, businesses, and individuals, we can create a more nutritionally equitable world.

### Take Action Today

Want to contribute to nutritional equality in your community? Here are some simple steps:
* Support local farmers and food producers
* Volunteer with food distribution programs
* Share nutrition knowledge with your community
* Advocate for healthy food policies in your area
* Start a community garden in underserved neighborhoods
    `
  },
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
  },
  {
    id: "science-of-hydration",
    title: "The Science of Hydration: Why Water Is Essential",
    excerpt: "Explore how proper hydration affects everything from cognitive function to athletic performance.",
    content: `
# The Science of Hydration: Why Water Is Essential

Water is the essence of life. Making up about 60% of our body weight, it's involved in virtually every bodily process. Yet many of us walk around chronically dehydrated without even realizing it.

## How Hydration Affects Your Body

**Brain Function**: Even mild dehydration can impair cognitive performance, concentration, alertness, and short-term memory. Studies show that a fluid loss of just 1-2% can begin to affect cognitive function.

**Physical Performance**: During physical activity, staying properly hydrated helps maintain normal body temperature, reduces cardiovascular strain, and improves performance. Athletes who lose as little as 2% of their body weight through sweating experience a significant drop in blood volume, causing the heart to work harder.

**Digestion and Nutrient Absorption**: Water helps break down food so your body can absorb nutrients. It also softens stool, preventing constipation.

**Detoxification**: The kidneys use water to filter waste from the blood and excrete it in urine. Insufficient water intake can lead to kidney stones and urinary tract infections.

## Signs of Dehydration

* **Thirst** (though by the time you feel thirsty, you're already mildly dehydrated)
* **Dark urine**
* **Fatigue**
* **Headaches**
* **Dry mouth and lips**
* **Dizziness**
* **Reduced urination**

## How Much Should You Drink?

While the "8 glasses a day" rule is a good general guideline, individual needs vary based on:

1. **Body weight and composition**
2. **Activity level and sweat rate**
3. **Environment (temperature and humidity)**
4. **Altitude**
5. **Overall health**

A better guideline is to drink enough so that your urine is pale yellow or clear most of the time.

## Beyond Water: Other Sources of Hydration

**Hydrating Foods**: Many fruits and vegetables are more than 90% water, including watermelon, strawberries, cucumbers, and lettuce.

**Other Beverages**: Herbal teas, milk, and even coffee and tea contribute to hydration (though caffeinated beverages have a mild diuretic effect).

## Electrolytes: Water's Essential Partners

Water alone isn't enough—your body needs electrolytes like sodium, potassium, and magnesium to properly absorb and use water. These minerals help maintain fluid balance, muscle function, and nerve signaling.

During intense exercise or in hot environments, you lose electrolytes through sweat, which is why sports drinks or electrolyte supplements can be beneficial in these situations.

## Practical Hydration Tips

* **Start your day with water** before your morning coffee or tea
* **Carry a reusable water bottle** everywhere
* **Set hydration reminders** on your phone
* **Eat water-rich fruits and vegetables**
* **Flavor water naturally** with fruits, vegetables, or herbs if you find plain water boring

Remember, staying hydrated is one of the simplest yet most effective ways to improve your overall health and wellbeing. It costs almost nothing but pays dividends in how you feel and perform every day.
    `,
    date: "March 28, 2025",
    category: "Hydration",
    imageUrl: "/post-images/hydration-science.png", // Updated image URL
    author: "Dr. Sarah Watkins"
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


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  isOutOfStock: boolean;
  link?: string;
}

// Enhanced dummy products for e-commerce experience
const dummyProducts: Product[] = [
  {
    id: "1",
    title: "Organic Almonds",
    description: "Premium quality raw almonds, rich in protein and healthy fats",
    imageUrl: "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    category: "Nuts & Seeds",
    tags: ["organic", "protein", "healthy"],
    price: 299,
    originalPrice: 349,
    isOutOfStock: true
  },
  {
    id: "2",
    title: "Herbal Green Tea",
    description: "Antioxidant-rich green tea blend for daily wellness",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Beverages",
    tags: ["herbal", "antioxidants", "wellness"],
    price: 199,
    originalPrice: 249,
    isOutOfStock: true
  },
  {
    id: "3",
    title: "Chia Seeds Pack",
    description: "Nutrient-dense superfood packed with omega-3 and fiber",
    imageUrl: "https://images.unsplash.com/photo-1605522765215-24cd5a52c5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Superfoods",
    tags: ["superfood", "omega-3", "fiber"],
    price: 399,
    originalPrice: 449,
    isOutOfStock: true
  },
  {
    id: "4",
    title: "Raw Honey",
    description: "Pure, unprocessed honey with natural enzymes and minerals",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Natural Sweeteners",
    tags: ["raw", "natural", "enzymes"],
    price: 599,
    originalPrice: 699,
    isOutOfStock: true
  },
  {
    id: "5",
    title: "Quinoa Grains",
    description: "Complete protein grain, perfect for healthy meals",
    imageUrl: "https://images.unsplash.com/photo-1601206979505-23e9e9d94445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Grains",
    tags: ["protein", "gluten-free", "complete"],
    price: 349,
    originalPrice: 399,
    isOutOfStock: true
  },
  {
    id: "6",
    title: "Coconut Oil",
    description: "Extra virgin coconut oil for cooking and wellness",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Oils",
    tags: ["virgin", "cooking", "wellness"],
    price: 499,
    originalPrice: 599,
    isOutOfStock: true
  },
  {
    id: "7",
    title: "Turmeric Powder",
    description: "Premium quality turmeric with high curcumin content",
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Spices",
    tags: ["curcumin", "anti-inflammatory", "premium"],
    price: 249,
    originalPrice: 299,
    isOutOfStock: true
  },
  {
    id: "8",
    title: "Mixed Berries",
    description: "Antioxidant-rich frozen berry mix for smoothies and snacks",
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    category: "Fruits",
    tags: ["antioxidants", "frozen", "berries"],
    price: 399,
    originalPrice: 449,
    isOutOfStock: true
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  useEffect(() => {
    // Load products from localStorage if available
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProducts([...dummyProducts, ...parsedProducts]);
      } catch (error) {
        console.error("Error parsing saved products:", error);
      }
    }
  }, []);

  return (
    <section className="pt-28 pb-12 bg-muted/30 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-spring/5 to-forest/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-mint/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald/20 rounded-full blur-2xl"></div>
      
      {/* Lovable mascot character */}
      <div className="absolute top-32 right-8 z-20 animate-float">
        <div className="w-16 h-16 bg-gradient-to-br from-spring to-forest rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">🥑</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-honey rounded-full flex items-center justify-center text-xs">
          👋
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header section matching website style */}
        <div className="text-center mb-12">
          <h2 className="text-section-title font-bold mb-6">Explore Our Products</h2>
          <p className="text-subtitle text-foreground/70 max-w-3xl mx-auto">Coming soon to your pantry!</p>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={product.id || index} className="overflow-hidden card-hover relative">
              {/* Out of stock overlay */}
              {product.isOutOfStock && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg py-2 px-4 font-bold">
                    Out of Stock
                  </Badge>
                </div>
              )}
              
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                    target.alt = "Image not found";
                  }}
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Price section */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                      <Badge variant="outline" className="text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, i) => (
                      <Badge key={`${tag}-${i}`} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  
                  {/* Add to cart button */}
                  <Button 
                    className="w-full" 
                    disabled={product.isOutOfStock}
                    variant={product.isOutOfStock ? "outline" : "default"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.isOutOfStock ? "Notify When Available" : "Add to Cart"}
                  </Button>
                  
                  {product.link && !product.isOutOfStock && (
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block text-center text-sm mt-2"
                    >
                      View Details →
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="text-center mt-16">
          <div className="glass-card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Stay Tuned!</h3>
            <p className="text-foreground/70 mb-6">
              We're carefully curating the finest products for your healthy lifestyle. 
              Sign up to be notified when our store launches!
            </p>
            <Button className="btn-primary">
              Notify Me When Available
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

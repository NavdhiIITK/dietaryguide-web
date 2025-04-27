
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  link?: string;
}

// Initial dummy products
const dummyProducts: Product[] = [
  {
    id: "1",
    title: "Organic Chia Seeds",
    description: "Nutrient-rich chia seeds packed with omega-3 fatty acids, fiber, and protein. Perfect for smoothies, puddings, and baked goods.",
    imageUrl: "/src/assets/products/chia-seeds.jpg",
    category: "Superfoods",
    tags: ["organic", "omega-3", "fiber"],
    link: "https://example.com/products/chia-seeds"
  },
  {
    id: "2",
    title: "Plant-Based Protein Powder",
    description: "Complete plant protein blend with 25g protein per serving. No artificial flavors or sweeteners.",
    imageUrl: "/src/assets/products/protein-powder.jpg",
    category: "Supplements",
    tags: ["vegan", "protein", "plant-based"],
    link: "https://example.com/products/protein-powder"
  },
  {
    id: "3",
    title: "Reusable Glass Water Bottle",
    description: "BPA-free glass bottle with silicone sleeve and measurement markings to help you track your daily water intake.",
    imageUrl: "/src/assets/products/water-bottle.jpg",
    category: "Accessories",
    tags: ["hydration", "eco-friendly", "BPA-free"],
    link: "https://example.com/products/water-bottle"
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
    <section className="pt-28 pb-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={product.id || index} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg"; // Fallback image
                    target.alt = "Image not found";
                  }}
                />
              </div>
              
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, i) => (
                      <Badge key={`${tag}-${i}`} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  
                  {product.link && (
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block mt-2"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

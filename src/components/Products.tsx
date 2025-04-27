
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

// For now, we'll use dummy data. In a real app, this would come from your database
const dummyProducts: Product[] = [
  {
    id: "1",
    title: "Organic Chia Seeds",
    description: "Nutrient-rich chia seeds packed with omega-3 fatty acids, fiber, and protein. Perfect for smoothies, puddings, and baked goods.",
    imageUrl: "https://source.unsplash.com/random/300x200/?chia-seeds",
    category: "Superfoods",
    tags: ["organic", "omega-3", "fiber"],
    link: "https://example.com/products/chia-seeds"
  },
  {
    id: "2",
    title: "Plant-Based Protein Powder",
    description: "Complete plant protein blend with 25g protein per serving. No artificial flavors or sweeteners.",
    imageUrl: "https://source.unsplash.com/random/300x200/?protein-powder",
    category: "Supplements",
    tags: ["vegan", "protein", "plant-based"],
    link: "https://example.com/products/protein-powder"
  },
  {
    id: "3",
    title: "Reusable Glass Water Bottle",
    description: "BPA-free glass bottle with silicone sleeve and measurement markings to help you track your daily water intake.",
    imageUrl: "https://source.unsplash.com/random/300x200/?water-bottle",
    category: "Accessories",
    tags: ["hydration", "eco-friendly", "BPA-free"],
    link: "https://example.com/products/water-bottle"
  }
];

const Products = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="object-cover w-full h-full"
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
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
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

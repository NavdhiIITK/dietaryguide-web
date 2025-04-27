
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  link?: string;
}

const ProductGenerator = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    tags: [],
    link: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, we'll just log the product. In a real app, you'd save this to a database
    console.log("Product data:", product);
    
    toast({
      title: "Product Created",
      description: "The product has been successfully created.",
    });
    
    // Reset form
    setProduct({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      tags: [],
      link: "",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Product Generator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={product.title}
            onChange={(e) => setProduct(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-4">
          <Label>Product Image</Label>
          <ImageUploader
            onImageUploaded={(url) => setProduct(prev => ({ ...prev, imageUrl: url }))}
            existingImageUrl={product.imageUrl}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={product.category}
            onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={product.tags.join(", ")}
            onChange={(e) => setProduct(prev => ({ 
              ...prev, 
              tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
            }))}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="link">Link (optional)</Label>
          <Input
            id="link"
            value={product.link}
            onChange={(e) => setProduct(prev => ({ ...prev, link: e.target.value }))}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default ProductGenerator;

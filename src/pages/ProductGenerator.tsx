
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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

const ProductGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    tags: [],
    link: "",
  });
  
  const [tagsInput, setTagsInput] = useState("");

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tagsArray = e.target.value
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
    setProduct(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new product with unique ID
    const newProduct = {
      ...product,
      id: uuidv4(),
    };
    
    // Save to localStorage
    const savedProducts = localStorage.getItem("products");
    let updatedProducts = [];
    
    if (savedProducts) {
      try {
        updatedProducts = JSON.parse(savedProducts);
      } catch (error) {
        console.error("Error parsing saved products:", error);
      }
    }
    
    updatedProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    // Log and show success notification
    console.log("Product data:", newProduct);
    
    toast({
      title: "Product Created",
      description: "The product has been successfully created and added to products page.",
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
    setTagsInput("");
    
    // Navigate to products page to see the new product
    navigate("/products");
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
          {product.imageUrl && (
            <p className="text-sm text-amber-600">
              ⚠️ Important: For the image to appear correctly, please manually place it in the src/assets/products/ folder.
            </p>
          )}
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
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="organic, vegan, health"
          />
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          )}
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

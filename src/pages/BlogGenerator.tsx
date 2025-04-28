import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "@/components/ImageUploader";

const BlogGenerator = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogPrompt, setBlogPrompt] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAuthentication = () => {
    if (password === "Navdhi123@") {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: "Welcome to the Blog Generator.",
        variant: "default",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateBlog = async () => {
    if (!blogTitle || !blogCategory || !blogPrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: `Write a comprehensive blog post with the title "${blogTitle}" about ${blogPrompt}. Target audience is health-conscious individuals interested in nutrition and wellness. Category: ${blogCategory}.`,
          type: "blog"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedBlog(data.content);
      setImagePrompt(`High-quality professional photograph related to ${blogTitle}, bright lighting, food photography style, nutritional, vibrant colors, healthy lifestyle imagery`);
      
      toast({
        title: "Blog Generated",
        description: "Your blog post has been generated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating blog:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "An error occurred while generating the blog content.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const publishBlog = async () => {
    if (!blogTitle || !blogCategory || !generatedBlog) {
      toast({
        title: "Missing Information",
        description: "Please generate blog content before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    
    try {
      const currentDate = new Date().toISOString();
      
      const excerpt = generatedBlog.substring(0, 200) + '...';
      
      const { data, error } = await supabase
        .from('auto_blogs')
        .insert({
          title: blogTitle,
          description: excerpt,
          content: generatedBlog,
          category: blogCategory,
          image: imageUrl,
          date: currentDate,
          is_published: true
        })
        .select();

      if (error) throw error;
      
      toast({
        title: "Blog Published",
        description: "Your blog has been published successfully.",
        variant: "default",
      });
      
      setBlogTitle("");
      setBlogCategory("");
      setBlogPrompt("");
      setGeneratedBlog("");
      setImagePrompt("");
      setImageUrl("");
      
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast({
        title: "Publishing Failed",
        description: error.message || "An error occurred while publishing the blog.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    toast({
      title: "Image Added",
      description: "Your image has been added to the blog post.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                This page is password protected. Please enter the password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAuthentication()}
                  />
                </div>
                <Button className="w-full" onClick={handleAuthentication}>
                  Authenticate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Blog Generator
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Generate high-quality, nutrition-focused blog content with AI.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Information</CardTitle>
                  <CardDescription>
                    Fill in the details to generate your blog post.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="blog-title">Blog Title</Label>
                      <Input 
                        id="blog-title" 
                        placeholder="e.g., 10 Superfoods to Boost Your Immune System" 
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="blog-category">Category</Label>
                      <Select value={blogCategory} onValueChange={setBlogCategory}>
                        <SelectTrigger id="blog-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nutrition">Nutrition</SelectItem>
                          <SelectItem value="Diet">Diet</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                          <SelectItem value="Wellness">Wellness</SelectItem>
                          <SelectItem value="Recipes">Recipes</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="blog-prompt">Blog Prompt</Label>
                      <Textarea 
                        id="blog-prompt" 
                        placeholder="Describe what you want the blog to be about, including key points to cover..." 
                        className="min-h-[150px]"
                        value={blogPrompt}
                        onChange={(e) => setBlogPrompt(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={generateBlog} 
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Blog"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {imagePrompt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Image</CardTitle>
                    <CardDescription>
                      Upload an image for your blog post or use the provided prompt with an external AI image generator.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="image-prompt">Image Generation Prompt</Label>
                        <Textarea 
                          id="image-prompt"
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                          className="min-h-[100px] mb-4"
                        />
                        <Button 
                          variant="outline" 
                          className="w-full mb-6"
                          onClick={() => navigator.clipboard.writeText(imagePrompt)}
                        >
                          Copy Prompt
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Label className="mb-2 block">Upload Image</Label>
                        <ImageUploader 
                          onImageUploaded={handleImageUploaded} 
                          existingImageUrl={imageUrl}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Generated Blog</CardTitle>
                  <CardDescription>
                    Edit the generated content as needed before publishing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedBlog ? (
                    <div className="space-y-4">
                      <Textarea 
                        value={generatedBlog}
                        onChange={(e) => setGeneratedBlog(e.target.value)}
                        className="min-h-[500px] font-mono text-sm"
                      />
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigator.clipboard.writeText(generatedBlog)}
                        >
                          Copy Content
                        </Button>
                        <Button 
                          className="w-full" 
                          onClick={publishBlog}
                          disabled={isPublishing}
                        >
                          {isPublishing ? "Publishing..." : "Publish Blog"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center min-h-[500px]">
                      <div className="text-center text-foreground/60">
                        {isGenerating ? (
                          <div className="space-y-2">
                            <div className="text-lg">Generating blog content...</div>
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                          </div>
                        ) : (
                          "Generated blog content will appear here"
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogGenerator;

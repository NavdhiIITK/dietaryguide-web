import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  existingImageUrl?: string;
}

const ImageUploader = ({ onImageUploaded, existingImageUrl }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null);
  
  useEffect(() => {
    if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    }
  }, [existingImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Client-side file handling (no server upload)
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result as string;
          setPreviewUrl(imageUrl);
          onImageUploaded(imageUrl);
          
          toast({
            title: "Image Added",
            description: "Your image has been added.",
          });
          
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "Failed to process image",
          description: "There was an error processing your image.",
          variant: "destructive",
        });
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error("Error handling image:", error);
      toast({
        title: "Upload failed",
        description: "Please check developer console for details.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/50 rounded-lg p-4 sm:p-6 bg-muted/10 hover:bg-muted/20 transition-colors">
        {previewUrl ? (
          <div className="w-full max-h-64 overflow-hidden rounded-md mb-4 shadow-md">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        ) : (
          <div className="text-center p-6 sm:p-8">
            <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Upload an image in JPG, PNG format (max 5MB)
            </p>
          </div>
        )}
        
        <div className="mt-4 w-full flex justify-center">
          <Button
            variant="outline"
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 w-full sm:w-auto transition-all hover:border-primary hover:text-primary hover:bg-primary/5"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {previewUrl ? "Change Image" : "Upload Image"}
              </>
            )}
          </Button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

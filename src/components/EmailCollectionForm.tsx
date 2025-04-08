
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Check, Loader2 } from "lucide-react";

interface EmailCollectionFormProps {
  toolName: string;
  onComplete: () => void;
}

const EmailCollectionForm = ({ toolName, onComplete }: EmailCollectionFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create the Google Form prefilled URL with the tool name and email
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent(toolName);
      const emailParam = encodeURIComponent(email);
      
      const fullUrl = `${formBaseUrl}?entry.453589071=${toolParam}&entry.1562868697=${emailParam}&submit=Submit`;
      
      // Use an iframe to submit the form without navigating away
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a form element and submit it to the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = fullUrl;
      form.target = 'hidden_iframe';
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      // Show success message
      setIsCompleted(true);
      toast({
        title: "Thank you!",
        description: "Your email has been submitted successfully.",
      });
      
      // Store email in localStorage to avoid asking again in the same session
      localStorage.setItem('dietaryGuideEmail', email);
      
      // Call the completion handler after 1.5 seconds
      setTimeout(() => {
        onComplete();
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-green-200 dark:border-green-900">
      {!isCompleted ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-green-800 dark:text-green-300">Unlock Our AI Tools</h2>
          <p className="text-center text-muted-foreground mb-6 dark:text-gray-300">
            Enter your email to access our premium AI tools for nutrition and wellness.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-green-200 dark:border-green-900 focus:ring-2 focus:ring-green-500"
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : "Access Tool"}
            </Button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-300">Thank You!</h3>
          <p className="text-center text-muted-foreground dark:text-gray-300">
            You now have access to all our AI tools.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailCollectionForm;

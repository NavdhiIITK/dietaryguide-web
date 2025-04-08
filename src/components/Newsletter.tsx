
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Send, Check } from "lucide-react";

const Newsletter = () => {
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
      // Create the Google Form prefilled URL for newsletter subscription
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent("Newsletter");
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
        title: "Newsletter Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsCompleted(false);
        setEmail("");
      }, 3000);
      
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
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
        <p className="text-muted-foreground">Get the latest nutrition tips and healthy recipes delivered to your inbox.</p>
      </div>
      
      {!isCompleted ? (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <Button 
            type="submit" 
            className="bg-forest hover:bg-spring text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : <Send className="h-4 w-4" />}
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-center space-x-2 text-forest dark:text-spring py-2">
          <Check className="h-5 w-5" />
          <span>Successfully subscribed!</span>
        </div>
      )}
    </div>
  );
};

export default Newsletter;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

const ToolsAIWorkoutPlanner = () => {
  const { toast } = useToast();
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [workoutDays, setWorkoutDays] = useState("");
  const [equipment, setEquipment] = useState("");
  const [limitations, setLimitations] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);

  useEffect(() => {
    // Check if user has already submitted email
    const storedEmail = localStorage.getItem('dietaryGuideEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setHasSubmittedEmail(true);
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingEmail(true);
    
    try {
      // Create the Google Form prefilled URL with the tool name and email
      const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf2bV8y1mUy0N5FSOKXJJYw96p2wLa8HWqDcu3E9SwohwIIag/formResponse";
      const toolParam = encodeURIComponent("AI Workout Planner");
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
      setHasSubmittedEmail(true);
      localStorage.setItem('dietaryGuideEmail', email);
      
      toast({
        title: "Thank you!",
        description: "Your email has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const generateWorkoutPlan = async () => {
    if (!hasSubmittedEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to use this tool.",
        variant: "destructive",
      });
      return;
    }

    if (!fitnessGoal || !fitnessLevel || !workoutDays || !equipment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Prepare the prompt
      const prompt = `Create a personalized ${workoutDays}-day workout plan for a ${fitnessLevel} level person with a goal of ${fitnessGoal}. 
      They have access to ${equipment} equipment. ${limitations ? `They have these physical limitations: ${limitations}.` : "They have no physical limitations."} 
      Include specific exercises, sets, reps, and rest periods. Also add warm-up and cool-down routines. 
      Structure the workout plan day by day, with clear headings and exercise descriptions.`;

      // Call the Supabase edge function to generate content
      const { data, error } = await supabase.functions.invoke('ai-generator', {
        body: {
          prompt: prompt,
          type: "blog", // Reusing the blog type for workout plan format
          model: "google/gemini-flash-1.5" // Use Google's Gemini model
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedPlan(data.content);
      
      toast({
        title: "Workout Plan Generated",
        description: "Your personalized workout plan has been created!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating workout plan:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "An error occurred while generating your workout plan.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {!hasSubmittedEmail ? (
        <Card className="border-green-500/20 dark:border-green-400/20 shadow-md dark:shadow-green-900/10">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
            <CardTitle className="text-center text-green-800 dark:text-green-300">Enter Your Email to Access This Tool</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="workout-email">Email Address</Label>
                <div className="flex gap-2">
                  <Input 
                    id="workout-email" 
                    placeholder="your.email@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmittingEmail}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    {isSubmittingEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy and will never share your email with third parties.
              </p>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="fitness-goal" className="text-green-800 dark:text-green-300">Fitness Goal</Label>
              <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                <SelectTrigger id="fitness-goal" className="border-green-200 dark:border-green-900">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="general-fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="fitness-level" className="text-green-800 dark:text-green-300">Fitness Level</Label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger id="fitness-level" className="border-green-200 dark:border-green-900">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="workout-days" className="text-green-800 dark:text-green-300">Days per Week</Label>
              <Select value={workoutDays} onValueChange={setWorkoutDays}>
                <SelectTrigger id="workout-days" className="border-green-200 dark:border-green-900">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 days</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="equipment" className="text-green-800 dark:text-green-300">Available Equipment</Label>
              <Select value={equipment} onValueChange={setEquipment}>
                <SelectTrigger id="equipment" className="border-green-200 dark:border-green-900">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no equipment (bodyweight only)">No Equipment (Bodyweight)</SelectItem>
                  <SelectItem value="minimal equipment (dumbbells, resistance bands)">Minimal (Dumbbells, Bands)</SelectItem>
                  <SelectItem value="home gym equipment">Home Gym</SelectItem>
                  <SelectItem value="full gym access">Full Gym Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="limitations" className="text-green-800 dark:text-green-300">Physical Limitations or Injuries</Label>
            <Textarea 
              id="limitations" 
              placeholder="e.g., knee problems, lower back pain, etc. (optional)" 
              value={limitations}
              onChange={(e) => setLimitations(e.target.value)}
              className="border-green-200 dark:border-green-900"
            />
          </div>
          
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" 
            onClick={generateWorkoutPlan}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : "Generate Workout Plan"}
          </Button>
          
          {generatedPlan ? (
            <Card className="border-green-200 dark:border-green-900">
              <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-green-100 dark:border-green-900/30">
                <CardTitle className="text-green-800 dark:text-green-300">Your Personalized Workout Plan</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="max-w-none text-foreground whitespace-pre-line leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>strong]:font-semibold [&>a]:text-primary [&>a]:underline [&>a:hover]:text-primary/80 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-muted/50 [&>blockquote]:py-2 [&>blockquote]:px-4 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-muted [&>pre]:border [&>pre]:p-4 [&>pre]:rounded [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-1">
                  {generatedPlan}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/30"
                    onClick={() => navigator.clipboard.writeText(generatedPlan)}
                  >
                    Copy Plan
                  </Button>
                  <Button 
                    variant="default" 
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    onClick={() => window.print()}
                  >
                    Print Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-muted/30 dark:bg-gray-800/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <div className="text-center text-foreground/70 dark:text-gray-300">
                {isGenerating ? (
                  <div className="space-y-2">
                    <div className="text-lg">Creating your workout plan...</div>
                    <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : (
                  "Fill in your details to generate a personalized workout plan."
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ToolsAIWorkoutPlanner;

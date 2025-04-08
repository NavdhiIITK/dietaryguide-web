
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ToolsAIWorkoutPlanner = () => {
  const { toast } = useToast();
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [workoutDays, setWorkoutDays] = useState("");
  const [equipment, setEquipment] = useState("");
  const [limitations, setLimitations] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");

  const generateWorkoutPlan = async () => {
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
          type: "blog" // Reusing the blog type for workout plan format
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <Label htmlFor="fitness-goal">Fitness Goal</Label>
          <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
            <SelectTrigger id="fitness-goal">
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
          <Label htmlFor="fitness-level">Fitness Level</Label>
          <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
            <SelectTrigger id="fitness-level">
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
          <Label htmlFor="workout-days">Days per Week</Label>
          <Select value={workoutDays} onValueChange={setWorkoutDays}>
            <SelectTrigger id="workout-days">
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
          <Label htmlFor="equipment">Available Equipment</Label>
          <Select value={equipment} onValueChange={setEquipment}>
            <SelectTrigger id="equipment">
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
        <Label htmlFor="limitations">Physical Limitations or Injuries</Label>
        <Textarea 
          id="limitations" 
          placeholder="e.g., knee problems, lower back pain, etc. (optional)" 
          value={limitations}
          onChange={(e) => setLimitations(e.target.value)}
        />
      </div>
      
      <Button 
        className="w-full" 
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
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none dark:prose-invert whitespace-pre-line">
              {generatedPlan}
            </div>
            <div className="flex gap-4 mt-6">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigator.clipboard.writeText(generatedPlan)}
              >
                Copy Plan
              </Button>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => window.print()}
              >
                Print Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-muted/30 dark:bg-gray-700/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-foreground/70 dark:text-gray-300">
            {isGenerating ? (
              <div className="space-y-2">
                <div className="text-lg">Creating your workout plan...</div>
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              "Fill in your details to generate a personalized workout plan."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsAIWorkoutPlanner;

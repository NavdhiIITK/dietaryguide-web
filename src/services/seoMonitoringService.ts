import { supabase } from "@/integrations/supabase/client";

export class SEOMonitoringService {
  private readonly targetThemes = [
    "Indian diet and nutrition",
    "Healthy Indian recipes", 
    "Vegan Indian meals",
    "AI nutrition and fitness apps",
    "BMI calculators",
    "ICMR diet guidelines",
    "Personalized AI health assistants"
  ];

  private readonly existingKeywords = [
    "healthy diet", "nutrition guide", "healthy lifestyle", "weight loss tips",
    "balanced diet", "mental health", "healthy Indian recipes", "Indian diet plan",
    "healthy vegan recipes", "BMI calculator", "AI health tools", "diet planner",
    "meal analyzer", "fitness calculator", "moong dal chilla", "vegetable oats upma"
  ];

  // Mock trending keywords (in real implementation, this would call Google Trends API)
  private async fetchTrendingKeywords(): Promise<any[]> {
    // This would be replaced with actual API calls to Google Trends, SEMrush, etc.
    const mockTrendingData = [
      { keyword: "intermittent fasting Indian diet", volume: 8500, trend: "rising" },
      { keyword: "keto Indian recipes", volume: 12000, trend: "rising" },
      { keyword: "diabetes Indian meal plan", volume: 6700, trend: "stable" },
      { keyword: "AI nutrition coach", volume: 4200, trend: "rising" },
      { keyword: "ICMR balanced diet chart", volume: 3800, trend: "rising" },
      { keyword: "vegan protein Indian foods", volume: 5600, trend: "rising" },
      { keyword: "traditional Indian superfoods", volume: 7200, trend: "stable" },
      { keyword: "plant based Indian diet", volume: 9100, trend: "rising" }
    ];
    
    return mockTrendingData;
  }

  private identifyKeywordGaps(trendingKeywords: any[]): string[] {
    return trendingKeywords
      .filter(trending => !this.existingKeywords.some(existing => 
        trending.keyword.toLowerCase().includes(existing.toLowerCase()) ||
        existing.toLowerCase().includes(trending.keyword.toLowerCase())
      ))
      .map(trending => trending.keyword);
  }

  private generateBlogSuggestions(missingKeywords: string[]): any[] {
    const suggestions = [
      {
        title: "Complete Guide to Intermittent Fasting with Indian Foods",
        seoScore: 85,
        reasonTrending: "Growing interest in time-restricted eating combined with traditional Indian meals",
        targetKeywords: ["intermittent fasting Indian diet", "Indian foods for fasting"],
        contentType: "blog"
      },
      {
        title: "15 High-Protein Vegan Indian Foods for Muscle Building",
        seoScore: 78,
        reasonTrending: "Rising plant-based fitness trend and protein awareness in India",
        targetKeywords: ["vegan protein Indian foods", "plant protein India"],
        contentType: "blog"
      },
      {
        title: "ICMR's Latest Diet Guidelines: What Changed in 2024",
        seoScore: 82,
        reasonTrending: "Recent ICMR guideline updates creating search demand",
        targetKeywords: ["ICMR balanced diet chart", "ICMR diet guidelines 2024"],
        contentType: "blog"
      },
      {
        title: "Keto Indian Recipes: 20 Traditional Dishes Made Low-Carb",
        seoScore: 90,
        reasonTrending: "Keto diet popularity surge with demand for Indian adaptations",
        targetKeywords: ["keto Indian recipes", "low carb Indian food"],
        contentType: "blog"
      }
    ];

    return suggestions.filter(suggestion => 
      suggestion.targetKeywords.some(keyword => 
        missingKeywords.some(missing => missing.includes(keyword))
      )
    );
  }

  private generateInstagramSuggestions(): any[] {
    return [
      {
        title: "5-Minute Morning Routine: Indian Superfoods Edition",
        seoScore: 72,
        reasonTrending: "Quick health content and traditional foods trending on social",
        targetKeywords: ["Indian superfoods", "morning routine health"],
        contentType: "instagram"
      },
      {
        title: "Myth vs Reality: Indian Diet Stereotypes Busted",
        seoScore: 68,
        reasonTrending: "Educational content debunking food myths gaining traction",
        targetKeywords: ["Indian diet myths", "healthy Indian food facts"],
        contentType: "instagram"
      },
      {
        title: "AI vs Nutritionist: Who Plans Better Indian Meals?",
        seoScore: 75,
        reasonTrending: "AI comparison content and tech in health trending",
        targetKeywords: ["AI nutrition coach", "AI meal planning"],
        contentType: "instagram"
      }
    ];
  }

  private generateHashtags(): string[] {
    return [
      "#HealthyIndianFood", "#VeganIndia", "#IndianNutrition", "#BMICalculator",
      "#MealPlannerAI", "#ICMRGuidelines", "#IntermittentFastingIndia", 
      "#KetoIndian", "#PlantBasedIndia", "#TraditionalNutrition",
      "#HealthTechIndia", "#AICoach", "#DiabetesDiet", "#WeightLossIndia"
    ];
  }

  async performWeeklyAnalysis(): Promise<any> {
    console.log("Starting weekly SEO analysis...");
    
    try {
      // Fetch trending keywords
      const trendingKeywords = await this.fetchTrendingKeywords();
      console.log("Fetched trending keywords:", trendingKeywords.length);

      // Identify keyword gaps
      const missingKeywords = this.identifyKeywordGaps(trendingKeywords);
      console.log("Missing keywords identified:", missingKeywords.length);

      // Generate content suggestions
      const blogSuggestions = this.generateBlogSuggestions(missingKeywords);
      const instagramSuggestions = this.generateInstagramSuggestions();
      const hashtags = this.generateHashtags();

      const seoSuggestion = {
        date: new Date().toISOString().split('T')[0],
        trending_keywords: trendingKeywords,
        missing_keywords: missingKeywords,
        blog_topic_suggestions: blogSuggestions,
        instagram_caption_ideas: instagramSuggestions,
        hashtags: hashtags,
        weekly_summary: {
          totalKeywordsAnalyzed: trendingKeywords.length,
          newOpportunities: missingKeywords.length,
          highPotentialTopics: blogSuggestions.filter(s => s.seoScore > 80).length
        }
      };

      // Adapt data to fit auto_blogs table structure
      const adaptedData = {
        title: `SEO Analysis - ${seoSuggestion.date}`,
        description: `Weekly SEO analysis with ${missingKeywords.length} opportunities and ${blogSuggestions.length} content suggestions`,
        content: JSON.stringify(seoSuggestion),
        category: "seo-analysis",
        author: "SEO Bot",
        date: seoSuggestion.date,
        is_published: false
      };

      // Save to Supabase auto_blogs table
      const { data, error } = await supabase
        .from('posts')
        .insert([adaptedData]);

      if (error) {
        console.error("Error saving SEO suggestions:", error);
        throw error;
      }

      console.log("SEO analysis completed and saved successfully");
      return seoSuggestion;

    } catch (error) {
      console.error("Weekly SEO analysis failed:", error);
      throw error;
    }
  }

  async getLatestSuggestions(limit: number = 5): Promise<any[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', 'seo-analysis')
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching SEO suggestions:", error);
      return [];
    }

    // Parse the JSON content back to objects
    return (data || []).map(item => {
      try {
        return JSON.parse(item.content);
      } catch (e) {
        console.error("Error parsing SEO suggestion:", e);
        return null;
      }
    }).filter(Boolean);
  }
}

export const seoMonitoringService = new SEOMonitoringService();


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, Lightbulb, Hash, Calendar, BarChart3 } from "lucide-react";
import { seoMonitoringService } from "@/services/seoMonitoringService";
import { toast } from "sonner";

const SEODashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestSuggestions, setLatestSuggestions] = useState<any[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);

  useEffect(() => {
    loadLatestSuggestions();
  }, []);

  const loadLatestSuggestions = async () => {
    try {
      const suggestions = await seoMonitoringService.getLatestSuggestions();
      setLatestSuggestions(suggestions);
      if (suggestions.length > 0) {
        setCurrentAnalysis(suggestions[0]);
      }
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  };

  const runWeeklyAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await seoMonitoringService.performWeeklyAnalysis();
      setCurrentAnalysis(analysis);
      await loadLatestSuggestions();
      toast.success("Weekly SEO analysis completed successfully!");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to complete SEO analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (!currentAnalysis) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <BarChart3 className="h-6 w-6" />
              SEO Monitoring Dashboard
            </CardTitle>
            <CardDescription>
              Monitor trending keywords and generate content suggestions for DietaryGuide.in
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">No analysis data available</p>
            <Button onClick={runWeeklyAnalysis} disabled={isAnalyzing} className="mx-auto">
              {isAnalyzing ? "Analyzing..." : "Run Weekly Analysis"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            SEO Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground">
            Backend SEO analysis for DietaryGuide.in - Last updated: {currentAnalysis.date}
          </p>
        </div>
        <Button onClick={runWeeklyAnalysis} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Run New Analysis"}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Keywords Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currentAnalysis.weekly_summary.totalKeywordsAnalyzed}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              New Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currentAnalysis.weekly_summary.newOpportunities}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              High-Potential Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currentAnalysis.weekly_summary.highPotentialTopics}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="blog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blog">Blog Topics</TabsTrigger>
          <TabsTrigger value="instagram">Instagram Ideas</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Topic Suggestions</CardTitle>
              <CardDescription>High-impact blog topics based on trending keywords</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentAnalysis.blog_topic_suggestions.map((suggestion: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{suggestion.title}</h3>
                    <Badge className={`${getSeoScoreColor(suggestion.seoScore)} text-white`}>
                      {suggestion.seoScore}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.reasonTrending}</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.targetKeywords.map((keyword: string, kidx: number) => (
                      <Badge key={kidx} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Post Ideas</CardTitle>
              <CardDescription>Engaging social media content suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentAnalysis.instagram_caption_ideas.map((idea: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{idea.title}</h3>
                    <Badge className={`${getSeoScoreColor(idea.seoScore)} text-white`}>
                      {idea.seoScore}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{idea.reasonTrending}</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.targetKeywords.map((keyword: string, kidx: number) => (
                      <Badge key={kidx} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Trending Keywords</CardTitle>
                <CardDescription>Popular keywords in your niche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentAnalysis.trending_keywords.slice(0, 8).map((keyword: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{keyword.keyword}</span>
                      <Badge variant={keyword.trend === 'rising' ? 'default' : 'secondary'}>
                        {keyword.volume?.toLocaleString()} vol
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Missing Keywords</CardTitle>
                <CardDescription>Keyword opportunities not yet covered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentAnalysis.missing_keywords.slice(0, 8).map((keyword: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="text-sm">{keyword}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hashtags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Recommended Hashtags
              </CardTitle>
              <CardDescription>Trending hashtags for social media posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentAnalysis.hashtags.map((hashtag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEODashboard;

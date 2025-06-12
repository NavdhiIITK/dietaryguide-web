
export interface TrendingKeyword {
  keyword: string;
  searchVolume: number;
  trend: 'rising' | 'stable' | 'declining';
  competition: 'low' | 'medium' | 'high';
  region: string;
}

export interface ContentSuggestion {
  title: string;
  seoScore: number;
  reasonTrending: string;
  targetKeywords: string[];
  contentType: 'blog' | 'instagram' | 'recipe' | 'tool';
}

export interface SEOSuggestion {
  date: string;
  trending_keywords: TrendingKeyword[];
  missing_keywords: string[];
  blog_topic_suggestions: ContentSuggestion[];
  instagram_caption_ideas: ContentSuggestion[];
  hashtags: string[];
  weekly_summary: {
    totalKeywordsAnalyzed: number;
    newOpportunities: number;
    highPotentialTopics: number;
  };
}

export interface KeywordGap {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  opportunity: number;
  currentRanking?: number;
}

import { supabase } from '@/integrations/supabase/client';

// Keywords that indicate irrelevant tech/IoT/blockchain content
const IRRELEVANT_KEYWORDS = [
  'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'crypto', 'nft', 'defi',
  'iot', 'internet of things', 'smart home', 'arduino', 'raspberry pi',
  'machine learning', 'artificial intelligence', 'ai', 'deep learning',
  'software development', 'programming', 'coding', 'javascript', 'python', 'react',
  'web development', 'app development', 'mobile app', 'android', 'ios',
  'cloud computing', 'aws', 'azure', 'google cloud', 'devops',
  'cybersecurity', 'hacking', 'security', 'firewall', 'malware',
  'database', 'sql', 'nosql', 'mongodb', 'postgresql',
  'technology', 'tech', 'startup', 'business', 'marketing',
  'social media', 'facebook', 'twitter', 'instagram', 'linkedin',
  'gaming', 'video games', 'esports', 'streaming',
  'automotive', 'cars', 'electric vehicle', 'tesla',
  'finance', 'investment', 'trading', 'stock market',
  'real estate', 'property', 'housing',
  'travel', 'tourism', 'vacation', 'hotel'
];

// Keywords that indicate relevant health/nutrition content
const RELEVANT_KEYWORDS = [
  'nutrition', 'diet', 'health', 'fitness', 'wellness', 'food',
  'protein', 'carbohydrate', 'fat', 'vitamin', 'mineral',
  'weight loss', 'weight gain', 'muscle building', 'fat loss',
  'meal plan', 'recipe', 'cooking', 'indian food', 'vegetarian', 'vegan',
  'diabetes', 'heart health', 'blood pressure', 'cholesterol',
  'exercise', 'workout', 'yoga', 'meditation', 'mental health',
  'supplement', 'probiotic', 'antioxidant', 'fiber',
  'calorie', 'metabolism', 'digestion', 'gut health',
  'organic', 'natural', 'whole food', 'superfood',
  'hydration', 'water', 'detox', 'cleanse'
];

interface BlogAnalysis {
  id: string;
  title: string;
  category: string | null;
  author: string | null;
  description: string;
  content: string;
  isRelevant: boolean;
  relevanceScore: number;
  reasons: string[];
}

export async function analyzeBlogPosts(): Promise<BlogAnalysis[]> {
  console.log('Starting blog post analysis...');
  
  const { data: posts, error } = await supabase
    .from('auto_blogs')
    .select('id, title, category, author, description, content')
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching posts for analysis:', error);
    throw error;
  }

  const analysis: BlogAnalysis[] = posts.map(post => {
    const textToAnalyze = `${post.title} ${post.description} ${post.content || ''}`.toLowerCase();
    
    let relevanceScore = 0;
    const reasons: string[] = [];
    
    // Check for relevant keywords (positive score)
    RELEVANT_KEYWORDS.forEach(keyword => {
      if (textToAnalyze.includes(keyword)) {
        relevanceScore += 2;
        reasons.push(`Contains relevant keyword: ${keyword}`);
      }
    });
    
    // Check for irrelevant keywords (negative score)
    IRRELEVANT_KEYWORDS.forEach(keyword => {
      if (textToAnalyze.includes(keyword)) {
        relevanceScore -= 3;
        reasons.push(`Contains irrelevant keyword: ${keyword}`);
      }
    });
    
    // Category-based scoring
    if (post.category) {
      const categoryLower = post.category.toLowerCase();
      if (['nutrition', 'diet', 'health', 'fitness', 'wellness', 'recipes'].includes(categoryLower)) {
        relevanceScore += 5;
        reasons.push(`Relevant category: ${post.category}`);
      } else if (['technology', 'tech', 'blockchain', 'iot', 'ai', 'business'].includes(categoryLower)) {
        relevanceScore -= 5;
        reasons.push(`Irrelevant category: ${post.category}`);
      }
    }
    
    // Author-based scoring (if not authored by the user)
    if (post.author && !['Team DietaryGuide', 'Dietary Guide', 'DietaryGuide'].includes(post.author)) {
      relevanceScore -= 1;
      reasons.push(`External author: ${post.author}`);
    }
    
    const isRelevant = relevanceScore > 0;
    
    return {
      id: post.id,
      title: post.title,
      category: post.category,
      author: post.author,
      description: post.description,
      content: post.content || '',
      isRelevant,
      relevanceScore,
      reasons
    };
  });

  console.log(`Analysis complete. Found ${analysis.length} total posts.`);
  console.log(`Relevant posts: ${analysis.filter(p => p.isRelevant).length}`);
  console.log(`Irrelevant posts: ${analysis.filter(p => !p.isRelevant).length}`);
  
  return analysis;
}

export async function getCleanupSummary(): Promise<{
  totalPosts: number;
  relevantPosts: number;
  irrelevantPosts: number;
  postsToDelete: BlogAnalysis[];
  postsToKeep: BlogAnalysis[];
}> {
  const analysis = await analyzeBlogPosts();
  
  const postsToDelete = analysis.filter(post => !post.isRelevant);
  const postsToKeep = analysis.filter(post => post.isRelevant);
  
  return {
    totalPosts: analysis.length,
    relevantPosts: postsToKeep.length,
    irrelevantPosts: postsToDelete.length,
    postsToDelete,
    postsToKeep
  };
}

export async function deleteIrrelevantPosts(dryRun: boolean = true): Promise<{
  deletedCount: number;
  deletedIds: string[];
  errors: string[];
}> {
  const summary = await getCleanupSummary();
  const postsToDelete = summary.postsToDelete;
  
  console.log(`${dryRun ? 'DRY RUN: Would delete' : 'Deleting'} ${postsToDelete.length} irrelevant posts...`);
  
  if (dryRun) {
    console.log('Posts that would be deleted:');
    postsToDelete.forEach(post => {
      console.log(`- ${post.title} (Score: ${post.relevanceScore}, Reasons: ${post.reasons.join(', ')})`);
    });
    
    return {
      deletedCount: postsToDelete.length,
      deletedIds: postsToDelete.map(p => p.id),
      errors: []
    };
  }
  
  const deletedIds: string[] = [];
  const errors: string[] = [];
  
  // Delete in batches to avoid overwhelming the database
  const batchSize = 10;
  for (let i = 0; i < postsToDelete.length; i += batchSize) {
    const batch = postsToDelete.slice(i, i + batchSize);
    const batchIds = batch.map(post => post.id);
    
    try {
      const { error } = await supabase
        .from('auto_blogs')
        .delete()
        .in('id', batchIds);
      
      if (error) {
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        deletedIds.push(...batchIds);
        console.log(`Deleted batch ${i / batchSize + 1}/${Math.ceil(postsToDelete.length / batchSize)}`);
      }
    } catch (error) {
      errors.push(`Batch ${i / batchSize + 1}: ${error}`);
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Cleanup complete. Deleted ${deletedIds.length} posts with ${errors.length} errors.`);
  
  return {
    deletedCount: deletedIds.length,
    deletedIds,
    errors
  };
}

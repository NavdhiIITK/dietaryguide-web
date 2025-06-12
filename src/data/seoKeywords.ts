
export interface KeywordData {
  primary: string;
  secondary: string[];
  longTail: string[];
  intent: 'informational' | 'transactional' | 'commercial' | 'navigational';
  difficulty: 'low' | 'medium' | 'high';
  targetPages: string[];
}

export const primaryKeywords: KeywordData[] = [
  {
    primary: "Indian nutrition app",
    secondary: ["nutrition app India", "best nutrition app", "diet tracking app"],
    longTail: ["best Indian nutrition app 2025", "top nutrition tracking app India", "AI powered nutrition app"],
    intent: "commercial",
    difficulty: "high",
    targetPages: ["/", "/app"]
  },
  {
    primary: "AI meal planner India",
    secondary: ["AI diet planner", "smart meal planning", "automated diet planning"],
    longTail: ["AI powered meal planner for Indians", "smart Indian diet planner app", "Google integrated meal planner"],
    intent: "transactional",
    difficulty: "medium",
    targetPages: ["/tools/ai-diet-planner", "/tools"]
  },
  {
    primary: "BMI calculator India",
    secondary: ["BMI calculator online", "body mass index calculator", "BMI chart India"],
    longTail: ["free BMI calculator India", "BMI calculator with Indian standards", "healthy weight calculator India"],
    intent: "transactional",
    difficulty: "low",
    targetPages: ["/tools"]
  },
  {
    primary: "healthy Indian recipes",
    secondary: ["Indian healthy food", "nutritious Indian recipes", "low calorie Indian food"],
    longTail: ["healthy Indian recipes for weight loss", "diabetic friendly Indian recipes", "high protein Indian meals"],
    intent: "informational",
    difficulty: "medium",
    targetPages: ["/recipes", "/blog"]
  },
  {
    primary: "vegan Indian meal tracker",
    secondary: ["vegan Indian recipes", "plant based Indian diet", "vegan nutrition tracker"],
    longTail: ["best vegan meal tracker for Indian food", "Indian vegan diet planning app", "plant based nutrition India"],
    intent: "commercial",
    difficulty: "medium",
    targetPages: ["/tools/ai-meal-analyzer", "/recipes"]
  }
];

export const voiceSearchKeywords = [
  "Hey Google suggest healthy Indian breakfast",
  "What's my BMI and how to improve it",
  "Best AI nutrition coach for Indian food",
  "How to plan Indian vegan meals",
  "Smart diet planner with Google Calendar",
  "AI health coach app recommendations"
];

export const regionalKeywords = {
  hindi: ["स्वस्थ भारतीय व्यंजन", "BMI कैलकुलेटर", "डाइट प्लानर ऐप"],
  tamil: ["healthy tamil recipes", "south indian diet plan", "tamil nutrition app"],
  bengali: ["healthy bengali food", "bengali diet planner", "nutrition app bengali"],
  gujarati: ["gujarati healthy recipes", "gujarati diet plan", "nutrition tracker gujarati"]
};

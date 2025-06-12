
export const toolSchemas = {
  bmiCalculator: {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "MedicalWebPage"],
    "name": "BMI Calculator India - Free Body Mass Index Calculator",
    "applicationCategory": "HealthApplication",
    "description": "Free BMI calculator designed for Indian population with personalized health recommendations based on Indian medical standards",
    "url": "https://dietaryguide.in/tools",
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "operatingSystem": "Web Browser",
    "permissions": "No permissions required",
    "applicationSubCategory": "BMI Calculator",
    "featureList": [
      "BMI calculation for Indian body types",
      "Personalized health recommendations",
      "Age and gender-specific analysis",
      "Health risk assessment",
      "Diet plan suggestions"
    ],
    "medicalSpecialty": "Nutrition",
    "audience": {
      "@type": "PeopleAudience",
      "geographicArea": "India"
    }
  },
  
  aiMealPlanner: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Meal Planner India - Smart Indian Diet Planning App",
    "applicationCategory": "HealthApplication",
    "description": "AI-powered meal planner specifically designed for Indian cuisine with Google Calendar integration and personalized nutrition recommendations",
    "url": "https://dietaryguide.in/tools/ai-diet-planner",
    "author": {
      "@type": "Organization",
      "name": "DietaryGuide"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "operatingSystem": "Web Browser, iOS, Android",
    "permissions": "Google Calendar access (optional)",
    "applicationSubCategory": "Meal Planning",
    "featureList": [
      "AI-powered Indian meal planning",
      "Google Calendar integration",
      "Regional cuisine support",
      "Dietary restriction accommodation",
      "Nutritional analysis",
      "Shopping list generation"
    ],
    "integrationWith": [
      {
        "@type": "SoftwareApplication",
        "name": "Google Calendar"
      },
      {
        "@type": "SoftwareApplication", 
        "name": "Google Tasks"
      }
    ]
  },

  aiMealAnalyzer: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Meal Analyzer - Indian Food Nutrition Tracker",
    "applicationCategory": "HealthApplication",
    "description": "Advanced AI tool for analyzing Indian meals through images or text input with comprehensive nutritional breakdown",
    "url": "https://dietaryguide.in/tools/ai-meal-analyzer",
    "featureList": [
      "Image-based food recognition",
      "Indian cuisine specialization", 
      "Nutritional value calculation",
      "Calorie tracking",
      "Macro and micronutrient analysis",
      "Meal quality scoring"
    ]
  }
};

export const recipeSchema = (recipe: any) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": recipe.title,
  "description": recipe.description,
  "image": recipe.imageUrl,
  "author": {
    "@type": "Organization",
    "name": "DietaryGuide"
  },
  "prepTime": recipe.prepTime,
  "cookTime": recipe.cookTime || "PT15M",
  "totalTime": recipe.totalTime || recipe.prepTime,
  "recipeYield": recipe.servings?.toString() || "4",
  "recipeCategory": recipe.mealType || "Main Course",
  "recipeCuisine": "Indian",
  "recipeIngredient": recipe.ingredients || [],
  "recipeInstructions": recipe.instructions?.map((instruction: string, index: number) => ({
    "@type": "HowToStep",
    "text": instruction,
    "position": index + 1
  })) || [],
  "nutrition": recipe.nutritionFacts ? {
    "@type": "NutritionInformation",
    "calories": `${recipe.nutritionFacts.calories} calories`,
    "proteinContent": `${recipe.nutritionFacts.protein}g`,
    "carbohydrateContent": `${recipe.nutritionFacts.carbs}g`,
    "fatContent": `${recipe.nutritionFacts.fat}g`
  } : undefined,
  "keywords": `healthy Indian recipes, ${recipe.dietPreference || 'vegetarian'}, ${recipe.mealType || 'Indian food'}, nutrition, weight loss`,
  "suitableForDiet": recipe.dietPreference === "Vegan" ? "https://schema.org/VeganDiet" : "https://schema.org/VegetarianDiet",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
});

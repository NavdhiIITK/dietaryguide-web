export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime?: string;
  difficulty: string;
  servings: number;
  mealType: string;
  dietPreference: string;
  imageUrl: string;
  isTrending?: boolean;
  ingredients: string[];
  instructions: string[];
  nutritionFacts?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  tips?: string[];
}

export const allIndianRecipes: Recipe[] = [
  {
    id: "moong-dal-chilla",
    title: "Moong Dal Chilla",
    description: "A protein-rich, savory pancake made from split yellow moong dal, perfect for weight loss breakfast with high protein and low calories.",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Moong_Dal_Chilla.png?raw=true",
    isTrending: true,
    ingredients: [
      "1/2 cup split yellow moong dal (soaked for 2-3 hours)",
      "1 green chili, finely chopped",
      "1 inch piece ginger, minced",
      "1/4 teaspoon salt",
      "2 tablespoons fresh coriander leaves, chopped",
      "Water as needed for batter consistency",
      "1 teaspoon oil for cooking"
    ],
    instructions: [
      "Drain and rinse the soaked moong dal thoroughly.",
      "In a blender, combine dal, green chili, ginger, and salt with 2-3 tablespoons water.",
      "Blend to a smooth, thick batter consistency. Add more water if needed.",
      "Transfer to a bowl and mix in chopped coriander leaves.",
      "Heat a non-stick pan over medium heat and lightly grease with oil.",
      "Pour 1/4 cup batter and spread thin like a pancake using the back of a spoon.",
      "Cook for 2-3 minutes until bottom is golden brown and crispy.",
      "Flip carefully and cook the other side for 2 minutes until golden.",
      "Serve hot with green chutney or plain yogurt."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "10g",
      carbs: "22g",
      fat: "6g"
    },
    tips: [
      "Soak dal for at least 2-3 hours for better grinding",
      "Keep batter thick for crispy chillas",
      "Add vegetables like onions or tomatoes for extra nutrition"
    ]
  },
  {
    id: "vegetable-oats-upma",
    title: "Vegetable Oats Upma",
    description: "A healthy and filling breakfast made with rolled oats and colorful vegetables, rich in fiber and perfect for sustainable weight management.",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Vegetable_Oats_Upma.png?raw=true",
    ingredients: [
      "1/2 cup rolled oats",
      "1/4 cup carrots, finely chopped",
      "1/4 cup green peas (fresh or frozen)",
      "1 teaspoon mustard seeds",
      "8-10 curry leaves",
      "1 tablespoon olive oil or ghee",
      "1 cup water",
      "Salt to taste",
      "1/4 teaspoon turmeric powder",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Dry roast oats in a pan for 2-3 minutes until lightly golden and aromatic. Set aside.",
      "Heat oil in the same pan, add mustard seeds and let them splutter.",
      "Add curry leaves and sauté for 30 seconds until fragrant.",
      "Add chopped carrots and green peas, cook for 3-4 minutes until tender.",
      "Add turmeric powder and mix well with vegetables.",
      "Add the roasted oats and mix well with vegetables and spices.",
      "Pour water gradually, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 5-7 minutes until water is absorbed.",
      "Stir occasionally to prevent sticking. Garnish with fresh coriander and serve warm."
    ],
    nutritionFacts: {
      calories: "210 kcal",
      protein: "6g",
      carbs: "34g",
      fat: "5g"
    },
    tips: [
      "Roast oats properly for better texture and taste",
      "Add more vegetables like beans or bell peppers for variety",
      "Adjust water quantity for desired consistency"
    ]
  },
  {
    id: "besan-cheela-spinach",
    title: "Besan Cheela with Spinach",
    description: "A nutritious gram flour pancake loaded with iron-rich spinach, providing excellent protein and essential nutrients for healthy weight loss.",
    prepTime: "10 min",
    cookTime: "12 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Besan_Cheela_with_Sp.png?raw=true",
    ingredients: [
      "1/2 cup besan (gram flour)",
      "1 cup fresh spinach leaves, finely chopped",
      "1 green chili, minced",
      "1/4 teaspoon ajwain (carom seeds)",
      "1/4 teaspoon salt",
      "1/4 teaspoon turmeric powder",
      "Water as needed for batter",
      "1 teaspoon oil for cooking"
    ],
    instructions: [
      "In a mixing bowl, combine besan, chopped spinach, green chili, ajwain, salt, and turmeric.",
      "Gradually add water while whisking to form a smooth, pourable batter without lumps.",
      "Let the batter rest for 5 minutes to allow flavors to meld.",
      "Heat a non-stick pan over medium heat and grease lightly with oil.",
      "Pour 1/4 cup batter and spread thin in a circular motion from center outward.",
      "Cook for 2-3 minutes until the bottom is golden and has brown spots.",
      "Flip carefully and cook the other side for 2 minutes until crispy.",
      "Repeat with remaining batter, adding oil as needed.",
      "Serve hot with mint chutney or fresh yogurt."
    ],
    nutritionFacts: {
      calories: "170 kcal",
      protein: "8g",
      carbs: "20g",
      fat: "6g"
    },
    tips: [
      "Chop spinach very finely for even distribution",
      "Keep batter medium-thick for best results",
      "Add grated ginger for extra flavor"
    ]
  },
  {
    id: "vegetable-dalia",
    title: "Vegetable Dalia (Cracked Wheat)",
    description: "A wholesome breakfast made with nutrient-dense cracked wheat and colorful vegetables, high in fiber and perfect for sustained energy and weight management.",
    prepTime: "10 min",
    cookTime: "20 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1/2 cup dalia (cracked wheat)",
      "1/4 cup mixed vegetables (carrot, beans, peas)",
      "1 teaspoon cumin seeds",
      "1 tablespoon olive oil or ghee",
      "1.5 cups water",
      "Salt to taste",
      "1/4 teaspoon turmeric powder",
      "Fresh herbs for garnish"
    ],
    instructions: [
      "Dry roast dalia in a pan for 3-4 minutes until lightly golden and aromatic.",
      "Set aside and let cool completely.",
      "Heat oil in the same pan, add cumin seeds and let them crackle.",
      "Add chopped vegetables and sauté for 5 minutes until slightly tender.",
      "Add turmeric powder and mix well with vegetables.",
      "Add the roasted dalia and mix well with vegetables and spices.",
      "Pour water gradually, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 10-12 minutes until dalia is soft and water is absorbed.",
      "Stir occasionally and add more water if needed. Garnish with fresh herbs and serve hot."
    ],
    nutritionFacts: {
      calories: "190 kcal",
      protein: "5g",
      carbs: "30g",
      fat: "4g"
    },
    tips: [
      "Roast dalia until aromatic for better flavor",
      "Use seasonal vegetables for variety",
      "Cook on low heat to prevent burning"
    ]
  },
  {
    id: "sprouted-moong-salad",
    title: "Sprouted Moong Salad",
    description: "A refreshing and protein-packed raw salad made with nutritious sprouted mung beans, perfect for a light yet filling breakfast that aids digestion.",
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Sprouted_Moong_Salad%20(1).png?raw=true",
    ingredients: [
      "1 cup sprouted moong beans (fresh)",
      "1 small onion, finely chopped",
      "1 medium tomato, chopped",
      "2 tablespoons fresh lemon juice",
      "1/4 teaspoon salt",
      "1/4 teaspoon red chili powder",
      "1 tablespoon fresh coriander, chopped",
      "1/4 teaspoon chaat masala (optional)"
    ],
    instructions: [
      "Wash the sprouted moong beans thoroughly and drain completely.",
      "In a large bowl, combine sprouts with finely chopped onion and tomato.",
      "Add fresh lemon juice, salt, and red chili powder.",
      "Toss everything well to combine and coat evenly.",
      "Add chopped coriander and chaat masala if using.",
      "Let it sit for 5 minutes for flavors to meld together.",
      "Taste and adjust seasoning as needed.",
      "Serve immediately for best texture and freshness."
    ],
    nutritionFacts: {
      calories: "120 kcal",
      protein: "9g",
      carbs: "18g",
      fat: "1g"
    },
    tips: [
      "Use fresh sprouts for best taste and nutrition",
      "Add cucumber for extra crunch",
      "Serve immediately to maintain freshness"
    ]
  },
  {
    id: "ragi-porridge",
    title: "Ragi Porridge",
    description: "A calcium-rich and gluten-free porridge made from finger millet flour, perfect for bone health and providing sustained energy for weight management.",
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Ragi_Porridge_.png?raw=true",
    ingredients: [
      "3 tablespoons ragi flour (finger millet flour)",
      "1 cup water or low-fat milk",
      "1 tablespoon jaggery or salt to taste",
      "1/4 teaspoon cardamom powder (for sweet version)",
      "1 teaspoon ghee (optional)",
      "Chopped nuts for garnish (optional)"
    ],
    instructions: [
      "In a small bowl, mix ragi flour with 2-3 tablespoons of water to form a smooth paste without lumps.",
      "Heat the remaining water or milk in a saucepan over medium heat.",
      "When it starts to simmer, slowly add the ragi paste while stirring continuously to prevent lumps.",
      "Cook on low heat for 5-7 minutes, stirring constantly until mixture thickens to porridge consistency.",
      "For sweet version: Add jaggery and cardamom powder, cook for 2 more minutes.",
      "For savory version: Add salt and a pinch of turmeric, cook for 2 more minutes.",
      "Add ghee if desired and mix well.",
      "Garnish with chopped nuts if using and serve warm."
    ],
    nutritionFacts: {
      calories: "160 kcal",
      protein: "4g",
      carbs: "28g",
      fat: "4g"
    },
    tips: [
      "Make a smooth paste to avoid lumps",
      "Stir continuously while cooking",
      "Adjust consistency with water or milk"
    ]
  },
  {
    id: "millet-idli-coconut-chutney",
    title: "Millet Idli with Coconut Chutney",
    description: "Healthy steamed fermented cakes made from nutritious millet and lentils, served with fresh coconut chutney for a complete protein breakfast.",
    prepTime: "20 min",
    cookTime: "15 min",
    difficulty: "Medium",
    servings: 4,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isTrending: true,
    ingredients: [
      "1 cup millet (soaked overnight)",
      "1/4 cup urad dal (soaked overnight)",
      "Salt to taste",
      "1/2 cup fresh grated coconut",
      "2-3 green chilies",
      "1 inch ginger piece",
      "10-12 curry leaves",
      "1 teaspoon mustard seeds",
      "Water as needed"
    ],
    instructions: [
      "Drain and grind soaked millet to a smooth paste with minimal water.",
      "Similarly, grind urad dal to a fluffy, light batter with minimal water.",
      "Mix both batters thoroughly, add salt, and ferment for 8-12 hours until doubled.",
      "Grease idli molds with oil and pour batter into each cavity, filling 3/4 full.",
      "Steam in an idli steamer or pressure cooker for 10-15 minutes until cooked through.",
      "For chutney: Grind coconut, green chilies, ginger with little water to smooth paste.",
      "Heat oil, add mustard seeds and curry leaves, pour over chutney.",
      "Let idlis cool for 2-3 minutes before removing from molds.",
      "Serve hot idlis with fresh coconut chutney."
    ],
    nutritionFacts: {
      calories: "220 kcal",
      protein: "7g",
      carbs: "32g",
      fat: "7g"
    },
    tips: [
      "Fermentation is key for soft idlis",
      "Use proper water ratio for grinding",
      "Steam on medium heat to avoid overcooking"
    ]
  },
  {
    id: "poha-vegetables",
    title: "Poha with Vegetables",
    description: "A light and flavorful breakfast made with flattened rice and colorful vegetables, seasoned with aromatic spices for a satisfying yet healthy meal.",
    prepTime: "10 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/gpt-image-1_Poha_with_Vegetables.png?raw=true",
    ingredients: [
      "1 cup thick poha (flattened rice)",
      "1 medium onion, finely chopped",
      "1/4 cup green peas",
      "1 teaspoon mustard seeds",
      "1/4 teaspoon turmeric powder",
      "1 tablespoon oil",
      "8-10 curry leaves",
      "2 tablespoons fresh lemon juice",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Rinse poha in a fine mesh colander until soft but not mushy. Drain well and set aside.",
      "Heat oil in a wide pan, add mustard seeds and let them splutter.",
      "Add curry leaves and chopped onion, sauté until onion becomes translucent.",
      "Add green peas and cook for 2-3 minutes until tender.",
      "Add turmeric powder and mix well with vegetables.",
      "Add the drained poha and salt, mix gently to avoid breaking.",
      "Cook for 2-3 minutes on low heat, stirring occasionally.",
      "Add fresh lemon juice and mix gently.",
      "Garnish with fresh coriander and serve hot immediately."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "4g",
      carbs: "30g",
      fat: "5g"
    },
    tips: [
      "Don't over-rinse poha to avoid mushiness",
      "Add vegetables of your choice",
      "Lemon juice adds freshness and vitamin C"
    ]
  },
  {
    id: "tofu-bhurji",
    title: "Tofu Bhurji",
    description: "A protein-rich plant-based scrambled tofu dish spiced with traditional Indian flavors, perfect for vegans seeking a healthy high-protein breakfast option.",
    prepTime: "10 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://github.com/qubicle232/dietaryguide/blob/DG-WEBSITE/imagen-4.0-generate-preview-05-20_Tofu_Bhurji.png?raw=true",
    ingredients: [
      "100g firm tofu, crumbled",
      "1 medium onion, finely chopped",
      "1 medium tomato, chopped",
      "1/4 teaspoon turmeric powder",
      "1/4 teaspoon red chili powder",
      "1 tablespoon olive oil",
      "8-10 curry leaves",
      "Salt to taste",
      "Fresh coriander leaves for garnish",
      "1/4 teaspoon garam masala"
    ],
    instructions: [
      "Heat oil in a non-stick pan over medium heat.",
      "Add curry leaves and let them splutter for aromatic release.",
      "Add chopped onion and sauté until golden brown and caramelized.",
      "Add chopped tomato and cook until soft, mushy, and oil separates.",
      "Add turmeric powder, chili powder, garam masala, and salt. Mix well.",
      "Add crumbled tofu and mix gently with the spice mixture.",
      "Cook for 5-7 minutes, stirring occasionally to prevent sticking.",
      "The tofu should absorb the flavors and turn slightly golden.",
      "Garnish with fresh coriander and serve hot with toast or roti."
    ],
    nutritionFacts: {
      calories: "150 kcal",
      protein: "12g",
      carbs: "5g",
      fat: "9g"
    },
    tips: [
      "Use firm tofu for better texture",
      "Don't over-mix to maintain texture",
      "Add vegetables like bell peppers for extra nutrition"
    ]
  },
  {
    id: "spinach-banana-flaxseed-smoothie",
    title: "Spinach-Banana-Flaxseed Smoothie",
    description: "A nutrient-dense green smoothie packed with vitamins, minerals, and omega-3 fatty acids from flaxseeds, perfect for a quick healthy breakfast on-the-go.",
    prepTime: "5 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isTrending: true,
    ingredients: [
      "1 cup fresh spinach leaves, washed",
      "1 small ripe banana, peeled",
      "1 cup unsweetened almond milk or yogurt",
      "1 tablespoon ground flaxseeds",
      "1 teaspoon honey or maple syrup (optional)",
      "Ice cubes as needed",
      "1/4 teaspoon vanilla extract (optional)"
    ],
    instructions: [
      "Wash spinach leaves thoroughly and remove any thick stems or damaged leaves.",
      "Peel and chop the banana into small chunks for easier blending.",
      "Add spinach, banana, almond milk, and ground flaxseeds to a high-speed blender.",
      "Add honey or maple syrup if you prefer extra sweetness.",
      "Add vanilla extract if using for enhanced flavor.",
      "Blend on high speed for 1-2 minutes until completely smooth and creamy.",
      "Add ice cubes if you prefer a colder, thicker smoothie and blend again.",
      "Pour into a tall glass and serve immediately for best taste and nutrition."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "5g",
      carbs: "25g",
      fat: "6g"
    },
    tips: [
      "Use frozen banana for thicker consistency",
      "Soak flaxseeds overnight for better absorption",
      "Add protein powder for extra protein boost"
    ]
  }
];

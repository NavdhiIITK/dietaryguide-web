
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
    description: "A protein-rich, savory pancake made from split yellow moong dal, perfect for weight loss breakfast.",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isTrending: true,
    ingredients: [
      "1/2 cup split yellow moong dal (soaked for 2-3 hours)",
      "1 green chili, chopped",
      "1 inch piece ginger, minced",
      "1/4 teaspoon salt",
      "2 tablespoons fresh coriander, chopped",
      "Water as needed",
      "Oil for cooking"
    ],
    instructions: [
      "Drain and rinse the soaked moong dal.",
      "In a blender, combine dal, green chili, ginger, and salt with 2-3 tablespoons water.",
      "Blend to a smooth, thick batter. Add more water if needed.",
      "Transfer to a bowl and mix in chopped coriander.",
      "Heat a non-stick pan over medium heat and lightly grease with oil.",
      "Pour 1/4 cup batter and spread thin like a pancake.",
      "Cook for 2-3 minutes until bottom is golden brown.",
      "Flip and cook the other side for 2 minutes until golden.",
      "Serve hot with green chutney or yogurt."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "10g",
      carbs: "22g",
      fat: "6g"
    }
  },
  {
    id: "vegetable-oats-upma",
    title: "Vegetable Oats Upma",
    description: "A healthy and filling breakfast made with rolled oats and mixed vegetables, perfect for weight management.",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1/2 cup rolled oats",
      "1/4 cup carrots, finely chopped",
      "1/4 cup green peas",
      "1 teaspoon mustard seeds",
      "8-10 curry leaves",
      "1 tablespoon oil",
      "1 cup water",
      "Salt to taste"
    ],
    instructions: [
      "Dry roast oats in a pan for 2-3 minutes until lightly golden. Set aside.",
      "Heat oil in the same pan, add mustard seeds and let them splutter.",
      "Add curry leaves, sauté for 30 seconds.",
      "Add chopped carrots and peas, cook for 3-4 minutes until tender.",
      "Add the roasted oats and mix well with vegetables.",
      "Pour water, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 5-7 minutes until water is absorbed.",
      "Stir occasionally to prevent sticking.",
      "Serve warm."
    ],
    nutritionFacts: {
      calories: "210 kcal",
      protein: "6g",
      carbs: "34g",
      fat: "5g"
    }
  },
  {
    id: "besan-cheela-spinach",
    title: "Besan Cheela with Spinach",
    description: "A nutritious gram flour pancake loaded with spinach, rich in protein and iron for healthy weight loss.",
    prepTime: "10 min",
    cookTime: "12 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1/2 cup besan (gram flour)",
      "1 cup fresh spinach, finely chopped",
      "1 green chili, minced",
      "1/4 teaspoon ajwain (carom seeds)",
      "1/4 teaspoon salt",
      "Water as needed",
      "Oil for cooking"
    ],
    instructions: [
      "In a mixing bowl, combine besan, chopped spinach, green chili, ajwain, and salt.",
      "Gradually add water while whisking to form a smooth, pourable batter.",
      "Let the batter rest for 5 minutes.",
      "Heat a non-stick pan over medium heat and grease lightly with oil.",
      "Pour 1/4 cup batter and spread thin in a circular motion.",
      "Cook for 2-3 minutes until the bottom is golden and has brown spots.",
      "Flip carefully and cook the other side for 2 minutes.",
      "Repeat with remaining batter.",
      "Serve hot with mint chutney or yogurt."
    ],
    nutritionFacts: {
      calories: "170 kcal",
      protein: "8g",
      carbs: "20g",
      fat: "6g"
    }
  },
  {
    id: "vegetable-dalia",
    title: "Vegetable Dalia (Cracked Wheat)",
    description: "A wholesome breakfast made with roasted cracked wheat and vegetables, high in fiber and perfect for weight management.",
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
      "1 tablespoon oil",
      "1.5 cups water",
      "Salt to taste"
    ],
    instructions: [
      "Dry roast dalia in a pan for 3-4 minutes until lightly golden and aromatic.",
      "Set aside and let cool.",
      "Heat oil in the same pan, add cumin seeds and let them crackle.",
      "Add chopped vegetables, sauté for 5 minutes.",
      "Add the roasted dalia and mix well with vegetables.",
      "Pour water, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 10-12 minutes until dalia is soft.",
      "Stir occasionally and add more water if needed.",
      "Serve hot."
    ],
    nutritionFacts: {
      calories: "190 kcal",
      protein: "5g",
      carbs: "30g",
      fat: "4g"
    }
  },
  {
    id: "sprouted-moong-salad",
    title: "Sprouted Moong Salad",
    description: "A refreshing and protein-rich salad made with sprouted mung beans, perfect for a light and healthy breakfast.",
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1 cup sprouted moong beans",
      "1 small onion, finely chopped",
      "1 medium tomato, chopped",
      "2 tablespoons lemon juice",
      "1/4 teaspoon salt",
      "1/4 teaspoon chili powder"
    ],
    instructions: [
      "Wash the sprouted moong beans thoroughly and drain.",
      "In a large bowl, combine sprouts with chopped onion and tomato.",
      "Add lemon juice, salt, and chili powder.",
      "Toss everything well to combine.",
      "Let it sit for 5 minutes for flavors to meld.",
      "Serve immediately."
    ],
    nutritionFacts: {
      calories: "120 kcal",
      protein: "9g",
      carbs: "18g",
      fat: "1g"
    }
  },
  {
    id: "ragi-porridge",
    title: "Ragi Porridge",
    description: "A calcium-rich porridge made from finger millet flour, perfect for a nutritious breakfast that supports weight loss.",
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "3 tablespoons ragi flour (finger millet flour)",
      "1 cup water or milk",
      "1 tablespoon jaggery or salt to taste",
      "1/4 teaspoon cardamom powder (for sweet version)"
    ],
    instructions: [
      "In a small bowl, mix ragi flour with 2-3 tablespoons of water to form a smooth paste.",
      "Heat the remaining water or milk in a saucepan over medium heat.",
      "When it starts to boil, slowly add the ragi paste while stirring continuously.",
      "Cook on low heat for 5-7 minutes, stirring constantly to avoid lumps.",
      "The mixture will thicken to a porridge consistency.",
      "Add jaggery and cardamom for sweet version, or salt for savory version.",
      "Cook for another 2 minutes.",
      "Serve warm."
    ],
    nutritionFacts: {
      calories: "160 kcal",
      protein: "4g",
      carbs: "28g",
      fat: "4g"
    }
  },
  {
    id: "millet-idli-coconut-chutney",
    title: "Millet Idli with Coconut Chutney",
    description: "Steamed fermented cakes made from nutritious millet and lentils, served with fresh coconut chutney.",
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
      "1/2 cup grated coconut",
      "2-3 green chilies",
      "1 inch ginger piece",
      "Curry leaves",
      "Water as needed"
    ],
    instructions: [
      "Drain and grind soaked millet to a smooth paste with minimal water.",
      "Similarly, grind urad dal to a fluffy, light batter.",
      "Mix both batters, add salt, and ferment for 8-12 hours.",
      "Grease idli molds and pour batter into each cavity.",
      "Steam in an idli steamer or pressure cooker for 10-15 minutes.",
      "For chutney, grind coconut, green chilies, ginger with little water.",
      "Temper with curry leaves and serve with hot idlis."
    ],
    nutritionFacts: {
      calories: "220 kcal",
      protein: "7g",
      carbs: "32g",
      fat: "7g"
    }
  },
  {
    id: "poha-vegetables",
    title: "Poha with Vegetables",
    description: "A light and flavorful breakfast made with flattened rice and mixed vegetables, seasoned with aromatic spices.",
    prepTime: "10 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1 cup thick poha (flattened rice)",
      "1 medium onion, chopped",
      "1/4 cup green peas",
      "1 teaspoon mustard seeds",
      "1/4 teaspoon turmeric powder",
      "1 tablespoon oil",
      "Curry leaves",
      "2 tablespoons lemon juice",
      "Salt to taste"
    ],
    instructions: [
      "Rinse poha in a colander until soft but not mushy. Drain well.",
      "Heat oil in a pan, add mustard seeds and let them splutter.",
      "Add curry leaves and chopped onion, sauté until translucent.",
      "Add green peas and cook for 2-3 minutes.",
      "Add turmeric powder and mix well.",
      "Add the drained poha and salt, mix gently.",
      "Cook for 2-3 minutes on low heat, stirring occasionally.",
      "Add lemon juice and mix.",
      "Serve hot."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "4g",
      carbs: "30g",
      fat: "5g"
    }
  },
  {
    id: "tofu-bhurji",
    title: "Tofu Bhurji",
    description: "A protein-rich scrambled tofu dish spiced with Indian flavors, perfect for a healthy vegetarian breakfast.",
    prepTime: "10 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 2,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f83b4e14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "100g firm tofu, crumbled",
      "1 medium onion, chopped",
      "1 tomato, chopped",
      "1/4 teaspoon turmeric powder",
      "1/4 teaspoon chili powder",
      "1 tablespoon oil",
      "Curry leaves",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Heat oil in a pan over medium heat.",
      "Add curry leaves and chopped onion, sauté until golden.",
      "Add chopped tomato and cook until soft and mushy.",
      "Add turmeric powder, chili powder, and salt. Mix well.",
      "Add crumbled tofu and mix gently with the spice mixture.",
      "Cook for 5-7 minutes, stirring occasionally.",
      "The tofu should absorb the flavors and turn slightly golden.",
      "Garnish with fresh coriander and serve hot."
    ],
    nutritionFacts: {
      calories: "150 kcal",
      protein: "12g",
      carbs: "5g",
      fat: "9g"
    }
  },
  {
    id: "spinach-banana-flaxseed-smoothie",
    title: "Spinach-Banana-Flaxseed Smoothie",
    description: "A nutrient-dense green smoothie packed with vitamins, minerals, and omega-3 fatty acids for a healthy start.",
    prepTime: "5 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    mealType: "Breakfast",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isTrending: true,
    ingredients: [
      "1 cup fresh spinach leaves",
      "1 small ripe banana",
      "1 cup almond milk or yogurt",
      "1 tablespoon flaxseeds",
      "1 teaspoon honey (optional)",
      "Ice cubes (optional)"
    ],
    instructions: [
      "Wash spinach leaves thoroughly and remove any thick stems.",
      "Peel and chop the banana into chunks.",
      "Add spinach, banana, almond milk, and flaxseeds to a blender.",
      "Add honey if you prefer extra sweetness.",
      "Blend on high speed for 1-2 minutes until completely smooth.",
      "Add ice cubes if you prefer a colder smoothie and blend again.",
      "Pour into a glass and serve immediately."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "5g",
      carbs: "25g",
      fat: "6g"
    }
  }
];


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
    id: "aloo-gobi",
    title: "Aloo Gobi",
    description: "A popular Indian dish made with potatoes (aloo) and cauliflower (gobi) in a blend of spices.",
    prepTime: "20 min",
    cookTime: "30 min",
    difficulty: "Easy",
    servings: 4,
    mealType: "Dinner",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1617184999745-c9c898941442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "2 medium potatoes, cubed",
      "1 small cauliflower, cut into florets",
      "1 large onion, finely chopped",
      "2 tomatoes, chopped",
      "1 tablespoon ginger-garlic paste",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala",
      "1/4 teaspoon red chili powder (optional)",
      "2 tablespoons oil",
      "Fresh coriander leaves for garnish",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil in a pan, add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and sauté for a minute.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric powder, coriander powder, garam masala, and red chili powder (if using). Sauté for a minute.",
      "Add potatoes and cauliflower, mix well with the spices.",
      "Add salt and cook covered on low heat until vegetables are tender.",
      "Garnish with fresh coriander leaves and serve hot with roti or rice."
    ],
    nutritionFacts: {
      calories: "210 kcal",
      protein: "7g",
      carbs: "35g",
      fat: "5g",
      fiber: "8g"
    },
    tips: [
      "You can add green peas for extra flavor and nutrition.",
      "Adjust the amount of red chili powder according to your spice preference.",
      "For a dry version, cook uncovered for the last few minutes to evaporate excess moisture."
    ]
  },
  {
    id: "chana-masala",
    title: "Chana Masala",
    description: "A flavorful and tangy chickpea curry, popular in North India.",
    prepTime: "15 min",
    cookTime: "45 min",
    difficulty: "Medium",
    servings: 4,
    mealType: "Lunch",
    dietPreference: "Vegan",
    imageUrl: "https://images.unsplash.com/photo-1677973037499-854714597541?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1 cup dried chickpeas, soaked overnight",
      "1 large onion, finely chopped",
      "2 tomatoes, chopped",
      "1 tablespoon ginger-garlic paste",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala",
      "1/2 teaspoon amchur (dry mango powder)",
      "1/4 teaspoon red chili powder (optional)",
      "2 tablespoons oil",
      "Fresh coriander leaves for garnish",
      "Salt to taste"
    ],
    instructions: [
      "Boil the soaked chickpeas with salt until tender. Drain and set aside.",
      "Heat oil in a pan, add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and sauté for a minute.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric powder, coriander powder, garam masala, amchur, and red chili powder (if using). Sauté for a minute.",
      "Add boiled chickpeas and mix well with the spices.",
      "Add salt and simmer for 15-20 minutes, stirring occasionally.",
      "Garnish with fresh coriander leaves and serve hot with roti or rice."
    ],
    nutritionFacts: {
      calories: "280 kcal",
      protein: "12g",
      carbs: "45g",
      fat: "6g",
      fiber: "12g"
    },
    tips: [
      "You can add a tea bag while boiling chickpeas for a darker color.",
      "Crush some of the chickpeas while simmering for a thicker gravy.",
      "Adjust the amount of amchur according to your sourness preference."
    ]
  },
  {
    id: "dal-makhani",
    title: "Dal Makhani",
    description: "A rich and creamy lentil dish made with black lentils and kidney beans, simmered overnight for a unique flavor.",
    prepTime: "20 min",
    cookTime: "Overnight Simmer",
    difficulty: "Medium",
    servings: 6,
    mealType: "Dinner",
    dietPreference: "Vegetarian",
    imageUrl: "https://images.unsplash.com/photo-1630441476774-4990c9c9493d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "1 cup whole black lentils (urad dal)",
      "1/4 cup kidney beans (rajma)",
      "2 large onions, finely chopped",
      "2 tomatoes, chopped",
      "1 tablespoon ginger-garlic paste",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chili powder (optional)",
      "1/2 cup cream or butter",
      "2 tablespoons oil or ghee",
      "Salt to taste"
    ],
    instructions: [
      "Soak black lentils and kidney beans overnight.",
      "Boil the soaked lentils and beans with salt until very tender. This may take several hours.",
      "Heat oil or ghee in a pan, add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and sauté for a minute.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric powder and red chili powder (if using). Sauté for a minute.",
      "Add boiled lentils and beans, mix well with the spices.",
      "Add cream or butter and simmer on low heat overnight or for several hours, stirring occasionally.",
      "Adjust salt and serve hot with roti or rice."
    ],
    nutritionFacts: {
      calories: "450 kcal",
      protein: "20g",
      carbs: "50g",
      fat: "20g",
      fiber: "15g"
    },
    tips: [
      "The overnight simmering is crucial for the unique flavor of Dal Makhani.",
      "You can use a slow cooker for simmering.",
      "Adjust the amount of cream or butter according to your preference."
    ]
  },
  {
    id: "palak-paneer",
    title: "Palak Paneer",
    description: "A classic North Indian dish of cottage cheese cubes in a smooth spinach gravy.",
    prepTime: "40 min",
    cookTime: "30 min",
    difficulty: "Medium",
    servings: 4,
    mealType: "Dinner",
    dietPreference: "Vegetarian",
    imageUrl: "/post-images/palak-paneer.png",
		isTrending: true,
    ingredients: [
      "250g paneer (cottage cheese), cubed",
      "500g spinach leaves, washed and chopped",
      "2 tablespoons ghee or oil",
      "1 large onion, finely chopped",
      "2 tomatoes, chopped",
      "1 tablespoon ginger-garlic paste",
      "2-3 green chilies, chopped",
      "1 teaspoon cumin seeds",
      "1 teaspoon garam masala",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon coriander powder",
      "1/2 cup cream or milk",
      "Salt to taste"
    ],
    instructions: [
      "Blanch the spinach leaves in hot water for 2-3 minutes, then transfer to ice water.",
      "Blend the blanched spinach into a smooth puree and set aside.",
      "Heat ghee in a pan, add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and green chilies, sauté for 1-2 minutes.",
      "Add chopped tomatoes and cook until soft and mushy.",
      "Add turmeric, coriander powder, and garam masala. Cook for 1-2 minutes.",
      "Stir in the spinach puree and cook for 5 minutes on low heat.",
      "Add paneer cubes and salt, simmer for 5 more minutes.",
      "Finish with cream or milk, simmer for 2 more minutes and serve hot with roti or rice."
    ],
    nutritionFacts: {
      calories: "320 kcal",
      protein: "18g",
      carbs: "14g",
      fat: "22g",
      fiber: "5g"
    },
    tips: [
      "For a healthier version, use tofu instead of paneer.",
      "Add kasuri methi (dried fenugreek leaves) for enhanced flavor.",
      "Lightly fry paneer cubes before adding to gravy for extra texture."
    ]
  },
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
      "1/4 teaspoon cumin seeds (optional)",
      "Oil for cooking"
    ],
    instructions: [
      "Drain and rinse the soaked moong dal.",
      "In a blender, combine dal, green chili, ginger, and salt with 2-3 tablespoons water.",
      "Blend to a smooth, thick batter. Add more water if needed.",
      "Transfer to a bowl and mix in chopped coriander and cumin seeds.",
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
      fat: "6g",
      fiber: "8g"
    },
    tips: [
      "Soak dal for at least 2-3 hours for easier blending.",
      "Add finely chopped vegetables like onion or tomato for extra nutrition.",
      "Serve immediately for the best taste and texture."
    ]
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
      "1 green chili, chopped",
      "1 tablespoon oil",
      "1 cup water",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Dry roast oats in a pan for 2-3 minutes until lightly golden. Set aside.",
      "Heat oil in the same pan, add mustard seeds and let them splutter.",
      "Add curry leaves and green chili, sauté for 30 seconds.",
      "Add chopped carrots and peas, cook for 3-4 minutes until tender.",
      "Add the roasted oats and mix well with vegetables.",
      "Pour water, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 5-7 minutes until water is absorbed.",
      "Stir occasionally to prevent sticking.",
      "Garnish with fresh coriander and serve warm."
    ],
    nutritionFacts: {
      calories: "210 kcal",
      protein: "6g",
      carbs: "34g",
      fat: "5g",
      fiber: "6g"
    },
    tips: [
      "Use steel-cut oats for a nuttier texture.",
      "Add other vegetables like bell peppers or beans for variety.",
      "Squeeze some lemon juice before serving for extra tang."
    ]
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
      "1/4 teaspoon turmeric powder",
      "Water as needed",
      "Oil for cooking"
    ],
    instructions: [
      "In a mixing bowl, combine besan, chopped spinach, green chili, ajwain, salt, and turmeric.",
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
      fat: "6g",
      fiber: "5g"
    },
    tips: [
      "Don't make the batter too thick; it should be easily spreadable.",
      "Add finely chopped onions for extra flavor.",
      "Can be made ahead and reheated in a toaster."
    ]
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
      "1 green chili, chopped",
      "1 tablespoon oil",
      "1.5 cups water",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Dry roast dalia in a pan for 3-4 minutes until lightly golden and aromatic.",
      "Set aside and let cool.",
      "Heat oil in the same pan, add cumin seeds and let them crackle.",
      "Add green chili and chopped vegetables, sauté for 5 minutes.",
      "Add the roasted dalia and mix well with vegetables.",
      "Pour water, add salt, and bring to a boil.",
      "Reduce heat to low, cover and cook for 10-12 minutes until dalia is soft.",
      "Stir occasionally and add more water if needed.",
      "Garnish with fresh coriander and serve hot."
    ],
    nutritionFacts: {
      calories: "190 kcal",
      protein: "5g",
      carbs: "30g",
      fat: "4g",
      fiber: "7g"
    },
    tips: [
      "Roasting dalia enhances its nutty flavor.",
      "Add ginger-garlic paste for extra taste.",
      "Can be made sweet by adding jaggery instead of salt."
    ]
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
      "1/4 teaspoon chili powder",
      "1/4 teaspoon chaat masala (optional)",
      "Fresh coriander, chopped"
    ],
    instructions: [
      "Wash the sprouted moong beans thoroughly and drain.",
      "In a large bowl, combine sprouts with chopped onion and tomato.",
      "Add lemon juice, salt, chili powder, and chaat masala if using.",
      "Toss everything well to combine.",
      "Let it sit for 5 minutes for flavors to meld.",
      "Garnish with fresh coriander and serve immediately."
    ],
    nutritionFacts: {
      calories: "120 kcal",
      protein: "9g",
      carbs: "18g",
      fat: "1g",
      fiber: "6g"
    },
    tips: [
      "Soak moong beans overnight and let them sprout for 1-2 days.",
      "Add cucumber or carrots for extra crunch.",
      "Can be stored in refrigerator for up to 2 days."
    ]
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
      "1/4 teaspoon cardamom powder (for sweet version)",
      "Chopped nuts for garnish (optional)"
    ],
    instructions: [
      "In a small bowl, mix ragi flour with 2-3 tablespoons of water to form a smooth paste.",
      "Heat the remaining water or milk in a saucepan over medium heat.",
      "When it starts to boil, slowly add the ragi paste while stirring continuously.",
      "Cook on low heat for 5-7 minutes, stirring constantly to avoid lumps.",
      "The mixture will thicken to a porridge consistency.",
      "Add jaggery and cardamom for sweet version, or salt for savory version.",
      "Cook for another 2 minutes.",
      "Garnish with chopped nuts if desired and serve warm."
    ],
    nutritionFacts: {
      calories: "160 kcal",
      protein: "4g",
      carbs: "28g",
      fat: "4g",
      fiber: "3g"
    },
    tips: [
      "Always mix ragi flour with cold water first to prevent lumps.",
      "Add fruits like banana or berries for natural sweetness.",
      "Can be made the night before and reheated in the morning."
    ]
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
      fat: "7g",
      fiber: "4g"
    },
    tips: [
      "Fermentation time may vary with weather conditions.",
      "Add a pinch of fenugreek seeds while soaking for better fermentation.",
      "Leftover idlis can be used to make idli upma."
    ]
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
      "Salt to taste",
      "Fresh coriander for garnish"
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
      "Garnish with fresh coriander and serve hot."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "4g",
      carbs: "30g",
      fat: "5g",
      fiber: "3g"
    },
    tips: [
      "Don't over-rinse poha as it may become too soft.",
      "Add roasted peanuts for extra crunch and protein.",
      "Squeeze lemon just before serving to maintain freshness."
    ]
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
      "Garnish with fresh coriander and serve hot.",
      "Serve with roti or bread."
    ],
    nutritionFacts: {
      calories: "150 kcal",
      protein: "12g",
      carbs: "5g",
      fat: "9g",
      fiber: "2g"
    },
    tips: [
      "Press tofu well to remove excess water before crumbling.",
      "Add green chilies for extra heat.",
      "Can be stuffed in chapati for a protein-rich wrap."
    ]
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
      "Pour into a glass and serve immediately.",
      "Stir before drinking if separation occurs."
    ],
    nutritionFacts: {
      calories: "180 kcal",
      protein: "5g",
      carbs: "25g",
      fat: "6g",
      fiber: "8g"
    },
    tips: [
      "Use frozen banana for a thicker, creamier texture.",
      "Soak flaxseeds overnight for better digestibility.",
      "Add a handful of berries for extra antioxidants."
    ]
  }
];

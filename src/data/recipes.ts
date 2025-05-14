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
    imageUrl: "/post-images/palak-paneer.png", // Updated image URL
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
];

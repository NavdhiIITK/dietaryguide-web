
export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  category: string;
  imageUrl: string;
  difficulty: string;
  mealType: string;
  dietPreference: string;
  isTrending?: boolean;
  ingredients?: string[];
  instructions?: string[];
  nutritionFacts?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  tips?: string[];
}

export const indianRecipes: Recipe[] = [
  {
    id: "masala-chana-dal",
    title: "Masala Chana Dal",
    description: "A protein-rich lentil dish made with split chickpeas, aromatic spices, and fresh herbs.",
    prepTime: "45 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Dinner",
    dietPreference: "Vegetarian",
    isTrending: true,
    ingredients: [
      "1 cup split Bengal gram (chana dal), soaked for 30 minutes",
      "1 large onion, finely chopped",
      "2 tomatoes, chopped",
      "2 green chilies, slit",
      "1 inch ginger, grated",
      "3 cloves garlic, minced",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric powder",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1/2 tsp garam masala",
      "Fresh coriander leaves for garnish",
      "2 tbsp ghee or oil",
      "Salt to taste"
    ],
    instructions: [
      "Rinse and soak the chana dal for 30 minutes. Drain and set aside.",
      "Heat ghee in a pressure cooker. Add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger, garlic, and green chilies. Sauté for 2 minutes until fragrant.",
      "Add chopped tomatoes and cook until soft and oil starts to separate.",
      "Add turmeric powder, red chili powder, coriander powder, and salt. Mix well.",
      "Add the soaked chana dal and mix with the spices.",
      "Add 3 cups of water and pressure cook for 3-4 whistles or until the dal is soft.",
      "Open the cooker when pressure subsides naturally. Mash some dal to create a creamy texture.",
      "Simmer for 5 minutes, then add garam masala and mix well.",
      "Garnish with fresh coriander leaves before serving."
    ],
    nutritionFacts: {
      calories: "220 per serving",
      protein: "12g",
      carbs: "35g",
      fat: "5g",
      fiber: "8g"
    },
    tips: [
      "Soaking the dal reduces cooking time and makes it more digestible.",
      "For extra richness, add a tablespoon of cream at the end.",
      "Serve with brown rice or whole wheat roti for a complete meal."
    ]
  },
  {
    id: "palak-paneer",
    title: "Palak Paneer",
    description: "A classic North Indian dish of cottage cheese cubes in a pureed spinach gravy rich in vitamins and calcium.",
    prepTime: "40 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1582576163090-09d2897fa5a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Vegetarian",
    isTrending: true,
    ingredients: [
      "2 bunches fresh spinach (palak), washed thoroughly",
      "250g paneer, cubed",
      "1 large onion, finely chopped",
      "1 inch ginger, grated",
      "4-5 cloves garlic, minced",
      "2 green chilies, chopped",
      "1 medium tomato, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric powder",
      "1 tsp garam masala",
      "2 tbsp cream (optional)",
      "2 tbsp ghee or oil",
      "Salt to taste"
    ],
    instructions: [
      "Blanch spinach in boiling water for 2-3 minutes, then immerse in cold water.",
      "Drain the spinach and blend it into a smooth puree. Set aside.",
      "Heat 1 tbsp oil in a pan and lightly fry paneer cubes until golden. Remove and set aside.",
      "In the same pan, heat 1 tbsp ghee. Add cumin seeds and let them crackle.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger, garlic, and green chilies. Sauté until fragrant.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric powder and salt. Mix well and cook for 2 minutes.",
      "Add the spinach puree and cook for 5-6 minutes on medium heat.",
      "Add fried paneer cubes and garam masala. Mix gently.",
      "Simmer for 3-4 minutes to let the flavors blend.",
      "Add cream if using, and mix well before serving."
    ],
    nutritionFacts: {
      calories: "250 per serving",
      protein: "14g",
      carbs: "15g",
      fat: "16g",
      fiber: "5g"
    },
    tips: [
      "Add a pinch of kasuri methi (dried fenugreek leaves) for extra flavor.",
      "For a lighter version, substitute cream with yogurt.",
      "Serve with brown rice or whole wheat roti for a complete meal."
    ]
  },
  {
    id: "ragi-dosa",
    title: "Ragi Dosa",
    description: "A nutritious South Indian crepe made with finger millet flour, rich in calcium and ideal for breakfast.",
    prepTime: "30 min + soaking",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Breakfast",
    dietPreference: "Vegan",
    isTrending: true,
    ingredients: [
      "1 cup ragi flour (finger millet flour)",
      "1/2 cup rice flour",
      "1/4 cup urad dal (split black gram), soaked for 2 hours",
      "1 small onion, finely chopped (optional)",
      "1 green chili, finely chopped",
      "1 inch ginger, grated",
      "A few curry leaves, chopped",
      "1/4 tsp asafoetida (hing)",
      "1/2 tsp cumin seeds",
      "2-3 tbsp chopped coriander leaves",
      "Salt to taste",
      "Oil for cooking"
    ],
    instructions: [
      "Drain the soaked urad dal and grind to a smooth paste with minimal water.",
      "In a large bowl, mix ragi flour, rice flour, and the urad dal paste.",
      "Add enough water to make a batter of pouring consistency, similar to traditional dosa batter.",
      "Add salt and let the batter rest for 15-20 minutes.",
      "Add chopped onions, green chilies, ginger, curry leaves, asafoetida, cumin seeds, and coriander leaves to the batter. Mix well.",
      "Heat a non-stick or cast iron pan. Sprinkle a few drops of water to check if it's hot enough.",
      "Pour a ladleful of batter in the center and spread it in a circular motion to form a thin dosa.",
      "Drizzle a little oil around the edges and in the center.",
      "Cook on medium heat until the bottom turns golden brown.",
      "Flip and cook the other side for a minute.",
      "Serve hot with coconut chutney or sambar."
    ],
    nutritionFacts: {
      calories: "180 per dosa",
      protein: "6g",
      carbs: "32g",
      fat: "3g",
      fiber: "4g"
    },
    tips: [
      "The batter doesn't need to ferment like traditional dosa batter.",
      "Use a non-stick pan to use less oil.",
      "Spread the batter thinly for a crispy dosa."
    ]
  },
  {
    id: "baingan-bharta",
    title: "Baingan Bharta",
    description: "A smoky eggplant dish roasted over direct flame and mashed with spices, tomatoes and herbs.",
    prepTime: "50 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Medium",
    mealType: "Dinner",
    dietPreference: "Vegan",
    isTrending: true,
    ingredients: [
      "1 large eggplant (baingan)",
      "2 tablespoons oil",
      "1 teaspoon cumin seeds",
      "1 large onion, finely chopped",
      "2 green chilies, finely chopped",
      "1 tablespoon ginger-garlic paste",
      "2 medium tomatoes, finely chopped",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chili powder",
      "1 teaspoon coriander powder",
      "1/2 teaspoon garam masala",
      "Fresh coriander leaves, chopped",
      "Salt to taste"
    ],
    instructions: [
      "Rinse and pat dry the eggplant. Apply a little oil all over it.",
      "Roast the eggplant directly over the flame, turning occasionally, until the skin is charred and the eggplant is completely soft.",
      "Once cooled, peel off the charred skin and mash the pulp with a fork. Set aside.",
      "Heat oil in a pan. Add cumin seeds and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add green chilies and ginger-garlic paste. Sauté for 2 minutes until the raw smell disappears.",
      "Add chopped tomatoes and cook until they turn soft and mushy.",
      "Add turmeric powder, red chili powder, coriander powder, and salt. Mix well.",
      "Add the mashed eggplant pulp and mix thoroughly with the spices.",
      "Cook for 8-10 minutes on medium heat, stirring occasionally.",
      "Finally, add garam masala and mix well. Garnish with fresh coriander leaves.",
      "Serve hot with roti or rice."
    ],
    nutritionFacts: {
      calories: "150 per serving",
      protein: "3g",
      carbs: "20g",
      fat: "8g",
      fiber: "7g"
    },
    tips: [
      "Roasting the eggplant over direct flame gives a unique smoky flavor essential for authentic bharta.",
      "Choose a large, firm eggplant with glossy skin for the best results.",
      "You can add a teaspoon of butter or ghee at the end for extra richness."
    ]
  }
];

// Export the full list for the recipes page
export const allIndianRecipes: Recipe[] = [
  ...indianRecipes,
  {
    id: "khichdi",
    title: "Moong Dal Khichdi",
    description: "A comforting one-pot meal made with rice, yellow moong dal, and mild spices - perfect for easy digestion.",
    prepTime: "35 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1568544787747-60c4ba915cd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Dinner",
    dietPreference: "Vegetarian",
    ingredients: [
      "1/2 cup rice",
      "1/2 cup yellow moong dal (split yellow lentils)",
      "1 small onion, finely chopped",
      "1 tomato, chopped",
      "1 inch ginger, grated",
      "1 green chili, slit",
      "1/2 teaspoon turmeric powder",
      "1/2 teaspoon cumin seeds",
      "Pinch of asafoetida (hing)",
      "2 cloves",
      "1 small cinnamon stick",
      "1 bay leaf",
      "2 tablespoons ghee",
      "Salt to taste",
      "3 cups water",
      "Fresh coriander for garnish"
    ],
    instructions: [
      "Rinse rice and dal together until water runs clear. Soak for 20 minutes, then drain.",
      "Heat ghee in a pressure cooker. Add cumin seeds, cloves, cinnamon, and bay leaf.",
      "When the spices splutter, add asafoetida and green chili. Sauté for a few seconds.",
      "Add chopped onions and sauté until translucent.",
      "Add ginger and tomatoes. Cook until tomatoes soften.",
      "Add turmeric powder and salt. Mix well.",
      "Add drained rice and dal mixture. Sauté for 2 minutes.",
      "Add 3 cups of water and mix well. Check seasoning.",
      "Pressure cook for 2-3 whistles, or until rice and dal are fully cooked and soft.",
      "Let the pressure release naturally. Open the lid and mash the khichdi slightly.",
      "Garnish with fresh coriander and serve hot with yogurt or pickle."
    ],
    nutritionFacts: {
      calories: "210 per serving",
      protein: "9g",
      carbs: "30g",
      fat: "6g",
      fiber: "5g"
    },
    tips: [
      "For a more digestible meal, add a pinch of asafoetida and some cumin powder.",
      "The consistency can be adjusted by adding more or less water depending on preference.",
      "A tadka of ghee, cumin seeds, and red chilies can be added before serving for extra flavor."
    ]
  },
  {
    id: "vegetable-upma",
    title: "Vegetable Upma",
    description: "A savory breakfast dish made from semolina and loaded with vegetables and aromatic spices.",
    prepTime: "25 min",
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1619057761548-953ada234f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    difficulty: "Easy",
    mealType: "Breakfast",
    dietPreference: "Vegetarian",
    ingredients: [
      "1 cup semolina (sooji/rava)",
      "1 medium onion, finely chopped",
      "1/2 cup mixed vegetables (carrots, peas, beans), finely chopped",
      "1 green chili, finely chopped",
      "1 teaspoon mustard seeds",
      "1 teaspoon urad dal (split black gram)",
      "1 teaspoon chana dal (split chickpeas)",
      "10-12 curry leaves",
      "1/4 teaspoon turmeric powder",
      "1/4 cup peanuts",
      "1 inch ginger, grated",
      "2 tablespoons oil or ghee",
      "Salt to taste",
      "2 cups water",
      "Fresh coriander and lemon juice for garnish"
    ],
    instructions: [
      "Dry roast the semolina in a pan on medium heat until it turns slightly golden and aromatic, about 3-4 minutes. Set aside.",
      "Heat oil or ghee in a pan. Add mustard seeds and let them crackle.",
      "Add urad dal, chana dal, and peanuts. Sauté until dals turn golden brown.",
      "Add curry leaves, green chili, and ginger. Sauté for a minute.",
      "Add chopped onions and sauté until translucent.",
      "Add mixed vegetables, turmeric powder, and salt. Mix well.",
      "Cook the vegetables for 3-4 minutes until slightly tender.",
      "Add 2 cups of hot water and bring to a boil.",
      "Once the water is boiling, lower the heat and slowly add the roasted semolina while stirring continuously to avoid lumps.",
      "Cover and cook on low heat for 2-3 minutes until all water is absorbed.",
      "Turn off the heat and let it rest for 2 minutes.",
      "Fluff up the upma with a fork, garnish with fresh coriander and a squeeze of lemon juice before serving."
    ],
    nutritionFacts: {
      calories: "180 per serving",
      protein: "5g",
      carbs: "24g",
      fat: "7g",
      fiber: "3g"
    },
    tips: [
      "Roasting the semolina before cooking prevents lumps and enhances flavor.",
      "For extra nutrition, add grated carrots or finely chopped spinach.",
      "Serve with coconut chutney or pickle for a complete breakfast."
    ]
  }
];

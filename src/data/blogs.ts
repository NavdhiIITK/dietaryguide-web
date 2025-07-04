export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  imageUrl: string;
  content?: string;
  author?: string;
}

export const blogs: Blog[] = [
  {
    id: "b3b8a1e2-8c2d-4e2a-9c1a-2b3c4d5e6f7a",
    title: "Why Protein Alone Isn't Enough",
    excerpt: "Eat Smart Not Just for the Hype! ...",
    date: "2024-06-07",
    imageUrl: "https://github.com/amishardev/navdhiweb/blob/main/WhatsApp%20Image%202025-07-04%20at%2011.50.29%20AM.jpeg?raw=true",
    content: `Eat Smart, Not Just for the Hype!
In today's world, "protein" is everywhere. From flashy ads to influencer posts, it seems like everyone is obsessed with getting more protein. But is protein the magic bullet for health and fitness? Not quite! While protein is absolutely essential, your body needs more than just protein to truly thrive. Let's break down why eating smart means looking beyond the hype—and how you can make healthy, sustainable, and affordable choices.

Why Protein Is Important
Protein is a building block for your muscles, skin, hair, and even your immune system. It helps repair tissues and is vital for growth and development. Yes, you need protein—but that's just part of the story.

The Missing Piece: Nutrients for Absorption and Synthesis
Here's a fact that often gets ignored in marketing: your body can't use protein efficiently without other nutrients. For protein to be absorbed and used for building and repairing, you need:

Vitamins (like B6, B12, C, and D): Help in protein metabolism and absorption.

Minerals (like iron, zinc, magnesium): Essential for enzyme function and muscle health.

Healthy Fats: Aid in hormone production and help absorb fat-soluble vitamins.

Carbohydrates: Provide energy so your body doesn't use protein as fuel.

So, if you're just chugging protein shakes or eating protein bars without a balanced diet, you're missing out on the full benefits!

Don't Fall for the Marketing Trap
Protein supplements and "high-protein" products are big business. But more isn't always better. Many of these products are expensive, processed, and may not offer much more than what you'd get from real, whole foods. Don't let marketing fool you—your body (and wallet) will thank you for smarter choices.

Eat Smart: Sustainable, Affordable, and Healthy Ways to Get Protein
You don't need fancy powders or imported superfoods. Here's how you can eat smart:

1. Choose Whole Foods
Plant-based: Lentils, beans, chickpeas, tofu, nuts, seeds.

Animal-based: Eggs, dairy, fish, chicken (if you eat animal products).

2. Balance Your Plate
Pair protein with whole grains, vegetables, and healthy fats for a complete meal.

3. Go Local and Seasonal
Local foods are often fresher, more affordable, and eco-friendly.

4. Watch Portion Sizes
More protein doesn't mean better health. Aim for variety and balance.

Final Thoughts
Protein is essential, but it's not the only nutrient your body needs. Don't get swept up by marketing gimmicks. Eat a variety of whole, local, and affordable foods. Focus on balance, not just protein, and you'll be fueling your body the smart way—sustainably and healthily!

Eat smart, stay healthy, and don't be fooled by the hype!`,
    author: "Team DietaryGuide",
  },
  {
    id: "7e9f1c3a-2b4d-4e6f-8a1b-9c2d3e4f5a6b",
    title: "Nutritional Equality: Making Healthy Food Accessible for All",
    excerpt: "Explore how we can bridge the nutrition gap ... ",
    date: "2025-05-13",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    content: "Explore how we can bridge the nutrition gap ... ",
    author: "Team DietaryGuide",
  },
]; 
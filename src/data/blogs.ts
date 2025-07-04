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
    content: "Eat Smart Not Just for the Hype! ...",
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
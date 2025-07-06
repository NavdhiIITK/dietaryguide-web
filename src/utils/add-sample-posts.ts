import { supabase } from '@/integrations/supabase/client';

const samplePosts = [
  {
    title: "Protein Power: The Complete Guide to Building Muscle",
    slug: "protein-power",
    subtitle: "Everything you need to know about protein for muscle growth and recovery",
    content: `
      <h2>Why Protein is Essential for Muscle Building</h2>
      <p>Protein is the building block of muscle tissue. When you exercise, especially strength training, you create tiny tears in your muscle fibers. Protein helps repair and rebuild these fibers, making them stronger and larger.</p>
      
      <h2>How Much Protein Do You Need?</h2>
      <p>For muscle building, aim for 1.6-2.2 grams of protein per kilogram of body weight daily. This means if you weigh 70kg, you should consume 112-154 grams of protein per day.</p>
      
      <h2>Best Protein Sources</h2>
      <ul>
        <li><strong>Lean meats:</strong> Chicken breast, turkey, lean beef</li>
        <li><strong>Fish:</strong> Salmon, tuna, cod</li>
        <li><strong>Eggs:</strong> Complete protein with all essential amino acids</li>
        <li><strong>Dairy:</strong> Greek yogurt, cottage cheese, milk</li>
        <li><strong>Plant-based:</strong> Lentils, chickpeas, quinoa, tofu</li>
      </ul>
      
      <h2>Timing Your Protein Intake</h2>
      <p>Distribute your protein intake throughout the day. Aim for 20-30 grams of protein per meal, and consider a protein shake within 30 minutes after your workout for optimal muscle recovery.</p>
      
      <h2>Sample Meal Plan</h2>
      <p><strong>Breakfast:</strong> Greek yogurt with berries and nuts (20g protein)</p>
      <p><strong>Lunch:</strong> Grilled chicken salad (30g protein)</p>
      <p><strong>Snack:</strong> Protein shake (25g protein)</p>
      <p><strong>Dinner:</strong> Salmon with quinoa and vegetables (35g protein)</p>
      
      <p>Remember, consistency is key. Combine adequate protein intake with regular strength training for the best results.</p>
    `,
    tags: ["Protein", "Muscle Building", "Nutrition", "Fitness"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author_name: "Team DietaryGuide",
    author_avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    published: true
  },
  {
    title: "Hydration Science: Beyond the 8 Glasses Rule",
    slug: "hydration-science",
    subtitle: "Understanding the science behind proper hydration for optimal health",
    content: `
      <h2>The Truth About Hydration</h2>
      <p>The "8 glasses a day" rule is a myth. Your water needs depend on your body size, activity level, climate, and diet. Let's explore the science behind proper hydration.</p>
      
      <h2>How Much Water Do You Really Need?</h2>
      <p>Your daily water needs can be calculated using this formula:</p>
      <ul>
        <li>Body weight (kg) × 30ml = Base water requirement</li>
        <li>Add 350ml for every 30 minutes of exercise</li>
        <li>Add more in hot weather or high altitude</li>
      </ul>
      
      <h2>Signs of Dehydration</h2>
      <ul>
        <li>Dark yellow urine</li>
        <li>Dry mouth and lips</li>
        <li>Headache and fatigue</li>
        <li>Dizziness</li>
        <li>Reduced urine output</li>
      </ul>
      
      <h2>Best Hydration Practices</h2>
      <p><strong>Start your day right:</strong> Drink 500ml of water within 30 minutes of waking up.</p>
      <p><strong>Pre-workout:</strong> Drink 500ml 2-3 hours before exercise.</p>
      <p><strong>During exercise:</strong> Sip 150-300ml every 15-20 minutes.</p>
      <p><strong>Post-workout:</strong> Replace lost fluids within 2 hours.</p>
      
      <h2>Beyond Water: Electrolytes Matter</h2>
      <p>For intense exercise lasting more than 60 minutes, consider electrolyte replacement. Sports drinks or coconut water can help maintain sodium, potassium, and magnesium levels.</p>
      
      <h2>Hydration and Performance</h2>
      <p>Even mild dehydration (2% body weight loss) can impair physical and mental performance. Stay ahead of thirst to maintain peak performance.</p>
    `,
    tags: ["Hydration", "Health", "Performance", "Wellness"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author_name: "Team DietaryGuide",
    author_avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    published: true
  },
  {
    title: "Indian Diet Myths: Debunking Common Nutrition Misconceptions",
    slug: "indian-diet-myths",
    subtitle: "Separating fact from fiction in traditional Indian nutrition beliefs",
    content: `
      <h2>Myth 1: Ghee is Bad for Health</h2>
      <p><strong>Fact:</strong> Ghee, when consumed in moderation, can be beneficial. It contains healthy fats, vitamins A, D, E, and K, and has anti-inflammatory properties. The key is portion control - 1-2 teaspoons per day is appropriate.</p>
      
      <h2>Myth 2: Rice Makes You Fat</h2>
      <p><strong>Fact:</strong> Rice itself doesn't cause weight gain. The issue is often portion size and what you eat with it. Brown rice is more nutritious than white rice, but both can be part of a healthy diet when consumed in appropriate portions.</p>
      
      <h2>Myth 3: Curd Should Not Be Eaten at Night</h2>
      <p><strong>Fact:</strong> There's no scientific evidence that curd is harmful at night. In fact, it can be a good source of protein and probiotics. However, some people may experience digestive discomfort if they're lactose intolerant.</p>
      
      <h2>Myth 4: Honey is Better Than Sugar</h2>
      <p><strong>Fact:</strong> While honey has some beneficial compounds, it's still a form of sugar and should be consumed in moderation. Both honey and sugar contribute to calorie intake and blood sugar levels.</p>
      
      <h2>Myth 5: Eating Fruits on Empty Stomach is Best</h2>
      <p><strong>Fact:</strong> Fruits are nutritious regardless of when you eat them. The key is to include them in your daily diet. Eating fruits with meals can actually help with nutrient absorption.</p>
      
      <h2>Building a Balanced Indian Diet</h2>
      <ul>
        <li>Include a variety of whole grains</li>
        <li>Eat plenty of vegetables and fruits</li>
        <li>Choose lean protein sources</li>
        <li>Use healthy cooking methods</li>
        <li>Practice portion control</li>
      </ul>
      
      <p>Remember, the best diet is one that's sustainable, enjoyable, and meets your individual nutritional needs.</p>
    `,
    tags: ["Indian Diet", "Nutrition Myths", "Health", "Traditional Foods"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    author_name: "Team DietaryGuide",
    author_avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    published: true
  }
];

export async function addSamplePosts() {
  console.log('Adding sample posts to Supabase...');
  
  try {
    for (const post of samplePosts) {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: post.title,
          slug: post.slug,
          subtitle: post.subtitle,
          content: post.content,
          tags: post.tags,
          image: post.image,
          author_name: post.author_name,
          author_avatar_url: post.author_avatar_url,
          published: post.published,
          snippet: post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          reading_time: Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)
        });

      if (error) {
        console.error(`Error adding post "${post.title}":`, error);
      } else {
        console.log(`✅ Added post: ${post.title}`);
      }
    }
    
    console.log('Sample posts addition completed!');
  } catch (error) {
    console.error('Error adding sample posts:', error);
  }
}

// Function to check if posts table is empty
export async function checkIfPostsEmpty() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error checking posts table:', error);
      return false;
    }

    return !data || data.length === 0;
  } catch (error) {
    console.error('Error checking posts table:', error);
    return false;
  }
} 
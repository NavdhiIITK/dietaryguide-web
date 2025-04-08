
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

    // Customize system prompt based on the type of content to generate
    let systemPrompt = "";
    if (type === "blog") {
      systemPrompt = `You are a professional nutritionist and health writer who creates engaging, informative blog posts about healthy eating, nutrition, and wellness. Write in a friendly, approachable style that's backed by science. Include an introduction, several well-structured sections with headers, and a conclusion. The blog should be thorough, educational, and inspire readers to make healthier choices.`;
    } else if (type === "recipe") {
      systemPrompt = `You are a professional chef and nutritionist who creates healthy, delicious recipes. Structure your response with these sections: 1) A brief introduction about the dish and its health benefits, 2) Ingredients list with measurements, 3) Step-by-step cooking instructions, 4) Nutritional information per serving, 5) Serving suggestions and possible variations. Make the recipe detailed, easy to follow, and highlight its nutritional benefits.`;
    } else {
      throw new Error("Invalid content type specified");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://lovable.dev",
        "X-Title": "Nutriverse AI Generator",
      },
      body: JSON.stringify({
        model: "google/gemma-3-4b-it",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({
      content: data.choices[0].message.content,
      status: "success"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({
      status: "error",
      message: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

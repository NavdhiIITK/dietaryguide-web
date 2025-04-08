
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create content-images bucket if it doesn't exist
    const { data: contentBucketData, error: contentBucketError } = await supabase
      .storage
      .createBucket('content-images', { 
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
    
    if (contentBucketError && !contentBucketError.message.includes('already exists')) {
      throw contentBucketError;
    }
    
    // Create meal-images bucket if it doesn't exist
    const { data: mealBucketData, error: mealBucketError } = await supabase
      .storage
      .createBucket('meal-images', { 
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
    
    if (mealBucketError && !mealBucketError.message.includes('already exists')) {
      throw mealBucketError;
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Buckets created or already exist",
        contentBucket: contentBucketData || "already exists",
        mealBucket: mealBucketData || "already exists"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

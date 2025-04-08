
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
    
    // Get bucket name from request body if provided, otherwise use default
    let bucketName = 'content-images';
    try {
      const { bucketName: requestedBucket } = await req.json();
      if (requestedBucket) {
        bucketName = requestedBucket;
      }
    } catch (e) {
      // If parsing fails, use default bucket name
      console.log("Using default bucket name:", bucketName);
    }
    
    console.log(`Creating or verifying bucket: ${bucketName}`);
    
    // Create the requested bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase
      .storage
      .createBucket(bucketName, { 
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
    
    if (bucketError && !bucketError.message.includes('already exists')) {
      throw bucketError;
    }
    
    // Create public storage policy for the bucket
    try {
      // Check if policy exists
      const { data: policies } = await supabase
        .from('storage')
        .select('policies')
        .eq('name', bucketName)
        .single();
      
      if (!policies || policies.length === 0) {
        // Create policy to allow public access
        await supabase
          .rpc('create_storage_policy', {
            bucket_name: bucketName,
            policy_name: `${bucketName}_public_access`,
            definition: "((bucket_id = '${bucketName}'::text) AND (auth.role() = 'authenticated'::text))",
            operation: 'ALL'
          });
        
        console.log(`Created public access policy for bucket: ${bucketName}`);
      }
    } catch (policyError) {
      // If policy creation fails, log but don't throw error
      console.warn("Policy creation warning:", policyError);
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Bucket created or already exists",
        bucketName: bucketName,
        status: bucketData ? "created" : "exists"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: JSON.stringify(error)
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

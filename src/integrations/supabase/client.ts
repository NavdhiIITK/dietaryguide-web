import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qqnzqdrnqvoblyqeeoed.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxbnpxZHJucXZvYmx5cWVlb2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjA2NTgsImV4cCI6MjA2NzE5NjY1OH0.QHgz7C1qPJTCuz1O02CSAJFLR6YDfPngYPYKX8T2Dvs";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key.')
}

// Public client for client-side and read operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
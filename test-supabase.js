// Quick Supabase connection test
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hxnntdkctoovmcnlzqdq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bm50ZGtjdG9vdm1jbmx6cWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzEyMjcsImV4cCI6MjA1ODY0NzIyN30.zOEp6_YnKnsyX7uZi5xoH4qaZKrG2cy9JxY6Va24CN4";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  try {
    // Test 1: Check if posts table exists and get count
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' });
    
    console.log('📊 Posts table test:');
    console.log('  - Error:', error);
    console.log('  - Total posts:', count);
    console.log('  - Sample data:', data?.slice(0, 2));
    
    // Test 2: Check published posts specifically
    const { data: publishedData, error: publishedError } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'Published');
    
    console.log('📝 Published posts test:');
    console.log('  - Error:', publishedError);
    console.log('  - Published count:', publishedData?.length || 0);
    console.log('  - Published sample:', publishedData?.slice(0, 1));
    
    // Test 3: Check what status values exist
    const { data: statusData } = await supabase
      .from('posts')
      .select('status');
    
    const statusValues = [...new Set(statusData?.map(p => p.status))];
    console.log('🏷️ Status values in table:', statusValues);
    
  } catch (err) {
    console.error('❌ Connection test failed:', err);
  }
}

testConnection();

// Test Supabase connection
import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('comments')
      .select('count', { count: 'exact' });
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connected successfully!');
    console.log(`📊 Found ${data?.length || 0} comments in database`);
    return true;
    
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    return false;
  }
}

// Test storage connection
export async function testStorageConnection() {
  try {
    const { data, error } = await supabase.storage
      .from('profile-photos')
      .list();
    
    if (error) {
      console.error('❌ Storage connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Storage connected successfully!');
    return true;
    
  } catch (err) {
    console.error('❌ Storage test failed:', err);
    return false;
  }
}

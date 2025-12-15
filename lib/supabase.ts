import { createClient } from '@supabase/supabase-js';

// Access environment variables. 
// Note: In a real Vite environment, use import.meta.env.VITE_SUPABASE_URL
// For this environment, we assume process.env or hardcoded values are passed.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from '@supabase/supabase-js';

// Safe environment variable access for both Browser and Node/Build environments
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  // Safe check for Vite's import.meta.env
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }
  return undefined;
};

// Use placeholders if keys are missing to prevent createClient from throwing immediately
const supabaseUrl = getEnv('REACT_APP_SUPABASE_URL') || getEnv('VITE_SUPABASE_URL') || 'https://placeholder-project.supabase.co';
const supabaseKey = getEnv('REACT_APP_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY') || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
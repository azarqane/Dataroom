import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://raohlsmmgdtijrrcngpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb2hsc21tZ2R0aWpycmNuZ3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjIyNzAsImV4cCI6MjA2MzMzODI3MH0.KOJutbIDFSRKC9S7lcqfFL89_Y9U78K2y5oVnMXZyTg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: localStorage,
    storageKey: 'supabase.auth.token'
  },
  global: {
    headers: {
      'x-client-info': 'neutvault'
    }
  },
  realtime: {
    timeout: 120000, // Increased to 120 seconds
    retries: 5, // Increased number of retries
    backoff: {
      maxDelay: 10000, // Maximum delay between retries (10 seconds)
      minDelay: 1000 // Minimum delay between retries (1 second)
    }
  }
});
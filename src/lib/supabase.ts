import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://raohlsmmgdtijrrcngpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb2hsc21tZ2R0aWpycmNuZ3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NjIyNzAsImV4cCI6MjA2MzMzODI3MH0.KOJutbIDFSRKC9S7lcqfFL89_Y9U78K2y5oVnMXZyTg';

// Configure the client with longer timeouts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'neutvault'
    },
    // Increase timeout to 30 seconds
    fetch: (url, options) => {
      return fetch(url, {
        ...options,
        timeout: 30000 // 30 seconds timeout
      });
    }
  }
});
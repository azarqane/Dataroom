/*
  # Fix profiles table foreign key constraint

  1. Changes
    - Remove the foreign key constraint from profiles table that references non-existent users table
    - The auth.users table is managed by Supabase Auth and should not be referenced directly
  
  2. Security
    - Maintain existing RLS policies
    - No changes to security settings
*/

DO $$ 
BEGIN
  -- Check if the constraint exists before trying to drop it
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;
  END IF;
END $$;
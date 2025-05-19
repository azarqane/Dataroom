/*
  # Clean up duplicate profiles

  This migration adds a function to safely remove duplicate profile entries
  while preserving the most recently updated profile for each user.
*/

CREATE OR REPLACE FUNCTION clean_duplicate_profiles() 
RETURNS void AS $$
BEGIN
  -- Delete duplicate profiles keeping only the most recently updated one
  DELETE FROM profiles a
  WHERE EXISTS (
    SELECT 1 FROM profiles b
    WHERE b.id = a.id
    AND b.updated_at > a.updated_at
  );
  
  -- Add unique constraint if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_key'
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_id_key UNIQUE (id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the cleanup function
SELECT clean_duplicate_profiles();

-- Drop the function after use
DROP FUNCTION IF EXISTS clean_duplicate_profiles();
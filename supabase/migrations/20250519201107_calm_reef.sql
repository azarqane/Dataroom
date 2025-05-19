/*
  # Delete profile

  1. Changes
    - Delete profile for specific user
    - Safe deletion with user existence check
*/

DO $$
BEGIN
  -- Delete the profile if it exists
  DELETE FROM profiles 
  WHERE id = '[USER_ID]'; -- Remplacez [USER_ID] par l'UUID de l'utilisateur
END $$;
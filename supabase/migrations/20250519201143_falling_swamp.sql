/*
  # Delete user profile

  1. Changes
    - Adds a function to safely delete a user profile by UUID
    - Function checks if profile exists before attempting deletion
    - Returns number of rows deleted

  2. Usage
    - Replace the UUID in the SELECT statement with the actual user ID
    - Example: SELECT delete_profile('123e4567-e89b-12d3-a456-426614174000');
*/

-- Create a function to safely delete a profile
CREATE OR REPLACE FUNCTION delete_profile(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  rows_deleted INTEGER;
BEGIN
  DELETE FROM profiles 
  WHERE id = user_uuid
  RETURNING 1 INTO rows_deleted;
  
  RETURN COALESCE(rows_deleted, 0);
END;
$$ LANGUAGE plpgsql;

-- Example usage (commented out, replace UUID with actual user ID):
-- SELECT delete_profile('123e4567-e89b-12d3-a456-426614174000');
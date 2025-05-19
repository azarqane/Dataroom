/*
  # Add INSERT policy for profiles table

  1. Changes
    - Add new policy allowing authenticated users to insert their own profile
    
  2. Security
    - Allows authenticated users to create their own profile during signup
    - Maintains existing security by ensuring users can only insert rows where id matches their auth.uid()
*/

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
/*
  # Add admin role to profiles table

  1. Changes
    - Add role column to profiles table
    - Create admin user
    - Add role-based policies
*/

-- Add role column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'user';
  END IF;
END $$;

-- Create admin user if it doesn't exist
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  'ad0f4cd0-0000-4000-a000-000000000000',
  'authenticated',
  'authenticated',
  'admin@neutvault.fr',
  crypt('NeutVault2025!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@neutvault.fr'
);

-- Create admin profile
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  'ad0f4cd0-0000-4000-a000-000000000000',
  'admin@neutvault.fr',
  'Admin NeutVault',
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'admin@neutvault.fr'
);

-- Update RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can create profiles" ON profiles;

-- Create new policies
CREATE POLICY "Admin can do everything" 
  ON profiles FOR ALL 
  TO authenticated 
  USING (role = 'admin')
  WITH CHECK (role = 'admin');

CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND (role IS NULL OR role = 'user'));

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id AND (role IS NULL OR role = 'user'));

CREATE POLICY "Service role can create profiles" 
  ON profiles FOR INSERT 
  TO service_role 
  WITH CHECK (true);
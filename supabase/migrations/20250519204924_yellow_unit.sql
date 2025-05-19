-- Drop and recreate the admin user to ensure clean state
DELETE FROM auth.users WHERE email = 'admin@neutvault.fr';
DELETE FROM public.profiles WHERE email = 'admin@neutvault.fr';

-- Create admin user with a secure password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmed_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'ad0f4cd0-0000-4000-a000-000000000000',
  'authenticated',
  'authenticated',
  'admin@neutvault.fr',
  crypt('NeutVault2025!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  now()
);

-- Create admin profile
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
)
VALUES (
  'ad0f4cd0-0000-4000-a000-000000000000',
  'admin@neutvault.fr',
  'Admin NeutVault',
  'admin',
  now(),
  now()
);

-- Ensure RLS policies are correctly set
DROP POLICY IF EXISTS "Admin can do everything" ON profiles;
CREATE POLICY "Admin can do everything" 
  ON profiles FOR ALL 
  TO authenticated 
  USING (role = 'admin')
  WITH CHECK (role = 'admin');
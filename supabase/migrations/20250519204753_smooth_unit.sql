-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  role text DEFAULT 'user'
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
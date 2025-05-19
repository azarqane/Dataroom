-- Vérifier l'utilisateur dans auth.users
SELECT id, email, created_at
FROM auth.users
WHERE email = 'a.zarqane@icloud.com';

-- Vérifier le profil associé dans public.profiles
SELECT id, email, full_name, created_at, updated_at
FROM profiles
WHERE email = 'a.zarqane@icloud.com';
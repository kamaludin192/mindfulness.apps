-- Fix demo users in auth.users for Supabase GoTrue authentication
UPDATE auth.users
SET 
  instance_id = '00000000-0000-0000-0000-000000000000',
  encrypted_password = extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  aud = 'authenticated',
  role = 'authenticated',
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{"full_name":"Siswa Demo"}'
WHERE email = 'siswa@example.com';

UPDATE auth.users
SET 
  instance_id = '00000000-0000-0000-0000-000000000000',
  encrypted_password = extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  aud = 'authenticated',
  role = 'authenticated',
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{"full_name":"Guru BK Demo"}'
WHERE email = 'guru@example.com';

UPDATE auth.users
SET 
  instance_id = '00000000-0000-0000-0000-000000000000',
  encrypted_password = extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  aud = 'authenticated',
  role = 'authenticated',
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{"full_name":"Admin Mindfulness"}'
WHERE email = 'admin@example.com';

-- Ensure identities have matching instance_id and email
UPDATE auth.identities
SET
  identity_data = json_build_object('sub', user_id, 'email', (SELECT email FROM auth.users WHERE auth.users.id = auth.identities.user_id))::jsonb,
  provider = 'email',
  last_sign_in_at = now()
WHERE user_id IN (SELECT id FROM auth.users WHERE email IN ('siswa@example.com', 'guru@example.com', 'admin@example.com'));

-- Clean up any existing demo records
DELETE FROM auth.identities WHERE user_id IN (SELECT id FROM auth.users WHERE email IN ('siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id', 'siswa@example.com', 'guru@example.com', 'admin@example.com'));
DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email IN ('siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id', 'siswa@example.com', 'guru@example.com', 'admin@example.com'));
DELETE FROM auth.users WHERE email IN ('siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id', 'siswa@example.com', 'guru@example.com', 'admin@example.com');

-- 1. Insert Siswa Demo (siswa@mindfulness.id / password123)
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'siswa@mindfulness.id',
  extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  now(),
  NULL,
  '',
  now(),
  '',
  NULL,
  '',
  '',
  NULL,
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Andi Pratama (Siswa Demo)","role":"siswa"}'::jsonb,
  false,
  now(),
  now(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  false,
  NULL
);

-- Insert Identity for Siswa
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d',
  'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d',
  json_build_object('sub', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'email', 'siswa@mindfulness.id')::jsonb,
  'email',
  'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d',
  now(),
  now(),
  now()
);

-- Insert Profile for Siswa
INSERT INTO public.profiles (id, role, full_name)
VALUES ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'siswa', 'Andi Pratama (Siswa Demo)');

-- 2. Insert Guru BK Demo (guru@mindfulness.id / password123)
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'guru@mindfulness.id',
  extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  now(),
  NULL,
  '',
  now(),
  '',
  NULL,
  '',
  '',
  NULL,
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Budi Santoso, S.Pd (Guru BK Demo)","role":"guru_bk"}'::jsonb,
  false,
  now(),
  now(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  false,
  NULL
);

-- Insert Identity for Guru BK
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  json_build_object('sub', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'email', 'guru@mindfulness.id')::jsonb,
  'email',
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  now(),
  now(),
  now()
);

-- Insert Profile for Guru BK
INSERT INTO public.profiles (id, role, full_name)
VALUES ('b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'guru_bk', 'Budi Santoso, S.Pd (Guru BK Demo)');

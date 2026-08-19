-- 1. Bersihkan record admin yang tidak lengkap
DELETE FROM auth.identities WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'admin@mindfulness.id');
DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@mindfulness.id');
DELETE FROM auth.users WHERE email = 'admin@mindfulness.id';

-- 2. Insert Superadmin User dengan kolom lengkap standar GoTrue
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
  'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@mindfulness.id',
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
  '{"full_name":"Administrator Utama (Superadmin)","role":"superadmin"}'::jsonb,
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

-- 3. Insert Identity untuk Admin
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
  'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
  'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
  json_build_object('sub', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'email', 'admin@mindfulness.id')::jsonb,
  'email',
  'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
  now(),
  now(),
  now()
);

-- 4. Insert Profile Superadmin
INSERT INTO public.profiles (id, role, full_name)
VALUES ('a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'superadmin', 'Administrator Utama (Superadmin)')
ON CONFLICT (id) DO UPDATE SET role = 'superadmin', full_name = 'Administrator Utama (Superadmin)';

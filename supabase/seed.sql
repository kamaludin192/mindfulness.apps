-- Seed data for testing

-- Create admin, guru_bk, and student in auth.users
INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'authenticated', 'authenticated', 'admin@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'authenticated', 'authenticated', 'guru@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'authenticated', 'authenticated', 'siswa@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now());

-- Add identities for login
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', format('{"sub":"%s","email":"%s"}', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'admin@example.com')::jsonb, 'email', now(), now(), now()),
  (gen_random_uuid(), 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', format('{"sub":"%s","email":"%s"}', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'guru@example.com')::jsonb, 'email', now(), now(), now()),
  (gen_random_uuid(), 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', format('{"sub":"%s","email":"%s"}', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'siswa@example.com')::jsonb, 'email', now(), now(), now());

-- Seed Profiles
INSERT INTO public.profiles (id, role, full_name)
VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'superadmin', 'Admin Mindfulness'),
  ('b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'guru_bk', 'Guru BK Dummy'),
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'siswa', 'Siswa Dummy');

-- Seed Cms_Contents
INSERT INTO public.cms_contents (id, session_number, title, video_url)
VALUES
  ('11111111-1111-1111-1111-111111111111', 1, 'Pengantar Mindfulness', 'https://www.youtube.com/watch?v=dummy1'),
  ('22222222-2222-2222-2222-222222222222', 2, 'Mengamati Pikiran', 'https://www.youtube.com/watch?v=dummy2'),
  ('33333333-3333-3333-3333-333333333333', 3, 'Menerima Emosi', 'https://www.youtube.com/watch?v=dummy3'),
  ('44444444-4444-4444-4444-444444444444', 4, 'Bersikap Welas Asih', 'https://www.youtube.com/watch?v=dummy4');

-- Seed Assessments
INSERT INTO public.assessments (student_id, mood_score, notes)
VALUES
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 3, 'Merasa sedikit lelah hari ini tapi lumayan.');

-- Seed Exercise_Progress
INSERT INTO public.exercise_progress (student_id, session_id, status, worksheet_data, is_video_watched, points_earned)
VALUES
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', '11111111-1111-1111-1111-111111111111', 'in_progress', '{"notes": ["Belajar untuk fokus pada napas"]}', true, 10);

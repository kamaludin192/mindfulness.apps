-- =========================================================
-- MASTER SEED SCRIPT: DEMO ACCOUNTS FOR ALL ROLES
-- mindfulnessintervention.id
-- =========================================================

-- 1. HAPUS DATA DEMO LAMA (BERSIHKAN DATABASE)
DELETE FROM auth.identities WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN (
    'siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id',
    'siswa@example.com', 'guru@example.com', 'admin@example.com'
  )
);
DELETE FROM public.counseling_bookings WHERE student_id IN (
  SELECT id FROM auth.users WHERE email IN ('siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id')
);
DELETE FROM public.exercise_progress WHERE student_id IN (
  SELECT id FROM auth.users WHERE email IN ('siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id')
);
DELETE FROM public.profiles WHERE id IN (
  SELECT id FROM auth.users WHERE email IN (
    'siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id',
    'siswa@example.com', 'guru@example.com', 'admin@example.com'
  )
);
DELETE FROM auth.users WHERE email IN (
  'siswa@mindfulness.id', 'guru@mindfulness.id', 'admin@mindfulness.id',
  'siswa@example.com', 'guru@example.com', 'admin@example.com'
);

-- =========================================================
-- 2. INSERT 3 AKUN UTAMA KE AUTH.USERS (STANDAR LENGKAP GOTRUE)
-- =========================================================

-- A. AKUN SISWA (siswa@mindfulness.id / password123)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
  email_change_token_new, email_change, email_change_sent_at, last_sign_in_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at,
  phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at,
  email_change_token_current, email_change_confirm_status, banned_until,
  reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at
) VALUES (
  'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'siswa@mindfulness.id',
  extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  now(), NULL, '', now(), '', NULL, '', '', NULL, now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Andi Pratama (Siswa Demo)","role":"siswa"}'::jsonb,
  false, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL
);

-- B. AKUN GURU BK (guru@mindfulness.id / password123)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
  email_change_token_new, email_change, email_change_sent_at, last_sign_in_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at,
  phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at,
  email_change_token_current, email_change_confirm_status, banned_until,
  reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at
) VALUES (
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'guru@mindfulness.id',
  extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  now(), NULL, '', now(), '', NULL, '', '', NULL, now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Budi Santoso, S.Pd (Guru BK Demo)","role":"guru_bk"}'::jsonb,
  false, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL
);

-- C. AKUN SUPERADMIN (admin@mindfulness.id / password123)
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
  invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
  email_change_token_new, email_change, email_change_sent_at, last_sign_in_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at,
  phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at,
  email_change_token_current, email_change_confirm_status, banned_until,
  reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at
) VALUES (
  'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'admin@mindfulness.id',
  extensions.crypt('password123', extensions.gen_salt('bf', 10)),
  now(), NULL, '', now(), '', NULL, '', '', NULL, now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Administrator Utama (Superadmin Demo)","role":"superadmin"}'::jsonb,
  false, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL
);

-- =========================================================
-- 3. INSERT IDENTITIES UNTUK LOGIN SUPABASE
-- =========================================================
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
VALUES
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', json_build_object('sub', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'email', 'siswa@mindfulness.id')::jsonb, 'email', 'f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', now(), now(), now()),
  ('b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', json_build_object('sub', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'email', 'guru@mindfulness.id')::jsonb, 'email', 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', now(), now(), now()),
  ('a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', json_build_object('sub', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'email', 'admin@mindfulness.id')::jsonb, 'email', 'a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', now(), now(), now());

-- =========================================================
-- 4. INSERT PROFILES
-- =========================================================
INSERT INTO public.profiles (id, role, full_name)
VALUES
  ('f6e5d4c3-b2a1-4a5b-8c9d-0e1f2a3b4c5d', 'siswa', 'Andi Pratama (Siswa Demo)'),
  ('b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e', 'guru_bk', 'Budi Santoso, S.Pd (Guru BK Demo)'),
  ('a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d', 'superadmin', 'Administrator Utama (Superadmin Demo)')
ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, full_name = EXCLUDED.full_name;

-- =========================================================
-- 5. SEED CMS 4 SESI INTERVENSI (KOSONGKAN VIDEO_URL UNTUK DIISI SUPERADMIN)
-- =========================================================
DELETE FROM public.cms_contents;
INSERT INTO public.cms_contents (session_number, title, video_url)
VALUES
  (1, 'Sesi 1: Menyadari Napas & Tubuh (Mindful Breathing)', NULL),
  (2, 'Sesi 2: Pengenalan Pikiran & Regulasi Emosi', NULL),
  (3, 'Sesi 3: Mengelola Stres Akademik & Kecemasan', NULL),
  (4, 'Sesi 4: Welas Asih Diri (Self-Compassion) & Rasa Syukur', NULL);

-- =========================================================
-- 6. SEED SETTING JADWAL KETERSEDIAAN GURU BK
-- =========================================================
INSERT INTO public.counselor_availability_settings (guru_id, active_days, time_slots, disabled_dates, custom_notes)
VALUES (
  'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  ARRAY['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
  '[
    {"id": "1", "timeRange": "09:00 - 09:45", "startTime": "09:00", "isActive": true},
    {"id": "2", "timeRange": "10:00 - 10:45", "startTime": "10:00", "isActive": true},
    {"id": "3", "timeRange": "13:00 - 13:45", "startTime": "13:00", "isActive": true},
    {"id": "4", "timeRange": "14:00 - 14:45", "startTime": "14:00", "isActive": true}
  ]'::jsonb,
  ARRAY[]::text[],
  'Sesi konseling diadakan di Ruang Bimbingan Konseling (BK) Lantai 2. Harap hadir 5 menit sebelum jadwal sesi.'
)
ON CONFLICT (guru_id) DO UPDATE SET
  active_days = EXCLUDED.active_days,
  time_slots = EXCLUDED.time_slots,
  custom_notes = EXCLUDED.custom_notes;

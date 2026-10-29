-- =============================================================
-- MASTER MIGRATION FILE - MINDFULNESS INTERVENTION APP
-- Salin seluruh isi file ini ke Supabase SQL Editor, lalu klik Run.
-- Dibuat: 2026-10-14
-- =============================================================

-- ─── STEP 0: Extensions ───────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── STEP 1: ENUM Types ───────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('siswa', 'guru_bk', 'superadmin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE exercise_status AS ENUM ('in_progress', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── STEP 2: Core Tables ──────────────────────────────────────

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'siswa',
    full_name TEXT NOT NULL,
    email TEXT,
    avatar_url TEXT,
    phone TEXT,
    school TEXT,
    nip TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. CMS Contents
CREATE TABLE IF NOT EXISTS public.cms_contents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_number INTEGER NOT NULL CHECK (session_number >= 1 AND session_number <= 4),
    title TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Assessments
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Exercise Progress
CREATE TABLE IF NOT EXISTS public.exercise_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES public.cms_contents(id) ON DELETE CASCADE NOT NULL,
    status exercise_status NOT NULL DEFAULT 'in_progress',
    worksheet_data JSONB,
    is_video_watched BOOLEAN NOT NULL DEFAULT false,
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, session_id)
);

-- 5. Counseling Bookings
CREATE TABLE IF NOT EXISTS public.counseling_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    guru_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Chat Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Counselor Availability Settings
CREATE TABLE IF NOT EXISTS public.counselor_availability_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guru_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    active_days TEXT[] NOT NULL DEFAULT ARRAY['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    time_slots JSONB NOT NULL DEFAULT '[
      {"id": "1", "timeRange": "09:00 - 09:45", "startTime": "09:00", "isActive": true},
      {"id": "2", "timeRange": "10:00 - 10:45", "startTime": "10:00", "isActive": true},
      {"id": "3", "timeRange": "13:00 - 13:45", "startTime": "13:00", "isActive": true},
      {"id": "4", "timeRange": "14:00 - 14:45", "startTime": "14:00", "isActive": true}
    ]'::jsonb,
    disabled_dates TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
    custom_notes TEXT DEFAULT 'Sesi konseling tatap muka diadakan di Ruang Bimbingan Konseling (BK). Harap hadir 5 menit sebelum waktu yang dipilih.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT counselor_availability_guru_id_key UNIQUE(guru_id)
);

-- ─── STEP 3: Functions & Triggers ─────────────────────────────

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_exercise_progress_updated_at ON public.exercise_progress;
CREATE TRIGGER update_exercise_progress_updated_at
    BEFORE UPDATE ON public.exercise_progress
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_counseling_bookings_updated_at ON public.counseling_bookings;
CREATE TRIGGER update_counseling_bookings_updated_at
    BEFORE UPDATE ON public.counseling_bookings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_counselor_availability_updated_at ON public.counselor_availability_settings;
CREATE TRIGGER update_counselor_availability_updated_at
    BEFORE UPDATE ON public.counselor_availability_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Security: Prevent privilege escalation via role update
CREATE OR REPLACE FUNCTION check_role_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        IF auth.role() = 'authenticated' THEN
            IF NOT EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'superadmin'
            ) THEN
                RAISE EXCEPTION 'Not authorized to change role. Privilege escalation detected.';
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_role_not_updated ON public.profiles;
CREATE TRIGGER ensure_role_not_updated
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION check_role_update();

-- ─── STEP 4: Performance Indexes ──────────────────────────────
CREATE INDEX IF NOT EXISTS idx_exercise_progress_student_id ON public.exercise_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_counseling_bookings_student_id ON public.counseling_bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_counseling_bookings_guru_id ON public.counseling_bookings(guru_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id ON public.chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_receiver_id ON public.chat_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON public.assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ─── STEP 5: Row Level Security (RLS) ─────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counseling_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselor_availability_settings ENABLE ROW LEVEL SECURITY;

-- ─── STEP 6: RLS Policies ─────────────────────────────────────

-- Profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Superadmins can update all profiles" ON public.profiles;
CREATE POLICY "Superadmins can update all profiles" ON public.profiles
    FOR UPDATE
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'));

DROP POLICY IF EXISTS "Superadmins can delete profiles" ON public.profiles;
CREATE POLICY "Superadmins can delete profiles" ON public.profiles
    FOR DELETE
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'));

-- CMS Contents
DROP POLICY IF EXISTS "CMS contents are viewable by everyone" ON public.cms_contents;
CREATE POLICY "CMS contents are viewable by everyone" ON public.cms_contents
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Superadmins can insert CMS contents" ON public.cms_contents;
CREATE POLICY "Superadmins can insert CMS contents" ON public.cms_contents
    FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'));

DROP POLICY IF EXISTS "Superadmins can update CMS contents" ON public.cms_contents;
CREATE POLICY "Superadmins can update CMS contents" ON public.cms_contents
    FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'));

DROP POLICY IF EXISTS "Superadmins can delete CMS contents" ON public.cms_contents;
CREATE POLICY "Superadmins can delete CMS contents" ON public.cms_contents
    FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin'));

-- Assessments
DROP POLICY IF EXISTS "Siswa can view own assessments" ON public.assessments;
CREATE POLICY "Siswa can view own assessments" ON public.assessments
    FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can insert own assessments" ON public.assessments;
CREATE POLICY "Siswa can insert own assessments" ON public.assessments
    FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can update own assessments" ON public.assessments;
CREATE POLICY "Siswa can update own assessments" ON public.assessments
    FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Guru BK and Superadmin can view all assessments" ON public.assessments;
CREATE POLICY "Guru BK and Superadmin can view all assessments" ON public.assessments
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru_bk', 'superadmin'))
    );

-- Exercise Progress
DROP POLICY IF EXISTS "Siswa can view own progress" ON public.exercise_progress;
CREATE POLICY "Siswa can view own progress" ON public.exercise_progress
    FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can insert own progress" ON public.exercise_progress;
CREATE POLICY "Siswa can insert own progress" ON public.exercise_progress
    FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can update own progress" ON public.exercise_progress;
CREATE POLICY "Siswa can update own progress" ON public.exercise_progress
    FOR UPDATE USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Guru BK and Superadmin can view all progress" ON public.exercise_progress;
CREATE POLICY "Guru BK and Superadmin can view all progress" ON public.exercise_progress
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru_bk', 'superadmin'))
    );

-- Counseling Bookings
DROP POLICY IF EXISTS "Siswa can view own bookings" ON public.counseling_bookings;
CREATE POLICY "Siswa can view own bookings" ON public.counseling_bookings
    FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can insert own bookings" ON public.counseling_bookings;
CREATE POLICY "Siswa can insert own bookings" ON public.counseling_bookings
    FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Siswa can update own bookings" ON public.counseling_bookings;
CREATE POLICY "Siswa can update own bookings" ON public.counseling_bookings
    FOR UPDATE USING (auth.uid() = student_id) WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Guru BK can view assigned bookings" ON public.counseling_bookings;
CREATE POLICY "Guru BK can view assigned bookings" ON public.counseling_bookings
    FOR SELECT USING (auth.uid() = guru_id);

DROP POLICY IF EXISTS "Guru BK can update assigned bookings" ON public.counseling_bookings;
CREATE POLICY "Guru BK can update assigned bookings" ON public.counseling_bookings
    FOR UPDATE USING (auth.uid() = guru_id);

DROP POLICY IF EXISTS "Superadmin can view all bookings" ON public.counseling_bookings;
CREATE POLICY "Superadmin can view all bookings" ON public.counseling_bookings
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- Chat Messages
DROP POLICY IF EXISTS "Users can view their chat messages" ON public.chat_messages;
CREATE POLICY "Users can view their chat messages" ON public.chat_messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can insert chat messages as sender" ON public.chat_messages;
CREATE POLICY "Users can insert chat messages as sender" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Receivers can update chat messages to mark as read" ON public.chat_messages;
CREATE POLICY "Receivers can update chat messages to mark as read" ON public.chat_messages
    FOR UPDATE USING (auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Superadmin can view all chat messages" ON public.chat_messages;
CREATE POLICY "Superadmin can view all chat messages" ON public.chat_messages
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- Counselor Availability Settings
DROP POLICY IF EXISTS "Allow authenticated read availability settings" ON public.counselor_availability_settings;
CREATE POLICY "Allow authenticated read availability settings"
    ON public.counselor_availability_settings FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow guru insert own availability settings" ON public.counselor_availability_settings;
CREATE POLICY "Allow guru insert own availability settings"
    ON public.counselor_availability_settings FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = guru_id);

DROP POLICY IF EXISTS "Allow guru update own availability settings" ON public.counselor_availability_settings;
CREATE POLICY "Allow guru update own availability settings"
    ON public.counselor_availability_settings FOR UPDATE TO authenticated
    USING (auth.uid() = guru_id) WITH CHECK (auth.uid() = guru_id);

-- =============================================================
-- SELESAI. Struktur database berhasil dibuat.
-- Langkah berikutnya: Buat akun Superadmin via Supabase Auth
-- =============================================================

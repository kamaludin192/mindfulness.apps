-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TYPE user_role AS ENUM ('siswa', 'guru_bk', 'superadmin');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'siswa',
    full_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Cms_Contents Table
CREATE TABLE public.cms_contents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_number INTEGER NOT NULL CHECK (session_number >= 1 AND session_number <= 4),
    title TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Assessments Table
CREATE TABLE public.assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Exercise_Progress Table
CREATE TYPE exercise_status AS ENUM ('in_progress', 'completed');

CREATE TABLE public.exercise_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    session_id UUID REFERENCES public.cms_contents(id) NOT NULL,
    status exercise_status NOT NULL DEFAULT 'in_progress',
    worksheet_data JSONB,
    is_video_watched BOOLEAN NOT NULL DEFAULT false,
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, session_id)
);

-- 5. Counseling_Bookings Table
CREATE TYPE booking_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.counseling_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) NOT NULL,
    guru_id UUID REFERENCES public.profiles(id) NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Chat_Messages Table
CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_exercise_progress_updated_at
    BEFORE UPDATE ON public.exercise_progress
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_counseling_bookings_updated_at
    BEFORE UPDATE ON public.counseling_bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-----------------------------------------
-- Row Level Security (RLS)
-----------------------------------------

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counseling_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
-- Everyone can read profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);
-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
-- Users can update own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Cms_Contents
-- Everyone can view CMS contents
CREATE POLICY "CMS contents are viewable by everyone" ON public.cms_contents
    FOR SELECT USING (true);
-- Only superadmin can modify (assuming superadmin role)
CREATE POLICY "Superadmins can insert CMS contents" ON public.cms_contents
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );
CREATE POLICY "Superadmins can update CMS contents" ON public.cms_contents
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );
CREATE POLICY "Superadmins can delete CMS contents" ON public.cms_contents
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- 3. Assessments
-- Siswa can SELECT/INSERT/UPDATE their own assessments
CREATE POLICY "Siswa can view own assessments" ON public.assessments
    FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Siswa can insert own assessments" ON public.assessments
    FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Siswa can update own assessments" ON public.assessments
    FOR UPDATE USING (auth.uid() = student_id);
-- Guru BK and superadmin can view all assessments
CREATE POLICY "Guru BK and Superadmin can view all assessments" ON public.assessments
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru_bk', 'superadmin'))
    );

-- 4. Exercise_Progress
-- Siswa can SELECT/INSERT/UPDATE their own exercise progress
CREATE POLICY "Siswa can view own progress" ON public.exercise_progress
    FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Siswa can insert own progress" ON public.exercise_progress
    FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Siswa can update own progress" ON public.exercise_progress
    FOR UPDATE USING (auth.uid() = student_id);
-- Guru BK and superadmin can view all progress
CREATE POLICY "Guru BK and Superadmin can view all progress" ON public.exercise_progress
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru_bk', 'superadmin'))
    );

-- 5. Counseling_Bookings
-- Siswa can view own bookings
CREATE POLICY "Siswa can view own bookings" ON public.counseling_bookings
    FOR SELECT USING (auth.uid() = student_id);
-- Siswa can insert own bookings
CREATE POLICY "Siswa can insert own bookings" ON public.counseling_bookings
    FOR INSERT WITH CHECK (auth.uid() = student_id);
-- Siswa can update own bookings (e.g. cancel)
CREATE POLICY "Siswa can update own bookings" ON public.counseling_bookings
    FOR UPDATE USING (auth.uid() = student_id);
-- Guru BK can view bookings assigned to them
CREATE POLICY "Guru BK can view assigned bookings" ON public.counseling_bookings
    FOR SELECT USING (auth.uid() = guru_id);
-- Guru BK can update bookings assigned to them (approve/reject)
CREATE POLICY "Guru BK can update assigned bookings" ON public.counseling_bookings
    FOR UPDATE USING (auth.uid() = guru_id);
-- Superadmin can view all bookings
CREATE POLICY "Superadmin can view all bookings" ON public.counseling_bookings
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- 6. Chat_Messages
-- Siswa and Guru BK can view messages where they are sender or receiver
CREATE POLICY "Users can view their chat messages" ON public.chat_messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
-- Siswa and Guru BK can insert messages where they are the sender
CREATE POLICY "Users can insert chat messages as sender" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);
-- Receiver can update message to mark as read
CREATE POLICY "Receivers can update chat messages to mark as read" ON public.chat_messages
    FOR UPDATE USING (auth.uid() = receiver_id);
-- Superadmin can view all messages
CREATE POLICY "Superadmin can view all chat messages" ON public.chat_messages
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- Add missing columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS school TEXT,
ADD COLUMN IF NOT EXISTS nip TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Add missing columns to counseling_bookings
ALTER TABLE public.counseling_bookings
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add indexes for foreign keys (Performance optimization)
CREATE INDEX IF NOT EXISTS idx_exercise_progress_student_id ON public.exercise_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_counseling_bookings_student_id ON public.counseling_bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_counseling_bookings_guru_id ON public.counseling_bookings(guru_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id ON public.chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_receiver_id ON public.chat_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON public.assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

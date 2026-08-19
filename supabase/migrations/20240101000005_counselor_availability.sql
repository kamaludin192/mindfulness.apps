-- Migration: Counselor Availability Settings Table
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

-- Enable RLS
ALTER TABLE public.counselor_availability_settings ENABLE ROW LEVEL SECURITY;

-- Policies:
-- 1. All authenticated users (Siswa & Guru) can read availability settings
CREATE POLICY "Allow authenticated read availability settings"
ON public.counselor_availability_settings
FOR SELECT
TO authenticated
USING (true);

-- 2. Guru can insert/update their own availability settings
CREATE POLICY "Allow guru insert own availability settings"
ON public.counselor_availability_settings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = guru_id);

CREATE POLICY "Allow guru update own availability settings"
ON public.counselor_availability_settings
FOR UPDATE
TO authenticated
USING (auth.uid() = guru_id)
WITH CHECK (auth.uid() = guru_id);

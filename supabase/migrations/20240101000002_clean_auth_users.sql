-- Clean corrupted manual inserts in auth.users and auth.identities
DELETE FROM auth.identities WHERE user_id IN (SELECT id FROM auth.users WHERE email IN ('siswa@example.com', 'guru@example.com', 'admin@example.com'));
DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email IN ('siswa@example.com', 'guru@example.com', 'admin@example.com'));
DELETE FROM auth.users WHERE email IN ('siswa@example.com', 'guru@example.com', 'admin@example.com');

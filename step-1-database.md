# PROMPT TAHAP 1: DATABASE & BACKEND (Supabase)

## Instruksi untuk AI IDE:
Buatkan saya file `database-schema.sql` yang memuat struktur DDL dan Row Level Security (RLS) berdasarkan aturan berikut:

1. **Tabel Profiles:** `id` (UUID dari auth.users), `role` (siswa, guru_bk, superadmin), `full_name`.
2. **Tabel Cms_Contents:** `id`, `session_number` (1-4), `title`, `video_url` (bisa null).
3. **Tabel Assessments:** `id`, `student_id`, `mood_score` (wajib angka 1-5 constraint), `notes`.
4. **Tabel Exercise_Progress:** `id`, `student_id`, `session_id`, `status` (in_progress/completed), `worksheet_data` (TIPE DATANYA WAJIB JSONB), `points_earned`.
5. **Tabel Chat_Messages:** `id`, `sender_id`, `receiver_id`, `message`, `is_read`.

**Terapkan RLS:**
- `assessments` & `exercise_progress`: Hanya bisa di-SELECT/INSERT/UPDATE oleh `auth.uid() = student_id`.
- `chat_messages`: Hanya bisa di-SELECT oleh `auth.uid() = sender_id OR auth.uid() = receiver_id`.

Buatkan juga file `utils/supabase/client.ts` dan `utils/supabase/server.ts` standar untuk Next.js App Router.
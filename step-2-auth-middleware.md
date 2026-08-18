# PROMPT TAHAP 2: MIDDLEWARE & AUTHENTICATION

## Instruksi untuk AI IDE:
Baca `@context-master.md`. Lalu buatkan kode untuk:

1. **Middleware (`middleware.ts`):**
   - Proteksi route `/dashboard/siswa` hanya untuk role `siswa`.
   - Proteksi route `/dashboard/guru` hanya untuk role `guru_bk`.
   - Proteksi route `/admin` hanya untuk role `superadmin`.
   - Redirect unauthenticated users ke `/auth/login`.

2. **Halaman Login (`app/auth/login/page.tsx`):**
   - Layout split screen 50/50. Kiri: Gambar estetik penuh. Kanan: Form login (Email/Password) menggunakan `bg-brand-50` dan card `bg-surface`.
   - Integrasikan dengan Supabase Auth Server Actions.
   
3. **Halaman Lupa Sandi:**
   - Gunakan fitur OTP Supabase. Buat input UI untuk 6 digit OTP berjejer rapi (`gap-2`).
# PROMPT TAHAP 4: ENVIRONMENT, DEMO NGROK & DEPLOYMENT

## Instruksi untuk AI IDE:
Baca `@context-master.md`. Fokus pada tahap ini adalah menyiapkan environment variables, skrip demonstrasi klien, dan persiapan rilis ke server production. Lakukan tugas berikut:

1. **Buat file `.env.example`:**
   Pastikan memuat variabel berikut:
   - `NEXT_PUBLIC_SUPABASE_URL=`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
   - `SUPABASE_SERVICE_ROLE_KEY=`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (Catatan: Beri komentar bahwa URL ini harus diganti dengan URL Ngrok saat demo, atau domain asli saat rilis).

2. **Modifikasi `package.json` (Opsional untuk kemudahan):**
   Tambahkan skrip di bagian `"scripts"` untuk menjalankan ngrok secara cepat jika global package ngrok sudah terinstal di komputer.
   - `"demo": "ngrok http 3000"`

3. **Buat file `README.md` yang Komprehensif:**
   Tulis dokumentasi langkah demi langkah untuk developer dengan struktur berikut:

   **Bagian A: Cara Menjalankan Live Demo (Ngrok)**
   - Langkah 1: Jalankan `npm run dev`.
   - Langkah 2: Jalankan `npm run demo` (atau `ngrok http 3000`) di terminal terpisah.
   - Langkah 3: Salin *Forwarding URL* HTTPS dari Ngrok.
   - Langkah 4: **(SANGAT PENTING)** Tuliskan instruksi untuk masuk ke Dashboard Supabase -> Authentication -> URL Configuration -> Redirect URLs, lalu tambahkan URL Ngrok dengan akhiran `/*` (contoh: `https://abcd.ngrok-free.app/*`).
   - Langkah 5: Ubah `NEXT_PUBLIC_SITE_URL` di `.env.local` menjadi URL ngrok, lalu *restart* Next.js.
   
   **Bagian B: Persiapan Deployment (Production)**
   - Tuliskan langkah persiapan *build* standar Next.js (`npm run build`).
   - Tuliskan pengingat untuk mendaftarkan *environment variables* (`NEXT_PUBLIC_...`) pada panel *dashboard* platform hosting cloud (seperti Railway).
   - Tuliskan pengingat bahwa URL production (misal: `https://mindfulnessintervention.up.railway.app`) wajib didaftarkan juga ke *Redirect URLs* Supabase persis seperti saat melakukan konfigurasi Ngrok.
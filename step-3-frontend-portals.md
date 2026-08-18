# PROMPT TAHAP 3: PORTAL UI & DYNAMIC WORKSHEET

## Instruksi untuk AI IDE:
Baca `@context-master.md`. Implementasikan UI portal dengan mematuhi Clinical Constraints.

1. **Dashboard Siswa (`app/dashboard/siswa/page.tsx`):**
   - Floating CTA Chat: Harus dikunci jika total `exercise_progress` dengan status 'completed' < 4. Gunakan ikon Lock jika terkunci.
   - Asesmen Mood: 5 tombol emoji. Jika skor 1-2 gunakan warna `bg-red-100 text-red-700`.

2. **Komponen Worksheet Dinamis (`components/WorksheetForm.tsx`):**
   - Menerima props `sesiId` dan `isVideoAvailable`.
   - Jika `isVideoAvailable` false -> return `<fieldset disabled>`.
   - Jika `sesiId` 1, 2, atau 3: Render form **Tabel Dinamis** menggunakan `useState` (array of objects). Harus ada tombol "+ Tambah Catatan" dan ikon "Hapus Baris".
   - Jika `sesiId` 4: Render dua elemen `<textarea>` statis (Gratitude & Surat Cinta).
   - Data submit harus berbentuk JSON/Array untuk masuk ke Supabase kolom `worksheet_data`.

3. **Dashboard Guru BK (`app/dashboard/guru/page.tsx`):**
   - Layout sidebar kiri. Render tabel persetujuan booking dan antarmuka Chat window. Buble chat guru `bg-brand-900 text-white`, buble siswa `bg-surface border-gray-200`.
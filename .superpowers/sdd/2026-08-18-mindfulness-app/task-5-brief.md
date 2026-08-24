### Task 5: UI & Logic Siswa (Worksheet & Chat)

**Files:**
- Create: "src/app/siswa/worksheet/page.tsx"
- Create: "src/app/siswa/worksheet/actions.ts"
- Create: "src/app/siswa/chat/page.tsx"
- Create: "src/app/siswa/chat/actions.ts"
- Create: "src/components/siswa/VideoPlayer.tsx"
- Create: "src/components/siswa/WorksheetForm.tsx"
- Create: "src/components/siswa/ChatInterface.tsx"

**Interfaces:**
- Consumes: Server Actions, Supabase Realtime (untuk Chat)
- Produces: Siswa's core functionality

- [ ] **Step 1: Fitur Video & Worksheet**
Implementasikan Video Player (dukungan iframe untuk berbagai sumber). Jika video ditonton (tombol konfirmasi sederhana ditekan), simpan ke tabel Exercise_Progress.
Buat dynamic form untuk LKS (Worksheet) menggunakan desain **Card List** (Impeccable Audit).
- [ ] **Step 2: Fitur Chat & Crisis Bypass**
Buat UI Chat menggunakan Supabase Realtime untuk langganan tabel chat_messages.
Terapkan logika "Counseling Lock": Form booking konseling hanya bisa diakses (atau tombolnya aktif) jika pengguna telah menyelesaikan sesi 4. Jika terkunci, WAJIB tampilkan **Crisis Bypass** (tombol darurat hotline/bantuan psikolog).
- [ ] **Step 3: Commit**
``bash
git add .
git commit -m "feat: siswa worksheet and realtime chat"
`` 

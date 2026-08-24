### Task 2: Database Schema & Supabase Setup

**Files:**
- Create: "supabase/migrations/20240101000000_initial_schema.sql"
- Create: "supabase/seed.sql"

**Interfaces:**
- Consumes: Task 1 (Supabase client setup)
- Produces: Database tables and sample data

- [ ] **Step 1: Inisialisasi Supabase Lokal**
``bash
npx supabase init
`` 
- [ ] **Step 2: Buat Skema Tabel Utama**
Buat file migrasi untuk 6 tabel: Profiles, Cms_Contents, Assessments, Exercise_Progress, Counseling_Bookings, Chat_Messages.
- [ ] **Step 3: Tambahkan RLS (Row Level Security)**
Implementasi RLS sederhana untuk semua tabel.
- [ ] **Step 4: Seed Data**
Buat 1 akun admin, 1 akun user, beberapa dummy konten CMS, dan 1 assessment dummy di supabase/seed.sql.
- [ ] **Step 5: Mulai Supabase & Terapkan Migrasi**
``bash
npx supabase start
`` 
- [ ] **Step 6: Commit**
``bash
git add supabase/
git commit -m "feat: database schema and initial seed"
`` 

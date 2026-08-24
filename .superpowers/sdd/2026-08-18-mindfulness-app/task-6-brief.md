### Task 6: UI & Logic Guru BK (Monitoring & Approval)

**Files:**
- Create: "src/app/guru/dashboard/page.tsx"
- Create: "src/app/guru/counseling/page.tsx"
- Create: "src/app/guru/counseling/actions.ts"
- Create: "src/components/guru/StudentTable.tsx"
- Create: "src/components/guru/CounselingTable.tsx"

**Interfaces:**
- Consumes: Profiles, Exercise_Progress, Counseling_Bookings, Server Actions
- Produces: Guru BK's core functionality

- [ ] **Step 1: Dashboard Siswa (Monitoring)**
Tampilkan tabel daftar siswa (dari tabel Profiles where role=siswa).
Tambahkan antarmuka untuk melihat progress LKS siswa (query dari Exercise_Progress).
- [ ] **Step 2: Approval Konseling**
Buat halaman daftar permintaan konseling yang masuk (terutama yang status = pending).
Buat Server Action di ctions.ts untuk Guru BK dapat menerima atau menolak permintaan (mengubah status ke pproved / ejected).
- [ ] **Step 3: Commit**
``bash
git add .
git commit -m "feat: guru dashboard and counseling approval"
`` 

### Task 3: Frontend Portals & UI Layout

**Files:**
- Modify/Create: "src/app/layout.tsx"
- Modify/Create: "src/app/page.tsx"
- Create: "src/app/(auth)/login/page.tsx"
- Create: "src/app/siswa/layout.tsx"
- Create: "src/app/siswa/page.tsx"
- Create: "src/app/guru/layout.tsx"
- Create: "src/app/guru/page.tsx"

**Interfaces:**
- Consumes: Tailwind config (Task 1)
- Produces: Base routes and navigation for different roles

- [ ] **Step 1: Setup Layout Utama (src/app/layout.tsx)**
Sertakan font dan provider (jika ada).
- [ ] **Step 2: Buat Halaman Landing / Login Utama**
Di src/app/page.tsx (redirect ke login) atau src/app/(auth)/login/page.tsx (form login statis sementara).
- [ ] **Step 3: Buat Layout & Dashboard Siswa**
Sertakan komponen navigasi (Sidebar/Bottom bar) untuk portal siswa sesuai desain.
- [ ] **Step 4: Buat Layout & Dashboard Guru BK**
Sertakan komponen navigasi (Sidebar) untuk portal guru sesuai desain.
- [ ] **Step 5: Commit**
``bash
git add src/
git commit -m "feat: base UI layouts and portals"
`` 

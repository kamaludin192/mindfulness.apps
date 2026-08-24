### Task 4: Server Actions & Authentication Middleware

**Files:**
- Create: "src/lib/supabase/server.ts"
- Create: "src/lib/supabase/client.ts"
- Create: "src/middleware.ts"
- Create: "src/app/(auth)/login/actions.ts"
- Modify: "src/app/(auth)/login/page.tsx"

**Interfaces:**
- Consumes: Supabase database schemas
- Produces: Authenticated sessions, route protection, login action

- [ ] **Step 1: Setup Supabase Server/Client Utilities**
Buat utilitas createServerClient dan createBrowserClient.
- [ ] **Step 2: Middleware Auth (Route Protection)**
Proteksi /siswa/* untuk role siswa, /guru/* untuk role guru_bk/superadmin. Redirect ke /login jika tidak terautentikasi.
- [ ] **Step 3: Server Action untuk Login**
Implementasikan fungsi login dengan email/password di ctions.ts. Redirect ke dasbor yang sesuai dengan ole (diambil dari tabel Profiles).
- [ ] **Step 4: Wiring Form Login**
Hubungkan UI Login di src/app/(auth)/login/page.tsx ke Server Action.
- [ ] **Step 5: Commit**
``bash
git add .
git commit -m "feat: auth middleware and login action"
`` 

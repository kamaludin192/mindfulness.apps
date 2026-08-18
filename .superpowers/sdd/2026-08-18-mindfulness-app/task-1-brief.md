### Task 1: Project Setup & Dependencies

**Files:**
- Create: "package.json"
- Create: "tailwind.config.ts"
- Create: ".env.example"

**Interfaces:**
- Consumes: None
- Produces: Base project structure

- [ ] **Step 1: Inisialisasi Next.js & Tailwind**
``bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
`` 
- [ ] **Step 2: Install Supabase Client & UI Dependencies**
``bash
npm install @supabase/supabase-js @supabase/ssr lucide-react clsx tailwind-merge
`` 
- [ ] **Step 3: Setup .env.example**
``text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
`` 
- [ ] **Step 4: Commit**
``bash
git add .
git commit -m "chore: setup next.js 14, tailwind, and supabase dependencies"
`` 

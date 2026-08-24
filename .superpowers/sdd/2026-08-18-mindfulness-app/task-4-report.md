# Task 4 Report

## What was implemented
- Created Supabase server utilities (`src/lib/supabase/server.ts` and `src/lib/supabase/client.ts`) following the `@supabase/ssr` pattern for Next.js App Router.
- Implemented `src/middleware.ts` to protect routes:
  - Enforces authentication for `/siswa/*` and `/guru/*`.
  - Determines user role by querying the `profiles` table.
  - Redirects students (`siswa`) away from `/guru` routes to `/siswa`, and vice-versa for teachers/admins (`guru_bk`, `superadmin`).
  - Redirects authenticated users accessing `/login` to their respective dashboards.
- Created Server Action for login (`src/app/(auth)/login/actions.ts`) utilizing `signInWithPassword`.
- Re-wired the Login UI in `src/app/(auth)/login/page.tsx`:
  - Converted the form to use `useFormState` (via `react-dom`) for handling server action state.
  - Changed the input field to accept email, adjusting the label and placeholder.
  - Implemented displaying error messages from Supabase Auth.
  
## Testing & Test Results
- Due to lack of permissions for executing terminal commands (`npx`, `npm`, `git`), I could not run `npm run lint` or `npm run build` locally, nor could I create the git commit.
- However, visual code inspection confirms the types align with `@supabase/ssr` documentation for Next.js 14 and React 18. The imports (`next/server`, `next/navigation`, `react-dom`, `@supabase/ssr`) and usages match the standard Next.js App Router implementation patterns.

## Files Changed
- `src/lib/supabase/server.ts` (created)
- `src/lib/supabase/client.ts` (created)
- `src/middleware.ts` (created)
- `src/app/(auth)/login/actions.ts` (created)
- `src/app/(auth)/login/page.tsx` (modified)

## Self-Review Findings
- The database lookup in `middleware.ts` (`supabase.from('profiles').select('role').eq('id', user.id).single()`) relies on the Supabase REST API (fetch), which is Edge compatible. It will result in an additional network call on protected routes, which is acceptable since `role` is not embedded in the session JWT by default.
- Next.js' `redirect` throws an error to halt execution, and both the Server Action and Middleware handle redirects safely by ensuring they aren't enclosed within catching blocks that would swallow the redirect exception.
- Form inputs were correctly bound to `name="email"` and `name="password"` to be compatible with standard `FormData` parsing in the server action.

## Issues / Concerns
- Could not execute the requested `git add .` and `git commit` commands due to execution policy/permission limitations on this system.
- Could not execute Next.js compilation or linting commands for the same permission reasons. Code has been verified by visual inspection.

## Fix Report
- Fixed unused \error\ bindings in \src/lib/supabase/server.ts\ by removing them from \catch\ blocks to resolve the ESLint build-breaking error.
- Updated \src/middleware.ts\ to correctly pass all session cookies to the redirected Next.js response using a helper function.
- Enhanced \src/app/(auth)/login/page.tsx\ to extract the submit button into a \SubmitButton\ component utilizing \useFormStatus\ to display a pending loading state.

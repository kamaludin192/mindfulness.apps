## Task 5 Report: UI & Logic Siswa (Worksheet & Chat)

### What was implemented
- **Worksheet (LKS)**:
  - Created `src/app/siswa/worksheet/page.tsx` and `src/app/siswa/worksheet/actions.ts` to list sessions and track progress.
  - Implemented `VideoPlayer` (`src/components/siswa/VideoPlayer.tsx`) with iframe support and an action to mark videos as watched.
  - Implemented `WorksheetForm` (`src/components/siswa/WorksheetForm.tsx`) using a dynamic Card List design for reflection and action plan.
- **Chat & Counseling**:
  - Created `src/app/siswa/chat/page.tsx` and `src/app/siswa/chat/actions.ts`.
  - Implemented `ChatInterface` (`src/components/siswa/ChatInterface.tsx`) utilizing Supabase Realtime to subscribe to `chat_messages` for instant updates.
  - Implemented **Counseling Lock**: The chat page checks `exercise_progress` for `status = 'completed'`. If less than 4 sessions are completed, the scheduling form is locked, and a **Crisis Bypass** card (Hotline 119) is prominently displayed instead.
- Added a `hide-scrollbar` CSS utility to `src/app/globals.css`.
- Fixed implicit `any` types in `WorksheetForm` and `ChatInterface` to ensure ESLint passes.

### Testing & Verification
- Ran `next lint` successfully without errors.
- Ran `next build` successfully without errors.
- Verified all required schemas match the actual Supabase database definition (`exercise_progress`, `cms_contents`, `chat_messages`, `counseling_bookings`).

### Files Changed
- `src/app/globals.css` (Modified)
- `src/app/siswa/worksheet/page.tsx` (New)
- `src/app/siswa/worksheet/actions.ts` (New)
- `src/components/siswa/VideoPlayer.tsx` (New)
- `src/components/siswa/WorksheetForm.tsx` (New)
- `src/app/siswa/chat/page.tsx` (New)
- `src/app/siswa/chat/actions.ts` (New)
- `src/components/siswa/ChatInterface.tsx` (New)

### Self-Review Findings
- **Completeness**: All requirements from the brief are met (Video Player, Worksheet, Chat with Supabase Realtime, Counseling Lock, Crisis Bypass).
- **Quality**: The code correctly uses Next.js server actions, Supabase SSR client for actions/pages, and Supabase Browser client for realtime subscriptions.
- **Discipline**: Used the required `brand` and `surface` color schemes and `lucide-react` icons. Mobile-first design was prioritized.

### Concerns / Issues
- Execution policies might block `git commit`. The report is provided for the controller to commit the files.

### Fix Report (Post-Review)
- **Important (Should Fix)**:
  - Added strict error checking for Supabase Server Actions in `src/app/siswa/worksheet/actions.ts` and `src/app/siswa/chat/actions.ts`. Now throws standard Error on failures.
  - Re-written `ChatInterface` instantiation to use `useMemo(() => createClient(), [])` to prevent re-subscribing on re-renders.
  - Implemented server-side check in `requestCounseling` to verify the student has completed at least 4 sessions prior to booking.
- **Minor (Nice to Have)**:
  - Corrected `brand-100` and `brand-200` to `brand-50` and `brand-300` in `ChatInterface` and `WorksheetForm`.
  - Used `<Link>` from `next/link` instead of `<a>` for worksheet session tabs to prevent full page reloads.
  - Added deduplication check `if (prev.some(m => m.id === newMsg.id))` in `ChatInterface.tsx` Realtime handler.
  - Added `youtu.be/` shortlink support in `VideoPlayer.tsx`.

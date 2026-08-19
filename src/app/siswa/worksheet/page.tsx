import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/siswa/VideoPlayer'
import WorksheetForm from '@/components/siswa/WorksheetForm'
import { BookOpen, CheckCircle2, Sparkles, Lock, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Materi & Lembar Kerja Siswa - Mindfulness Intervention',
}

const DEFAULT_SESSIONS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    session_number: 1,
    title: 'Menyadari Napas & Tubuh (Mindful Breathing & Body Scan)',
    description: 'Latihan dasar pernapasan sadar dan pemindaian sensasi tubuh untuk meredakan ketegangan fisik.',
    video_url: '',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    session_number: 2,
    title: 'Pengenalan Pikiran & Regulasi Emosi',
    description: 'Memahami cara mengamati pikiran tanpa terbawa arus emosi dan menciptakan ruang jeda sebelum merespons.',
    video_url: '',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    session_number: 3,
    title: 'Mengelola Stres Akademik & Kecemasan',
    description: 'Strategi praktis defusi kognitif dan teknik STOP saat menghadapi beban ujian dan tugas sekolah.',
    video_url: '',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    session_number: 4,
    title: 'Welas Asih Diri (Self-Compassion) & Integrasi',
    description: 'Melatih kebaikan hati pada diri sendiri, merangkul kegagalan dengan bijak, dan membiasakan mindfulness mandiri.',
    video_url: '',
  },
]

export default async function WorksheetPage({
  searchParams,
}: {
  searchParams: { session?: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch Sessions from CMS
  const { data: dbSessions } = await supabase
    .from('cms_contents')
    .select('*')
    .order('session_number', { ascending: true })

  const sessions = dbSessions && dbSessions.length > 0 ? dbSessions : DEFAULT_SESSIONS

  // 2. Fetch Progress for All Sessions to calculate sequential locking
  const { data: allProgress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)

  const progressMap = new Map()
  allProgress?.forEach((p) => {
    progressMap.set(p.session_id, p)
  })

  // 3. Compute sequential locking status (Temporarily unlocked for assessment)
  const sessionListWithLock = sessions.map((s, index) => {
    const p = progressMap.get(s.id)
    const isCompleted = p?.status === 'completed'
    const isLocked = false // Unlocked for evaluation

    return {
      ...s,
      progress: p,
      isCompleted,
      isLocked,
      prevSessionNumber: index > 0 ? sessions[index - 1].session_number : null,
      prevSessionId: index > 0 ? sessions[index - 1].id : null,
    }
  })

  const activeSessionId = searchParams.session || sessions[0].id
  const activeSession = sessionListWithLock.find((s) => s.id === activeSessionId) || sessionListWithLock[0]
  const isCurrentSessionLocked = false // Unlocked for evaluation

  // Current active session progress
  const currentProgress = progressMap.get(activeSession.id)
  const isVideoWatched = currentProgress?.is_video_watched || true // Enabled for review
  const worksheetData = currentProgress?.worksheet_data || null
  const status = currentProgress?.status || null

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#3f5726] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Modul Pembelajaran Interaktif</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
          4 Sesi Panduan & Lembar Kerja Siswa
        </h1>
        <p className="text-xs md:text-sm text-[#2b3a1a]/70">
          Ikuti setiap sesi secara bertahap. Selesaikan materi video dan lembar kerja untuk membuka sesi berikutnya.
        </p>

        {/* Session Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          {sessionListWithLock.map((s) => {
            const isSelected = s.id === activeSession.id

            return (
              <Link
                key={s.id}
                href={`/siswa/worksheet?session=${s.id}`}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#3f5726] text-white border-[#3f5726] shadow-sm ring-2 ring-[#3f5726]/30 -translate-y-0.5'
                    : s.isLocked
                    ? 'bg-gray-100/80 border-gray-200 text-gray-400 hover:bg-gray-200/60'
                    : 'bg-[#f3f6e8]/60 border-[#d5dcc4] text-[#1e2a14] hover:bg-[#f3f6e8]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold">Sesi {s.session_number}</span>
                  {s.isCompleted ? (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#c2db8f]' : 'text-green-600'
                      }`}
                    />
                  ) : s.isLocked ? (
                    <Lock
                      className={`w-3 h-3 ${
                        isSelected ? 'text-white/70' : 'text-gray-400'
                      }`}
                    />
                  ) : null}
                </div>
                <span
                  className={`text-[10px] line-clamp-1 ${
                    isSelected
                      ? 'text-white/80'
                      : s.isLocked
                      ? 'text-gray-400'
                      : 'text-[#2b3a1a]/60'
                  }`}
                >
                  {s.isLocked ? 'Terkunci' : s.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Active Session Content Card (Locked vs Unlocked) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs relative overflow-hidden">
        {isCurrentSessionLocked ? (
          <div className="relative min-h-[420px] flex flex-col justify-center">
            {/* Blurred Background Mockup */}
            <div className="filter blur-md opacity-25 select-none pointer-events-none space-y-6">
              <div className="space-y-2 border-b border-[#d5dcc4] pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3f6e8] border border-[#d5dcc4] text-xs font-bold text-[#3f5726]">
                  <span>Sesi ke-{activeSession.session_number}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
                  {activeSession.title}
                </h2>
                <p className="text-xs md:text-sm text-[#2b3a1a]/80">
                  {activeSession.description}
                </p>
              </div>
              <div className="aspect-video w-full rounded-2xl bg-[#1e2a14]/40" />
            </div>

            {/* Locked Modal Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-10">
              <div className="max-w-md w-full p-6 md:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#d5dcc4] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold font-serif text-[#1e2a14]">
                    Sesi {activeSession.session_number} Masih Terkunci
                  </h3>
                  <p className="text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed">
                    Selesaikan video panduan dan lembar kerja pada <strong>Sesi {activeSession.prevSessionNumber}</strong> terlebih dahulu untuk membuka akses sesi ini.
                  </p>
                </div>
                {activeSession.prevSessionId && (
                  <Link
                    href={`/siswa/worksheet?session=${activeSession.prevSessionId}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl bg-[#3f5726] hover:bg-[#2b3a1a] text-white text-xs md:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <span>Kerjakan Sesi {activeSession.prevSessionNumber} Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Normal Unlocked Session Content */
          <div className="space-y-6">
            {/* Session Title Header */}
            <div className="space-y-2 border-b border-[#d5dcc4] pb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3f6e8] border border-[#d5dcc4] text-xs font-bold text-[#3f5726]">
                <span>Sesi ke-{activeSession.session_number}</span>
                {status === 'completed' && (
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-[10px]">
                    Selesai
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
                {activeSession.title}
              </h2>
              <p className="text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed">
                {activeSession.description}
              </p>
            </div>

            {/* Video Player */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1e2a14] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#3f5726]" />
                Langkah 1: Tonton Video Panduan Latihan
              </h3>
              <VideoPlayer
                sessionId={activeSession.id}
                videoUrl={activeSession.video_url || ''}
                initialWatched={isVideoWatched}
              />
            </div>

            {/* Worksheet Form */}
            {isVideoWatched && (
              <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                <WorksheetForm
                  sessionId={activeSession.id}
                  sessionNumber={activeSession.session_number || 1}
                  initialData={worksheetData}
                  status={status}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

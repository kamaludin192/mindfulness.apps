import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageSquareQuote,
  Clock,
  PlayCircle,
  HeartHandshake,
  Lock,
  BookOpen,
  Award,
} from 'lucide-react'
import MoodTracker from '@/components/siswa/MoodTracker'

export const metadata = {
  title: 'Dashboard Siswa - mindfulnessintervention.id',
}

interface SessionItem {
  id?: string
  session_number: number
  title: string
  description: string
}

const DEFAULT_SESSIONS: SessionItem[] = [
  {
    session_number: 1,
    title: 'Mindful Breathing',
    description: 'Latihan dasar pernapasan sadar untuk menenangkan sistem saraf dan melatih fokus pikiran.',
  },
  {
    session_number: 2,
    title: 'Mindful Sitting and Mindful Listening',
    description: 'Melatih kesadaran saat duduk tenang dan mendengarkan dengan penuh perhatian tanpa menghakimi.',
  },
  {
    session_number: 3,
    title: 'Body Scanning',
    description: 'Mempelajari pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.',
  },
  {
    session_number: 4,
    title: 'Gratitude and Loving in Kindness',
    description: 'Menumbuhkan rasa syukur serta memupuk cinta kasih dan kebaikan hati terhadap diri sendiri dan orang lain.',
  },
]

export default async function SiswaDashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch Student Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Siswa'
  const firstName = fullName.split(' ')[0]

  // 2. Fetch Sessions from CMS
  const { data: dbSessions } = await supabase
    .from('cms_contents')
    .select('*')
    .order('session_number', { ascending: true })

  const sessions = dbSessions && dbSessions.length > 0 ? dbSessions : DEFAULT_SESSIONS

  // 3. Fetch Student's Progress for Each Session
  const { data: progressList } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)

  const progressMap = new Map()
  progressList?.forEach((p) => {
    progressMap.set(p.session_id, p)
  })

  // Calculate sequential progression lock (Temporarily unlocked for assessment)
  const sessionListWithLock = sessions.map((s: SessionItem, index: number) => {
    const prog = s.id ? progressMap.get(s.id) : null
    const isCompleted = prog?.status === 'completed'
    const isLocked = false // Unlocked for evaluation

    return {
      ...s,
      prog,
      isCompleted,
      isLocked,
      prevSessionNumber: index > 0 ? sessions[index - 1].session_number : null,
    }
  })

  // Calculate stats
  const completedCount = progressList?.filter((p) => p.status === 'completed').length || 0
  const progressPercent = Math.round((completedCount / 4) * 100)

  // 4. Fetch Latest Daily Emotion Check-In
  const { data: latestAssessment } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // 5. Daily Affirmation
  const affirmations = [
    'Hadirlah utuh di saat ini, di sini.',
    'Setiap tarikan napas adalah kesempatan baru untuk merasa tenang.',
    'Kamu berharga, dan perasaanmu sepenuhnya valid.',
    'Tidak apa-apa untuk beristirahat sejenak saat lelah.',
  ]
  const todayAffirmation = affirmations[new Date().getDay() % affirmations.length]

  // Next recommended session
  const nextSession = sessionListWithLock.find((s) => !s.isCompleted) || sessionListWithLock[0]
  const nextSessionHref = nextSession.id
    ? `/siswa/worksheet?session=${nextSession.id}`
    : '/siswa/worksheet'

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-7">
      {/* 1. HERO GREETING BANNER - HIGH CONTRAST & CRISP */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e2f11] via-[#283e16] to-[#15230c] p-6 sm:p-8 md:p-9 text-white shadow-lg border-2 border-[#3f5726]">
        {/* Ambient Decorative Highlights */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#a3e635]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#3f5726]/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Greeting & Affirmation */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 text-xs font-bold text-[#bbf7d0] border border-[#86efac]/40 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#a3e635]" />
              <span>Mindfulness Intervention</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif tracking-tight leading-tight text-white">
                Selamat Datang, {firstName} 🌿
              </h1>
              <div className="bg-black/35 p-4 rounded-2xl border border-white/20 backdrop-blur-xs">
                <p className="text-white font-medium text-xs sm:text-sm md:text-base leading-relaxed italic">
                  &ldquo;{todayAffirmation}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-3">
              <Link
                href={nextSessionHref}
                className="inline-flex items-center gap-2 bg-[#a3e635] hover:bg-[#bef264] text-[#0f172a] px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#0f172a]" />
                <span>Lanjutkan Sesi {nextSession.session_number}</span>
                <ArrowRight className="w-4 h-4 text-[#0f172a]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Progress Card */}
          <div className="md:col-span-5 bg-black/45 backdrop-blur-md rounded-2xl p-5 border border-white/25 space-y-3.5 text-left shadow-md">
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#a3e635]" />
                Progres 4 Sesi
              </span>
              <span className="text-xs font-extrabold text-[#fef08a] font-mono bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                {completedCount}/4 Sesi
              </span>
            </div>

            {/* Progress Percentage & Bar */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold font-serif text-[#fef08a]">
                  {progressPercent}%
                </span>
                <span className="text-xs font-bold text-white">
                  {completedCount === 4 ? 'Semua Selesai 🎉' : `${4 - completedCount} Sesi Tersisa`}
                </span>
              </div>

              <div className="w-full bg-black/60 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/25">
                <div
                  className="bg-gradient-to-r from-[#a7f3d0] to-[#a3e635] h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-white font-medium leading-relaxed pt-1">
              {completedCount === 0 && 'Mulai langkah pertamamu dengan mempraktikkan Sesi 1 hari ini.'}
              {completedCount > 0 && completedCount < 4 && 'Kerja bagus! Lanjutkan latihanmu untuk memupuk ketenangan batin.'}
              {completedCount === 4 && 'Selamat! Kamu telah menyelesaikan seluruh 4 sesi intervensi mindfulness.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DAILY MOOD CHECK-IN */}
      <MoodTracker
        initialMoodScore={latestAssessment?.mood_score}
        initialNotes={latestAssessment?.notes}
        initialCreatedAt={latestAssessment?.created_at}
      />

      {/* 3. FOUR STRUCTURED SESSIONS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold font-serif text-[#0f172a]">
              4 Sesi Intervensi Mindfulness
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] font-medium">
              Ikuti setiap tahapan materi video dan lembar kerja secara terstruktur.
            </p>
          </div>
          <Link
            href="/siswa/worksheet"
            className="text-xs sm:text-sm font-bold text-[#057a44] hover:text-[#065f46] hover:underline flex items-center gap-1"
          >
            <span>Buka Semua Materi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessionListWithLock.map((sess) => {
            const isCompleted = sess.isCompleted
            const isSubmitted = sess.prog?.status === 'submitted'
            const isWatched = sess.prog?.is_video_watched
            const isLocked = sess.isLocked

            const sessionHref = sess.id
              ? `/siswa/worksheet?session=${sess.id}`
              : '/siswa/worksheet'

            if (isLocked) {
              return (
                <div
                  key={sess.session_number}
                  className="relative bg-white rounded-3xl p-5 md:p-6 border-2 border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden"
                >
                  {/* Blurred card content */}
                  <div className="filter blur-[2.5px] opacity-30 select-none pointer-events-none space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">
                          Sesi {sess.session_number}
                        </span>
                        <span className="text-[11px] text-gray-500 font-bold">Terkunci</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#0f172a]">
                        {sess.title}
                      </h3>
                      <p className="text-xs text-[#334155] line-clamp-2 leading-relaxed">
                        {sess.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-gray-500 bg-gray-100 text-center">
                        Mulai Latihan
                      </div>
                    </div>
                  </div>

                  {/* Centered Lock Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/60 backdrop-blur-[2px] z-10">
                    <div className="p-4 rounded-2xl bg-white border-2 border-amber-300 shadow-lg flex items-center gap-3 text-xs font-bold text-amber-950">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-extrabold text-sm text-[#0f172a]">Sesi Ini Masih Terkunci</p>
                        <p className="text-xs font-medium text-[#475569]">
                          Selesaikan Sesi {sess.prevSessionNumber} terlebih dahulu
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={sess.session_number}
                className="bg-white rounded-3xl p-5 md:p-6 border-2 border-[#d5dcc4] shadow-xs flex flex-col justify-between hover:border-[#3f5726] hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#f3f6e8] border border-[#d5dcc4] text-xs font-extrabold text-[#243513]">
                      Sesi {sess.session_number}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Selesai
                      </span>
                    ) : isSubmitted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                        <Clock className="w-4 h-4 text-amber-600" />
                        Menunggu Guru
                      </span>
                    ) : isWatched ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-300">
                        <PlayCircle className="w-4 h-4 text-teal-600" />
                        Isi Worksheet
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#475569] bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Belum Dimulai
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base md:text-lg text-[#0f172a]">
                    {sess.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] font-medium line-clamp-2 leading-relaxed">
                    {sess.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e2e8f0]">
                  <Link
                    href={sessionHref}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#057a44] hover:bg-[#046238] transition-all cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    <span>{isCompleted ? 'Tinjau Sesi Ini' : 'Mulai Latihan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. GURU BK COUNSELING ASSISTANCE CARD */}
      <section className="bg-white rounded-3xl p-6 md:p-7 border-2 border-[#d5dcc4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#057a44]/10 text-[#057a44] flex items-center justify-center shrink-0 border border-[#057a44]/20">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#0f172a]">
              Ruang Konseling & Curhat Guru BK
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-lg leading-relaxed">
              Memiliki hal yang mengganjal atau butuh bimbingan mendalam? Guru BK siap mendampingi perjalanan mindful-mu secara rahasia dan aman.
            </p>
          </div>
        </div>

        <Link
          href="/siswa/chat"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] text-xs sm:text-sm font-extrabold transition-all border-2 border-[#86efac] shrink-0 cursor-pointer shadow-xs"
        >
          <MessageSquareQuote className="w-4 h-4 text-[#057a44]" />
          <span>Buka Chat & Janji Temu</span>
        </Link>
      </section>
    </div>
  )
}

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
} from 'lucide-react'
import MoodTracker from '@/components/siswa/MoodTracker'

export const metadata = {
  title: 'Dashboard Siswa - Mindfulness Intervention',
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
    title: 'Menyadari Napas & Tubuh',
    description: 'Latihan dasar Mindful Breathing dan Body Scan untuk menenangkan sistem saraf dan memusatkan kesadaran saat ini.',
  },
  {
    session_number: 2,
    title: 'Pengenalan Pikiran & Regulasi Emosi',
    description: 'Memahami bahwa pikiran bukanlah fakta mutlak serta melatih respons tenang menghadapi emosi yang intens.',
  },
  {
    session_number: 3,
    title: 'Mengelola Stres Akademik & Kecemasan',
    description: 'Teknik STOP dan defusi kognitif untuk mengatasi kepanikan ujian, tugas menumpuk, dan tekanan sekolah.',
  },
  {
    session_number: 4,
    title: 'Welas Asih Diri (Self-Compassion) & Integrasi',
    description: 'Mengembangkan kebaikan hati pada diri sendiri saat gagal dan merancang rutinitas mindfulness mandiri berkelanjutan.',
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

  // Calculate stats
  const completedCount = progressList?.filter((p) => p.status === 'completed').length || 0
  const progressPercent = Math.round((completedCount / 4) * 100)

  // 4. Fetch Guru BK Info & Booking status
  const { data: existingBooking } = await supabase
    .from('counseling_bookings')
    .select('*, counselor:counselor_id(full_name)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* 1. HERO GREETING BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-[#3f5726] text-white p-6 md:p-8 shadow-md">
        {/* Background ambient shapes */}
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[#c2db8f]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-black/20 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-[#c2db8f]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ruang Tenang & Pengembangan Diri</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif">
                Halo, {firstName}! 🌱
              </h1>
            </div>

            {/* Quick Badge */}
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-right">
              <p className="text-[11px] text-white/80">Progres Intervensi</p>
              <p className="text-base font-bold font-serif text-[#c2db8f]">
                {completedCount} dari 4 Sesi Selesai
              </p>
            </div>
          </div>

          {/* Daily Affirmation */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/10 text-xs md:text-sm text-white/90 italic leading-relaxed">
            &ldquo;Hadir seutuhnya di saat ini. Tarik napas dalam-dalam, lepaskan perlahan. Setiap detik adalah ruang baru untuk ketenangan dirimu.&rdquo;
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-semibold text-white/80">
              <span>Kelengkapan Modul</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c2db8f] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE DAILY MOOD CHECK-IN */}
      <MoodTracker />

      {/* 3. FOUR STRUCTURED SESSIONS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg md:text-xl font-bold font-serif text-[#1e2a14]">
              4 Sesi Intervensi Mindfulness
            </h2>
            <p className="text-xs text-[#2b3a1a]/70">
              Ikuti setiap tahapan materi video dan lembar kerja secara runtut.
            </p>
          </div>
          <Link
            href="/siswa/worksheet"
            className="text-xs font-bold text-[#3f5726] hover:underline flex items-center gap-1"
          >
            <span>Buka Materi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((sess: SessionItem) => {
            const prog = sess.id ? progressMap.get(sess.id) : null
            const isCompleted = prog?.status === 'completed'
            const isSubmitted = prog?.status === 'submitted'
            const isWatched = prog?.is_video_watched

            const sessionHref = sess.id
              ? `/siswa/worksheet?session=${sess.id}`
              : '/siswa/worksheet'

            return (
              <div
                key={sess.session_number}
                className="bg-white rounded-3xl p-5 md:p-6 border border-[#d5dcc4] shadow-xs flex flex-col justify-between hover:border-[#3f5726]/40 hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#f3f6e8] border border-[#d5dcc4] text-[11px] font-bold text-[#3f5726]">
                      Sesi {sess.session_number}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selesai
                      </span>
                    ) : isSubmitted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        Menunggu Guru
                      </span>
                    ) : isWatched ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3f5726] bg-[#3f5726]/10 px-2.5 py-0.5 rounded-full border border-[#3f5726]/20">
                        <PlayCircle className="w-3.5 h-3.5" />
                        Isi Worksheet
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#2b3a1a]/60">
                        Belum Dimulai
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#1e2a14]">
                    {sess.title}
                  </h3>
                  <p className="text-xs text-[#2b3a1a]/70 line-clamp-2 leading-relaxed">
                    {sess.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#d5dcc4]/60">
                  <Link
                    href={sessionHref}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] transition-all cursor-pointer shadow-xs"
                  >
                    <span>{isCompleted ? 'Tinjau Sesi Ini' : 'Mulai Latihan'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. GURU BK COUNSELING ASSISTANCE CARD */}
      <section className="bg-white rounded-3xl p-6 md:p-7 border border-[#d5dcc4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-[#1e2a14]">
              Ruang Konseling & Curhat Guru BK
            </h3>
            <p className="text-xs text-[#2b3a1a]/70 leading-relaxed max-w-md">
              Merasa terbebani atau butuh teman bercerita? Guru Bimbingan Konseling (BK) siap mendengarkan tanpa menghakimi.
            </p>
            {existingBooking && (
              <p className="text-[11px] font-semibold text-[#3f5726] pt-1">
                Status Janji Temu: <span className="uppercase">{existingBooking.status}</span>
              </p>
            )}
          </div>
        </div>

        <Link
          href="/siswa/chat"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] transition-all hover:shadow-md shrink-0 cursor-pointer"
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Buka Chat Guru BK</span>
        </Link>
      </section>
    </div>
  )
}

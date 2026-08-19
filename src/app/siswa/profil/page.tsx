import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Mail,
  Shield,
  Calendar,
  Award,
  LogOut,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Profil Siswa - Mindfulness Intervention',
}

const SESSIONS_OVERVIEW = [
  { num: 1, title: 'Menyadari Napas & Tubuh' },
  { num: 2, title: 'Pengenalan Pikiran & Regulasi Emosi' },
  { num: 3, title: 'Mengelola Stres Akademik & Kecemasan' },
  { num: 4, title: 'Welas Asih Diri (Self-Compassion) & Integrasi' },
]

export default async function SiswaProfilPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: progressList } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)

  const completedCount = progressList?.filter((p) => p.status === 'completed').length || 0
  const submittedCount = progressList?.length || 0

  async function handleLogout() {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Siswa'
  const email = user.email || '-'
  const joinedDate = new Date(profile?.created_at || user.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#3f5726] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-md shrink-0">
          {fullName.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
              {fullName}
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#3f5726]/10 text-[#3f5726] text-xs font-semibold border border-[#3f5726]/20">
              Siswa Terdaftar
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#2b3a1a]/70 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            <Mail className="w-3.5 h-3.5 text-[#3f5726]" />
            <span>{email}</span>
          </p>
          <p className="text-xs text-[#2b3a1a]/60 flex items-center justify-center sm:justify-start gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#3f5726]" />
            <span>Bergabung sejak {joinedDate}</span>
          </p>
        </div>

        <form action={handleLogout}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs md:text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#d5dcc4] shadow-xs space-y-1">
          <div className="w-9 h-9 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center mb-2">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#2b3a1a]/70 font-medium">Sesi Selesai</p>
          <p className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
            {completedCount} <span className="text-xs font-normal text-[#2b3a1a]/60">/ 4 Sesi</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#d5dcc4] shadow-xs space-y-1">
          <div className="w-9 h-9 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center mb-2">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#2b3a1a]/70 font-medium">Lembar Kerja</p>
          <p className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
            {submittedCount} <span className="text-xs font-normal text-[#2b3a1a]/60">Tersimpan</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#d5dcc4] shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center mb-2">
            <Shield className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#2b3a1a]/70 font-medium">Status Akun</p>
          <p className="text-sm font-bold text-[#3f5726] pt-1">
            Aktif & Terverifikasi
          </p>
        </div>
      </div>

      {/* 4 Sessions Status Breakdown */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-bold font-serif text-[#1e2a14]">
              Riwayat Pembelajaran 4 Sesi
            </h2>
            <p className="text-xs text-[#2b3a1a]/70">
              Pantau kelengkapan materi dan pengerjaan lembar kerja Anda.
            </p>
          </div>
          <Link
            href="/siswa/worksheet"
            className="text-xs font-bold text-[#3f5726] hover:underline flex items-center gap-1"
          >
            <span>Buka Modul</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5 pt-1">
          {SESSIONS_OVERVIEW.map((s) => {
            const isFinished = completedCount >= s.num
            return (
              <div
                key={s.num}
                className="p-3.5 rounded-2xl border border-[#d5dcc4] bg-[#f8fafc] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#f3f6e8] border border-[#d5dcc4] flex items-center justify-center text-xs font-bold text-[#3f5726]">
                    {s.num}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-[#1e2a14]">
                    {s.title}
                  </span>
                </div>

                {isFinished ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Selesai
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2b3a1a]/60 shrink-0">
                    <Clock className="w-3 h-3" />
                    Belum Selesai
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Account Info Box */}
      <div className="bg-[#f3f6e8] rounded-3xl p-6 border border-[#d5dcc4] text-xs text-[#2b3a1a]/80 space-y-2">
        <h3 className="font-bold text-sm text-[#1e2a14] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#3f5726]" />
          Jaminan Keamanan & Privasi Data
        </h3>
        <p className="leading-relaxed">
          Seluruh catatan latihan mindfulness, lembar refleksi emosi, dan percakapan bimbingan konseling Anda terlindungi dengan enkripsi privat dan hanya dapat diakses oleh Anda serta Guru BK sekolah yang bertugas.
        </p>
      </div>
    </div>
  )
}

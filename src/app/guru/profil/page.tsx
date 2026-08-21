import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import GuruProfileEditor from '@/components/guru/GuruProfileEditor'
import {
  Mail,
  Shield,
  Calendar,
  Users,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  GraduationCap,
  Sparkles,
  CreditCard,
} from 'lucide-react'
import { logoutAction } from './actions'

export const metadata = {
  title: 'Profil Guru BK - mindfulnessintervention.id',
}

export default async function GuruProfilPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch Guru Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 2. Fetch stats
  const { count: studentCount } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'siswa')

  const { data: bookings } = await supabase
    .from('counseling_bookings')
    .select('id, status')
    .eq('guru_id', user.id)

  const { count: completedWorksheetsCount } = await supabase
    .from('exercise_progress')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'completed')

  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Guru BK'
  const nip = user.user_metadata?.nip || ''
  const email = user.email || '-'
  const joinedDate = new Date(profile?.created_at || user.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const totalBookings = bookings?.length || 0
  const pendingBookings = bookings?.filter((b) => b.status === 'pending').length || 0

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#d5dcc4] shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1e2f11] to-[#057a44] text-white flex items-center justify-center text-3xl font-serif font-extrabold shadow-md shrink-0 border-2 border-[#a3e635]/40">
            {fullName.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold font-serif text-[#0f172a]">
                {fullName}
              </h1>
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-[#065f46] text-xs font-extrabold border border-emerald-200">
                Guru BK Terverifikasi
              </span>
            </div>

            {nip && (
              <p className="text-xs text-[#475569] font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#057a44]" />
                <span>NIP: {nip}</span>
              </p>
            )}

            <p className="text-xs md:text-sm text-[#475569] flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#057a44]" />
              <span>{email}</span>
            </p>

            <p className="text-xs text-[#64748b] flex items-center justify-center sm:justify-start gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#057a44]" />
              <span>Pendidik Terdaftar sejak {joinedDate}</span>
            </p>
          </div>
        </div>

        {/* Edit Profile Action */}
        <GuruProfileEditor
          initialName={fullName}
          initialNip={nip}
          email={email}
        />
      </div>

      {/* 2. STATS KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-1">
          <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#475569] font-bold">Total Siswa Bimbingan</p>
          <p className="text-2xl md:text-3xl font-extrabold font-serif text-[#0f172a]">
            {studentCount ?? 0}
          </p>
          <p className="text-[11px] text-[#057a44] font-medium">Terdaftar di platform</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-1">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#057a44] flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#475569] font-bold">Worksheet Siswa Selesai</p>
          <p className="text-2xl md:text-3xl font-extrabold font-serif text-[#0f172a]">
            {completedWorksheetsCount ?? 0}
          </p>
          <p className="text-[11px] text-[#057a44] font-medium">Progres modul intervensi</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-1">
          <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <CalendarCheck2 className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#475569] font-bold">Sesi Konseling Siswa</p>
          <p className="text-2xl md:text-3xl font-extrabold font-serif text-[#0f172a]">
            {totalBookings}
          </p>
          <p className="text-[11px] text-amber-700 font-medium">
            {pendingBookings} menunggu persetujuan
          </p>
        </div>
      </div>

      {/* 3. QUICK SHORTCUTS & LOGOUT */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#d5dcc4] shadow-xs space-y-4">
        <h2 className="font-serif font-extrabold text-base text-[#0f172a]">
          Pengaturan & Navigasi Cepat
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/guru/jadwal"
            className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#057a44] hover:bg-[#f3f6e8] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#057a44] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#0f172a] group-hover:text-[#057a44]">
                  CMS Ketersediaan Jadwal
                </p>
                <p className="text-[11px] text-[#475569]">Atur slot hari dan jam konseling</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#057a44] transition-colors" />
          </Link>

          <Link
            href="/guru/counseling"
            className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#057a44] hover:bg-[#f3f6e8] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <CalendarCheck2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#0f172a] group-hover:text-[#057a44]">
                  Kelola Jadwal Konseling
                </p>
                <p className="text-[11px] text-[#475569]">Konfirmasi permohonan siswa</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#057a44] transition-colors" />
          </Link>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-[#e2e8f0] flex justify-end">
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar dari Akun Guru BK</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

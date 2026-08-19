import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ChatInterface from '@/components/siswa/ChatInterface'
import {
  MessageSquareQuote,
  PhoneCall,
  Calendar,
  Lock,
} from 'lucide-react'
import { requestCounseling } from './actions'

export const metadata = {
  title: 'Konseling & Chat BK - Siswa',
}

export default async function ChatPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Get completed sessions count for Counseling Lock
  const { count } = await supabase
    .from('exercise_progress')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)
    .eq('status', 'completed')

  const completedSessions = count || 0
  const isLocked = completedSessions < 4

  // 2. Find a Guru BK to chat with
  const { data: guruList } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'guru_bk')
    .limit(1)

  const guru = guruList?.[0] || {
    id: 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
    full_name: 'Budi Santoso, S.Pd (Guru BK)',
  }

  // 3. Fetch initial chat messages
  const { data: initialMessages } = await supabase
    .from('chat_messages')
    .select('*')
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${guru.id}),and(sender_id.eq.${guru.id},receiver_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true })

  // 4. Fetch booking status
  const { data: existingBookings } = await supabase
    .from('counseling_bookings')
    .select('*')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  const existingBooking = existingBookings?.[0]

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#3f5726] uppercase tracking-wider">
          <MessageSquareQuote className="w-4 h-4" />
          <span>Layanan Bimbingan & Konseling Sekolah</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold font-serif text-[#1e2a14]">
          Ruang Konseling & Chat Guru BK
        </h1>
        <p className="text-xs md:text-sm text-[#2b3a1a]/70">
          Gunakan ruang ini untuk berkonsultasi, bercerita mengenai tantangan emosi, atau mengajukan janji temu tatap muka bersama Guru BK.
        </p>
      </div>

      {/* Counseling Booking Status / Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-bold font-serif text-[#1e2a14] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#3f5726]" />
            Pengajuan Jadwal Konseling Tatap Muka
          </h3>
          <span className="text-[11px] text-[#2b3a1a]/60">Khusus Sesi Lanjutan</span>
        </div>

        {isLocked ? (
          <div className="p-4 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] text-xs text-[#2b3a1a]/80 space-y-3">
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#3f5726] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1e2a14]">
                  Progres Modul: {completedSessions} dari 4 Sesi Selesai
                </p>
                <p className="text-[11px] leading-relaxed pt-0.5">
                  Fitur pengajuan janji temu konseling intensif terbuka setelah menyelesaikan 4 sesi materi. Anda tetap dapat mengirimkan pesan melalui ruang chat di bawah ini kapan saja.
                </p>
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="pt-2 border-t border-[#d5dcc4]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] text-[#2b3a1a]/70">
                Butuh bantuan krisis darurat segera?
              </span>
              <a
                href="tel:119"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shrink-0 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Hotline 119</span>
              </a>
            </div>
          </div>
        ) : existingBooking ? (
          <div className="p-4 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1e2a14]">Status Pengajuan:</span>
              <span
                className={`px-3 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  existingBooking.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : existingBooking.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {existingBooking.status}
              </span>
            </div>
            <p className="text-[11px] text-[#2b3a1a]/70">
              Waktu yang diajukan:{' '}
              <strong>
                {new Date(existingBooking.scheduled_at).toLocaleString('id-ID', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </strong>
            </p>
          </div>
        ) : (
          <form
            action={async (formData) => {
              'use server'
              const date = formData.get('date') as string
              if (date) {
                await requestCounseling(guru.id, new Date(date).toISOString())
              }
            }}
            className="flex flex-col sm:flex-row gap-3 items-end"
          >
            <div className="flex-1 space-y-1.5 w-full">
              <label htmlFor="counselingDate" className="text-xs font-semibold text-[#1e2a14]">
                Pilih Tanggal & Jam Konseling
              </label>
              <input
                id="counselingDate"
                type="datetime-local"
                name="date"
                required
                className="w-full p-3 border border-[#d5dcc4] rounded-2xl text-xs md:text-sm bg-[#f8fafc] text-[#1e2a14] focus:outline-none focus:ring-2 focus:ring-[#3f5726]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#3f5726] hover:bg-[#2b3a1a] text-white font-semibold text-xs md:text-sm rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Ajukan Jadwal
            </button>
          </form>
        )}
      </div>

      {/* Realtime Chat Interface */}
      <ChatInterface
        currentUserId={user.id}
        guruId={guru.id}
        guruName={guru.full_name || 'Guru BK'}
        initialMessages={initialMessages || []}
      />
    </div>
  )
}

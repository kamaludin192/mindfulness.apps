import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ChatInterface from '@/components/siswa/ChatInterface'
import {
  MessageSquareQuote,
  PhoneCall,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Trash2,
  UserCheck,
} from 'lucide-react'
import { requestCounseling, cancelCounseling } from './actions'

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

  // 1. Find a Guru BK to chat with
  const { data: guruList } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'guru_bk')
    .limit(1)

  const guru = guruList?.[0] || {
    id: 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
    full_name: 'Budi Santoso, S.Pd (Guru BK)',
  }

  // 2. Fetch initial chat messages
  const { data: initialMessages } = await supabase
    .from('chat_messages')
    .select('*')
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${guru.id}),and(sender_id.eq.${guru.id},receiver_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true })

  // 3. Fetch booking status
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
          Gunakan ruang ini untuk berkonsultasi secara aman dan mengajukan jadwal temu bimbingan tatap muka bersama Guru BK.
        </p>
      </div>

      {/* Counseling Booking Form / Status (Unlocked for Assessment) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d5dcc4] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d5dcc4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold font-serif text-[#1e2a14]">
                Pengajuan Jadwal Konseling
              </h2>
              <p className="text-[11px] text-[#2b3a1a]/70">
                Pilih waktu temu konseling tatap muka di ruang BK sekolah
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3f5726] bg-[#f3f6e8] px-3 py-1 rounded-full border border-[#d5dcc4] self-start sm:self-auto">
            <UserCheck className="w-3.5 h-3.5" />
            Konselor: {guru.full_name || 'Guru BK'}
          </span>
        </div>

        {existingBooking ? (
          <div className="p-4 sm:p-5 bg-[#f8fafc] rounded-2xl border border-[#d5dcc4] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-[#2b3a1a]/60 uppercase tracking-wider">
                  Status Pengajuan Jadwal:
                </p>
                <div className="flex items-center gap-2">
                  {existingBooking.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full border border-green-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Jadwal Disetujui & Dikonfirmasi
                    </span>
                  ) : existingBooking.status === 'rejected' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-800 bg-red-100 px-3 py-1 rounded-full border border-red-200">
                      Jadwal Ditolak / Perlu Disesuaikan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      Menunggu Konfirmasi Guru BK
                    </span>
                  )}
                </div>
              </div>

              {/* Cancel Button */}
              <form
                action={async () => {
                  'use server'
                  await cancelCounseling(existingBooking.id)
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Batalkan Pengajuan</span>
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-[#d5dcc4]/60 text-xs md:text-sm text-[#1e2a14] space-y-1">
              <p>
                Waktu yang diajukan:{' '}
                <strong className="text-[#3f5726]">
                  {new Date(existingBooking.scheduled_at).toLocaleString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  WIB
                </strong>
              </p>
              <p className="text-[11px] text-[#2b3a1a]/70">
                Lokasi: <strong>Ruang Bimbingan & Konseling (BK)</strong>
              </p>
            </div>
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
            className="flex flex-col sm:flex-row gap-3.5 items-end"
          >
            <div className="flex-1 space-y-1.5 w-full">
              <label htmlFor="counselingDate" className="text-xs font-semibold text-[#1e2a14] block">
                Pilih Tanggal & Waktu Konseling
              </label>
              <input
                id="counselingDate"
                type="datetime-local"
                name="date"
                required
                className="w-full p-3.5 border border-[#d5dcc4] rounded-2xl text-xs md:text-sm bg-[#f8fafc] text-[#1e2a14] focus:outline-none focus:ring-2 focus:ring-[#3f5726]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#3f5726] hover:bg-[#2b3a1a] text-white font-semibold text-xs md:text-sm rounded-2xl transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Ajukan Jadwal</span>
            </button>
          </form>
        )}

        {/* Emergency Crisis Hotline Banner */}
        <div className="p-3.5 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#2b3a1a]/80">
            <PhoneCall className="w-4 h-4 text-[#3f5726] shrink-0" />
            <span>Butuh pendampingan atau bantuan krisis darurat segera?</span>
          </div>
          <a
            href="tel:119"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shrink-0 shadow-xs"
          >
            <span>Hotline 119 (24 Jam)</span>
          </a>
        </div>
      </div>

      {/* Realtime Chat Interface */}
      <div className="space-y-2">
        <h2 className="text-base md:text-lg font-bold font-serif text-[#1e2a14] px-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3f5726]" />
          <span>Ruang Percakapan Langsung</span>
        </h2>
        <ChatInterface
          currentUserId={user.id}
          guruId={guru.id}
          guruName={guru.full_name || 'Guru BK'}
          initialMessages={initialMessages || []}
        />
      </div>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ChatInterface from '@/components/siswa/ChatInterface'
import CounselingBookingCard from '@/components/siswa/CounselingBookingCard'
import {
  MessageSquareQuote,
  PhoneCall,
  Sparkles,
} from 'lucide-react'

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
    full_name: 'Dra. Endang (Guru BK)',
  }

  const counselorName = guru.full_name || 'Dra. Endang (Guru BK)'

  // 2. Fetch initial chat messages
  const { data: initialMessages } = await supabase
    .from('chat_messages')
    .select('*')
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${guru.id}),and(sender_id.eq.${guru.id},receiver_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true })

  // 3. Fetch latest booking status
  const { data: existingBookings } = await supabase
    .from('counseling_bookings')
    .select('*')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  const existingBooking = existingBookings?.[0] as {
    id: string
    scheduled_at: string
    status: 'pending' | 'approved' | 'rejected'
  } | undefined

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

      {/* Counseling Booking Form matching the reference image */}
      <div className="space-y-3">
        <CounselingBookingCard
          guruId={guru.id}
          guruName={counselorName}
          existingBooking={existingBooking}
        />

        {/* Emergency Crisis Hotline Banner */}
        <div className="max-w-lg mx-auto p-3.5 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#2b3a1a]/80">
            <PhoneCall className="w-4 h-4 text-[#3f5726] shrink-0" />
            <span>Butuh bantuan krisis darurat segera?</span>
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
          guruName={counselorName}
          initialMessages={initialMessages || []}
        />
      </div>
    </div>
  )
}

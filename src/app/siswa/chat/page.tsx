import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ChatInterface from '@/components/siswa/ChatInterface'
import { MessageSquare, PhoneCall, AlertTriangle, Calendar } from 'lucide-react'
import { requestCounseling } from './actions'

export const metadata = {
  title: 'Chat & Konseling - Siswa',
}

export default async function ChatPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  
  const guru = guruList?.[0]

  if (!guru) {
    return <div className="p-4 text-center mt-10 text-gray-500">Belum ada Guru BK yang tersedia.</div>
  }

  // 3. Fetch initial chat messages
  const { data: initialMessages } = await supabase
    .from('chat_messages')
    .select('*')
    .or(`and(sender_id.eq.${user.id},receiver_id.eq.${guru.id}),and(sender_id.eq.${guru.id},receiver_id.eq.${user.id})`)
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
    <div className="min-h-screen bg-brand-50 pb-[env(safe-area-inset-bottom)] pb-24">
      <header className="bg-brand-500 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Konseling
        </h1>
      </header>

      <main className="p-4 max-w-lg mx-auto space-y-6">
        
        {isLocked ? (
          <div className="bg-red-50 rounded-3xl p-5 border border-red-200 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-red-900">Konseling Belum Terbuka</h3>
                <p className="text-sm text-red-700 mt-1">
                  Kamu baru menyelesaikan {completedSessions} dari 4 sesi LKS. Selesaikan 4 sesi untuk membuka fitur penjadwalan konseling.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Crisis Bypass (Darurat)</h4>
              <p className="text-sm text-red-700 mb-3">Jika kamu merasa butuh bantuan mendesak, silakan hubungi:</p>
              <a 
                href="tel:119" 
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-5 h-5" />
                Hubungi Hotline 119
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 border border-brand-200 shadow-sm">
            <h3 className="font-bold text-brand-900 mb-2">Jadwalkan Konseling</h3>
            {existingBooking ? (
              <div className="bg-brand-50 p-4 rounded-xl border border-brand-100">
                <p className="text-sm text-brand-800">
                  Status pengajuan: <span className="font-bold uppercase">{existingBooking.status}</span>
                </p>
                <p className="text-xs text-brand-600 mt-1">
                  Jadwal: {new Date(existingBooking.scheduled_at).toLocaleString('id-ID')}
                </p>
              </div>
            ) : (
              <form action={async (formData) => {
                'use server'
                const date = formData.get('date') as string
                await requestCounseling(guru.id, new Date(date).toISOString())
              }} className="flex flex-col gap-3">
                <input 
                  type="datetime-local" 
                  name="date"
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-300 outline-none text-gray-800"
                />
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-brand-900 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-5 h-5" />
                  Ajukan Jadwal
                </button>
              </form>
            )}
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold text-brand-900 mb-3 ml-2 flex items-center gap-2">
            Chat dengan {guru.full_name || 'Guru BK'}
          </h2>
          <ChatInterface 
            currentUserId={user.id}
            guruId={guru.id}
            initialMessages={initialMessages || []}
          />
        </div>

      </main>
    </div>
  )
}

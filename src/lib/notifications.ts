import { SupabaseClient } from '@supabase/supabase-js'

export interface NotificationItem {
  id: string
  title: string
  description: string
  category: 'chat' | 'booking' | 'session' | 'mood'
  href: string
  createdAt: string
  isRead?: boolean
}

export async function fetchUserNotifications(
  supabase: SupabaseClient,
  userId: string,
  role: 'siswa' | 'guru_bk' | 'superadmin'
): Promise<NotificationItem[]> {
  const notifications: NotificationItem[] = []

  if (role === 'siswa') {
    // 1. Chat Notifications from Guru BK
    try {
      const { data: messages } = await supabase
        .from('chat_messages')
        .select(`
          id,
          message,
          created_at,
          sender:profiles!chat_messages_sender_id_fkey(full_name)
        `)
        .eq('receiver_id', userId)
        .order('created_at', { ascending: false })
        .limit(3)

      if (messages && messages.length > 0) {
        messages.forEach((msg) => {
          const senderName =
            (msg.sender as unknown as { full_name: string })?.full_name || 'Guru BK'
          notifications.push({
            id: `chat-${msg.id}`,
            title: `Pesan Baru dari ${senderName}`,
            description: msg.message.length > 60 ? `${msg.message.slice(0, 60)}...` : msg.message,
            category: 'chat',
            href: '/siswa/chat',
            createdAt: msg.created_at,
          })
        })
      }
    } catch (e) {
      console.warn('Error fetching student chat notifications:', e)
    }

    // 2. Counseling Booking Status Notifications
    try {
      const { data: bookings } = await supabase
        .from('counseling_bookings')
        .select(`
          id,
          scheduled_at,
          status,
          created_at,
          guru:profiles!counseling_bookings_guru_id_fkey(full_name)
        `)
        .eq('student_id', userId)
        .order('created_at', { ascending: false })
        .limit(2)

      if (bookings && bookings.length > 0) {
        bookings.forEach((b) => {
          const guruName =
            (b.guru as unknown as { full_name: string })?.full_name || 'Guru BK'
          const formattedDate = new Date(b.scheduled_at).toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })

          if (b.status === 'approved') {
            notifications.push({
              id: `booking-approved-${b.id}`,
              title: `Jadwal Konseling Disetujui ✅`,
              description: `Sesi bersama ${guruName} pada ${formattedDate} WIB telah disetujui.`,
              category: 'booking',
              href: '/siswa/chat',
              createdAt: b.created_at,
            })
          } else if (b.status === 'pending') {
            notifications.push({
              id: `booking-pending-${b.id}`,
              title: `Permohonan Konseling Terkirim ⏳`,
              description: `Menunggu konfirmasi dari ${guruName} untuk sesi ${formattedDate} WIB.`,
              category: 'booking',
              href: '/siswa/chat',
              createdAt: b.created_at,
            })
          }
        })
      }
    } catch (e) {
      console.warn('Error fetching student booking notifications:', e)
    }

    // 3. Next Session Practice Reminder
    try {
      const { data: progress } = await supabase
        .from('exercise_progress')
        .select('session_number, status')
        .eq('student_id', userId)

      const completedSessions =
        progress?.filter((p) => p.status === 'completed').map((p) => p.session_number) || []

      const SESSIONS_MAP: Record<number, string> = {
        1: 'Mindful Breathing',
        2: 'Mindful Sitting and Mindful Listening',
        3: 'Body Scanning',
        4: 'Gratitude and Loving in Kindness',
      }

      for (let s = 1; s <= 4; s++) {
        if (!completedSessions.includes(s)) {
          notifications.push({
            id: `session-reminder-${s}`,
            title: `Pengingat Latihan Sesi ${s} 🌿`,
            description: `Yuk luangkan waktu 5-10 menit untuk menyelesaikan materi "${SESSIONS_MAP[s]}".`,
            category: 'session',
            href: `/siswa/worksheet?session=${s}`,
            createdAt: new Date().toISOString(),
          })
          break
        }
      }
    } catch (e) {
      console.warn('Error calculating student session reminder:', e)
    }

    // 4. Daily Mood Check-In Reminder (if none in last 24h)
    try {
      const { data: latestMood } = await supabase
        .from('assessments')
        .select('created_at')
        .eq('student_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const now = new Date().getTime()
      const lastCheckIn = latestMood ? new Date(latestMood.created_at).getTime() : 0
      const hoursSinceLast = (now - lastCheckIn) / (1000 * 60 * 60)

      if (hoursSinceLast >= 24) {
        notifications.push({
          id: `mood-reminder-daily`,
          title: `Check-in Emosi Harian 💬`,
          description: `Bagaimana perasaan dan pikiranmu hari ini? Catat refleksi harianmu untuk pantauan diri.`,
          category: 'mood',
          href: '/siswa',
          createdAt: new Date().toISOString(),
        })
      }
    } catch (e) {
      console.warn('Error checking mood checkin reminder:', e)
    }
  } else if (role === 'guru_bk') {
    // 1. Pending Counseling Booking Requests
    try {
      const { data: pendingBookings } = await supabase
        .from('counseling_bookings')
        .select(`
          id,
          scheduled_at,
          created_at,
          student:profiles!counseling_bookings_student_id_fkey(full_name)
        `)
        .eq('guru_id', userId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5)

      if (pendingBookings && pendingBookings.length > 0) {
        pendingBookings.forEach((b) => {
          const studentName =
            (b.student as unknown as { full_name: string })?.full_name || 'Siswa'
          const formattedDate = new Date(b.scheduled_at).toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })

          notifications.push({
            id: `guru-pending-${b.id}`,
            title: `Permohonan Konseling Baru 📅`,
            description: `${studentName} mengajukan sesi konseling pada ${formattedDate} WIB.`,
            category: 'booking',
            href: '/guru/counseling',
            createdAt: b.created_at,
          })
        })
      }
    } catch (e) {
      console.warn('Error fetching guru booking notifications:', e)
    }

    // 2. Recent Chat Messages from Students
    try {
      const { data: messages } = await supabase
        .from('chat_messages')
        .select(`
          id,
          message,
          created_at,
          sender:profiles!chat_messages_sender_id_fkey(full_name)
        `)
        .eq('receiver_id', userId)
        .order('created_at', { ascending: false })
        .limit(4)

      if (messages && messages.length > 0) {
        messages.forEach((msg) => {
          const senderName =
            (msg.sender as unknown as { full_name: string })?.full_name || 'Siswa'
          notifications.push({
            id: `guru-chat-${msg.id}`,
            title: `Pesan dari ${senderName} 💬`,
            description: msg.message.length > 60 ? `${msg.message.slice(0, 60)}...` : msg.message,
            category: 'chat',
            href: '/guru/counseling',
            createdAt: msg.created_at,
          })
        })
      }
    } catch (e) {
      console.warn('Error fetching guru chat notifications:', e)
    }

    // 3. Recently Completed Worksheets
    try {
      const { data: recentWorksheets } = await supabase
        .from('exercise_progress')
        .select(`
          id,
          session_number,
          updated_at,
          student:profiles!exercise_progress_student_id_fkey(full_name)
        `)
        .eq('status', 'completed')
        .order('updated_at', { ascending: false })
        .limit(3)

      if (recentWorksheets && recentWorksheets.length > 0) {
        recentWorksheets.forEach((w) => {
          const studentName =
            (w.student as unknown as { full_name: string })?.full_name || 'Siswa'
          notifications.push({
            id: `worksheet-completed-${w.id}`,
            title: `Worksheet Selesai Disimpan 📝`,
            description: `${studentName} telah menyelesaikan pengerjaan lembar kerja Sesi ${w.session_number}.`,
            category: 'session',
            href: '/guru/dashboard',
            createdAt: w.updated_at,
          })
        })
      }
    } catch (e) {
      console.warn('Error fetching recent worksheets:', e)
    }
  }

  // Sort newest first
  return notifications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

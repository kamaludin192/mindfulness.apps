'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(receiverId: string, message: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  await supabase
    .from('chat_messages')
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      message,
    })
}

export async function requestCounseling(guruId: string, scheduledAt: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  await supabase
    .from('counseling_bookings')
    .insert({
      student_id: user.id,
      guru_id: guruId,
      scheduled_at: scheduledAt,
      status: 'pending'
    })
  
  revalidatePath('/siswa/chat')
}

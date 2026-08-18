'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(receiverId: string, message: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('chat_messages')
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      message,
    })
  if (error) throw new Error(error.message)
}

export async function requestCounseling(guruId: string, scheduledAt: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const { count } = await supabase
    .from('exercise_progress')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)
    .eq('status', 'completed')
  
  if ((count ?? 0) < 4) {
    throw new Error('Not enough completed sessions')
  }

  const { error } = await supabase
    .from('counseling_bookings')
    .insert({
      student_id: user.id,
      guru_id: guruId,
      scheduled_at: scheduledAt,
      status: 'pending'
    })
  
  if (error) throw new Error(error.message)
  
  revalidatePath('/siswa/chat')
}

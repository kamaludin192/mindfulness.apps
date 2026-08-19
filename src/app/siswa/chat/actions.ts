'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(receiverId: string, message: string) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const { error } = await supabase.from('chat_messages').insert({
    sender_id: user.id,
    receiver_id: receiverId,
    message,
  })
  if (error) throw new Error(error.message)
}

export async function requestCounseling(guruId: string, scheduledAt: string) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const { error } = await supabase.from('counseling_bookings').insert({
    student_id: user.id,
    guru_id: guruId,
    scheduled_at: scheduledAt,
    status: 'pending',
  })

  if (error) {
    console.error('Error booking counseling:', error)
    throw new Error(error.message)
  }

  revalidatePath('/siswa/chat')
}

export async function cancelCounseling(bookingId: string) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('counseling_bookings')
    .delete()
    .eq('id', bookingId)
    .eq('student_id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath('/siswa/chat')
}

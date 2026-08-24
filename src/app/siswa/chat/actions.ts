'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/services/auth.service'
import { sendChatMessage } from '@/services/chat.service'
import { requestCounselingBooking } from '@/services/counseling.service'

export async function sendMessage(receiverId: string, message: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  await sendChatMessage(user.id, receiverId, message)
}

export async function requestCounseling(guruId: string, scheduledAt: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const result = await requestCounselingBooking(user.id, guruId, scheduledAt)
  if (!result.success) {
    throw new Error(result.error || 'Failed to book counseling')
  }

  revalidatePath('/siswa/chat')
}

export async function cancelCounseling(bookingId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const supabase = createClient()
  const { error } = await supabase
    .from('counseling_bookings')
    .delete()
    .eq('id', bookingId)
    .eq('student_id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath('/siswa/chat')
}

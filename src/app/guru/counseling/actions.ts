'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser, getCurrentUserProfile } from '@/services/auth.service'
import { updateBookingStatus } from '@/services/counseling.service'

export async function updateCounselingStatus(
  bookingId: string,
  newStatus: 'approved' | 'rejected'
) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const profile = await getCurrentUserProfile()
  if (!profile || profile.role !== 'guru_bk') {
    throw new Error('Unauthorized: Only Guru BK can approve/reject counseling')
  }

  const result = await updateBookingStatus(bookingId, user.id, newStatus)
  if (!result.success) {
    throw new Error(result.error || 'Failed to update booking')
  }

  revalidatePath('/guru/counseling')
}

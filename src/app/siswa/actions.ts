'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/services/auth.service'
import { saveOrUpdateEmotionCheckIn } from '@/services/mood.service'

export async function submitEmotionCheckIn(moodScore: number, notes: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const result = await saveOrUpdateEmotionCheckIn(user.id, moodScore, notes)
  if (!result.success) {
    throw new Error(`Failed to save check-in: ${result.error}`)
  }

  revalidatePath('/siswa')
  revalidatePath('/guru')
  revalidatePath('/guru/dashboard')
  revalidatePath('/guru/refleksi')
  revalidatePath('/admin')
  revalidatePath('/admin/refleksi')

  return { success: true }
}

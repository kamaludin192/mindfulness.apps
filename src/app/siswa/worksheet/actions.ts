'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/services/auth.service'
import {
  markVideoAsWatched,
  submitStudentWorksheet,
} from '@/services/exercise.service'

export async function markVideoWatched(sessionId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  await markVideoAsWatched(user.id, sessionId)
  revalidatePath('/siswa/worksheet')
}

export async function submitWorksheet(sessionId: string, formData: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const worksheetData = JSON.parse(formData)
  await submitStudentWorksheet(user.id, sessionId, worksheetData)

  revalidatePath('/siswa/worksheet')
  revalidatePath('/siswa/chat')
}

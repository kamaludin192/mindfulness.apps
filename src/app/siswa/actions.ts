'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitEmotionCheckIn(moodScore: number, notes: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Insert a new assessment record
  const { error } = await supabase.from('assessments').insert({
    student_id: user.id,
    mood_score: moodScore,
    notes: notes?.trim() || null,
  })

  if (error) {
    console.error('Error saving emotion check-in:', error)
    throw new Error(`Failed to save check-in: ${error.message}`)
  }

  revalidatePath('/siswa')
  revalidatePath('/guru')
  revalidatePath('/guru/dashboard')
  revalidatePath('/admin')

  return { success: true }
}

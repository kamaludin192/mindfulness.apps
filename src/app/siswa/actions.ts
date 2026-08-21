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

  // Calculate start of current local/UTC day (00:00:00) for 1x24 jam daily check-in
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  // Check if student already checked in today (within the 24-hour cycle)
  const { data: todayAssessment } = await supabase
    .from('assessments')
    .select('id')
    .eq('student_id', user.id)
    .gte('created_at', startOfDay.toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (todayAssessment?.id) {
    // Update existing check-in for today
    const { error } = await supabase
      .from('assessments')
      .update({
        mood_score: moodScore,
        notes: notes?.trim() || null,
        created_at: new Date().toISOString(),
      })
      .eq('id', todayAssessment.id)

    if (error) {
      console.error('Error updating emotion check-in:', error)
      throw new Error(`Failed to update check-in: ${error.message}`)
    }
  } else {
    // Insert new daily check-in record
    const { error } = await supabase.from('assessments').insert({
      student_id: user.id,
      mood_score: moodScore,
      notes: notes?.trim() || null,
    })

    if (error) {
      console.error('Error saving emotion check-in:', error)
      throw new Error(`Failed to save check-in: ${error.message}`)
    }
  }

  revalidatePath('/siswa')
  revalidatePath('/guru')
  revalidatePath('/guru/dashboard')
  revalidatePath('/admin')

  return { success: true }
}

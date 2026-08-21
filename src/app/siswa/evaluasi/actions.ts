'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface ProgramEvaluationPayload {
  feedbackRating: 'membantu' | 'tidak_membantu'
  followUpChoice: 'selesai' | 'konseling'
  notes?: string
  scheduledAt?: string
  guruId?: string
}

export async function submitProgramEvaluation(payload: ProgramEvaluationPayload) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { feedbackRating, followUpChoice, notes, scheduledAt, guruId } = payload

  // 1. If student chose counseling, create a booking record in counseling_bookings
  if (followUpChoice === 'konseling') {
    // Find active Guru BK if guruId is not provided
    let targetGuruId = guruId
    if (!targetGuruId) {
      const { data: gurus } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'guru_bk')
        .limit(1)

      targetGuruId = gurus?.[0]?.id || 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e'
    }

    const bookingDateTime = scheduledAt || new Date(Date.now() + 86400000).toISOString()

    const { error: bookingError } = await supabase.from('counseling_bookings').insert({
      student_id: user.id,
      guru_id: targetGuruId,
      scheduled_at: bookingDateTime,
      status: 'pending',
    })

    if (bookingError) {
      console.error('Error creating counseling booking:', bookingError)
    }
  }

  // 2. Record the evaluation in assessments log so Guru BK and Admin immediately see it
  const ratingText = feedbackRating === 'membantu' ? 'MEMBANTU 👍' : 'TIDAK MEMBANTU 👎'
  const followUpText = followUpChoice === 'konseling'
    ? 'Lanjut Konseling dengan Guru BK 💬'
    : 'Selesai Latihannya (Mandiri) 🌱'

  const formattedEvaluationNote = `[Evaluasi Pasca 4 Sesi] Penilaian: ${ratingText} | Pilihan: ${followUpText}${notes ? ` | Catatan: "${notes.trim()}"` : ''}`

  const moodScore = feedbackRating === 'membantu' ? 5 : 2

  const { error: assessmentError } = await supabase.from('assessments').insert({
    student_id: user.id,
    mood_score: moodScore,
    notes: formattedEvaluationNote,
  })

  if (assessmentError) {
    console.error('Error recording assessment note for evaluation:', assessmentError)
  }

  // Revalidate all related routes
  revalidatePath('/siswa')
  revalidatePath('/siswa/chat')
  revalidatePath('/guru')
  revalidatePath('/guru/dashboard')
  revalidatePath('/guru/counseling')
  revalidatePath('/admin')
  revalidatePath('/admin/konseling')

  return { success: true }
}

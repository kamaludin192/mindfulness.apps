'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markVideoWatched(sessionId: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) throw new Error('Unauthorized')

  const { data: progress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)
    .eq('session_id', sessionId)
    .single()

  if (progress) {
    const { error } = await supabase
      .from('exercise_progress')
      .update({ is_video_watched: true })
      .eq('id', progress.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('exercise_progress')
      .insert({
        student_id: user.id,
        session_id: sessionId,
        is_video_watched: true,
        status: 'in_progress',
      })
    if (error) throw new Error(error.message)
  }

  revalidatePath('/siswa/worksheet')
}

export async function submitWorksheet(sessionId: string, formData: string) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) throw new Error('Unauthorized')

  const worksheetData = JSON.parse(formData)

  const { data: progress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', user.id)
    .eq('session_id', sessionId)
    .single()

  if (progress) {
    const { error } = await supabase
      .from('exercise_progress')
      .update({
        worksheet_data: worksheetData,
        status: 'completed',
        points_earned: 10
      })
      .eq('id', progress.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('exercise_progress')
      .insert({
        student_id: user.id,
        session_id: sessionId,
        worksheet_data: worksheetData,
        status: 'completed',
        is_video_watched: true,
        points_earned: 10
      })
    if (error) throw new Error(error.message)
  }

  revalidatePath('/siswa/worksheet')
  revalidatePath('/siswa/chat')
}

import { createClient } from '@/lib/supabase/server'
import type { SessionItem, ExerciseProgress } from '@/types/exercise'

export const DEFAULT_SESSIONS: SessionItem[] = [
  {
    session_number: 1,
    title: 'Mindful Breathing',
    description: 'Latihan dasar pernapasan sadar dan melatih fokus pikiran.',
  },
  {
    session_number: 2,
    title: 'Mindful Sitting and Mindful Listening',
    description: 'Melatih kesadaran saat duduk tenang dan mendengarkan dengan penuh perhatian tanpa menghakimi.',
  },
  {
    session_number: 3,
    title: 'Body Scanning',
    description: 'Mempelajari pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.',
  },
  {
    session_number: 4,
    title: 'Gratitude and Loving in Kindness',
    description: 'Menumbuhkan rasa syukur serta memupuk cinta kasih dan kebaikan hati terhadap diri sendiri dan orang lain.',
  },
]

export async function getStudentProgressMap(
  studentId: string
): Promise<Record<string, ExerciseProgress>> {
  const supabase = createClient()
  const { data: progressList } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', studentId)

  const map: Record<string, ExerciseProgress> = {}
  if (progressList) {
    for (const item of progressList) {
      map[String(item.session_id)] = item as ExerciseProgress
    }
  }
  return map
}

export async function markVideoAsWatched(
  studentId: string,
  sessionId: string | number
): Promise<void> {
  const supabase = createClient()
  const { data: progress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', studentId)
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
        student_id: studentId,
        session_id: sessionId,
        is_video_watched: true,
        status: 'in_progress',
      })
    if (error) throw new Error(error.message)
  }
}

export async function submitStudentWorksheet(
  studentId: string,
  sessionId: string | number,
  worksheetData: Record<string, unknown>
): Promise<void> {
  const supabase = createClient()
  const { data: progress } = await supabase
    .from('exercise_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('session_id', sessionId)
    .single()

  if (progress) {
    const { error } = await supabase
      .from('exercise_progress')
      .update({
        worksheet_data: worksheetData,
        status: 'completed',
        points_earned: 10,
      })
      .eq('id', progress.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('exercise_progress')
      .insert({
        student_id: studentId,
        session_id: sessionId,
        worksheet_data: worksheetData,
        status: 'completed',
        is_video_watched: true,
        points_earned: 10,
      })
    if (error) throw new Error(error.message)
  }
}

export async function getCompletedExercisesCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('exercise_progress')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  return count ?? 0
}

export async function getRecentSubmissions(limit = 6): Promise<ExerciseProgress[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('exercise_progress')
    .select(`
      id,
      session_id,
      status,
      points_earned,
      created_at,
      student:profiles!exercise_progress_student_id_fkey(
        full_name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  return (data || []) as unknown as ExerciseProgress[]
}

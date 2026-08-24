import { createClient } from '@/lib/supabase/server'
import type { AssessmentItem } from '@/components/shared/EmotionMonitoringView'

export async function saveOrUpdateEmotionCheckIn(
  studentId: string,
  moodScore: number,
  notes?: string | null
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  // Calculate start of current local day (00:00:00)
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  // Check if student already checked in today
  const { data: todayAssessment } = await supabase
    .from('assessments')
    .select('id')
    .eq('student_id', studentId)
    .gte('created_at', startOfDay.toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (todayAssessment?.id) {
    const { error } = await supabase
      .from('assessments')
      .update({
        mood_score: moodScore,
        notes: notes?.trim() || null,
        created_at: new Date().toISOString(),
      })
      .eq('id', todayAssessment.id)

    if (error) return { success: false, error: error.message }
  } else {
    const { error } = await supabase.from('assessments').insert({
      student_id: studentId,
      mood_score: moodScore,
      notes: notes?.trim() || null,
    })

    if (error) return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getTodayStudentCheckIn(studentId: string): Promise<{
  mood_score: number
  notes: string | null
  created_at?: string
} | null> {
  const supabase = createClient()
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const { data } = await supabase
    .from('assessments')
    .select('mood_score, notes, created_at')
    .eq('student_id', studentId)
    .gte('created_at', startOfDay.toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return data || null
}

export async function getAllAssessmentsWithStudents(): Promise<AssessmentItem[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('assessments')
    .select(`
      id,
      mood_score,
      notes,
      created_at,
      student:profiles(
        id,
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Could not fetch assessments:', error.message)
    return []
  }

  return (data || []) as unknown as AssessmentItem[]
}

export async function getRecentStudentCheckIns(studentId: string, limit = 7) {
  const supabase = createClient()
  const { data } = await supabase
    .from('assessments')
    .select('id, mood_score, notes, created_at')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(limit)

  return data || []
}

export interface SessionItem {
  id?: string
  session_number: number
  title: string
  description: string
  video_url?: string
}

export type ExerciseProgressStatus = 'in_progress' | 'completed' | 'submitted'

export interface ExerciseProgress {
  id: string
  student_id: string
  session_id: number | string
  status: ExerciseProgressStatus
  is_video_watched?: boolean
  worksheet_data?: Record<string, unknown> | null
  reflection_notes?: string | null
  worksheet_answers?: Record<string, string> | null
  points_earned: number
  created_at: string
  updated_at?: string
  student?: {
    full_name: string
  }
}

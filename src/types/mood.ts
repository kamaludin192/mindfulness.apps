export interface EmotionLog {
  id: string
  student_id: string
  student_name: string
  mood_score: number
  reflection_notes: string
  created_at: string
}

export interface MoodMeta {
  label: string
  emoji: string
  color: string
}

export const MOOD_META: Record<number, MoodMeta> = {
  1: { label: 'Sangat Buruk', emoji: '😢', color: 'bg-red-50 text-red-700 border-red-200' },
  2: { label: 'Kurang Baik', emoji: '🙁', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  3: { label: 'Biasa Saja', emoji: '😐', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  4: { label: 'Cukup Baik', emoji: '🙂', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  5: { label: 'Sangat Senang', emoji: '😄', color: 'bg-green-50 text-green-700 border-green-200' },
}

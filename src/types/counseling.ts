export type CounselingStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface CounselingBooking {
  id: string
  student_id: string
  counselor_id?: string | null
  scheduled_at: string
  status: CounselingStatus
  notes?: string | null
  created_at: string
  updated_at?: string
  student?: {
    id: string
    full_name: string
    school?: string | null
  }
  counselor?: {
    id: string
    full_name: string
  }
}

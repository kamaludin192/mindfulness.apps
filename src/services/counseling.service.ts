import { createClient } from '@/lib/supabase/server'
import type { CounselingBooking, CounselingStatus } from '@/types/counseling'
import type { AvailabilitySettingsPayload } from '@/app/guru/jadwal/actions'

export async function requestCounselingBooking(
  studentId: string,
  counselorId: string,
  scheduledAt: string,
  notes?: string
): Promise<{ success: boolean; data?: CounselingBooking; error?: string }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('counseling_bookings')
    .insert({
      student_id: studentId,
      guru_id: counselorId,
      scheduled_at: scheduledAt,
      notes: notes || null,
      status: 'pending',
    })
    .select('*')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, data: data as unknown as CounselingBooking }
}

export async function updateBookingStatus(
  bookingId: string,
  guruId: string,
  status: CounselingStatus
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  const { error } = await supabase
    .from('counseling_bookings')
    .update({ status })
    .eq('id', bookingId)
    .eq('guru_id', guruId)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}

export async function getUpcomingBookingsForGuru(guruId: string, limit = 6) {
  const supabase = createClient()
  const { data } = await supabase
    .from('counseling_bookings')
    .select(`
      id,
      scheduled_at,
      status,
      student:profiles!counseling_bookings_student_id_fkey(
        full_name
      )
    `)
    .eq('guru_id', guruId)
    .order('scheduled_at', { ascending: true })
    .limit(limit)

  return data || []
}

export async function getAllBookingsForGuru(guruId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('counseling_bookings')
    .select(`
      id,
      scheduled_at,
      status,
      notes,
      created_at,
      student:profiles!counseling_bookings_student_id_fkey(
        id,
        full_name,
        school,
        phone
      )
    `)
    .eq('guru_id', guruId)
    .order('scheduled_at', { ascending: false })

  if (error) {
    console.warn('Error fetching guru bookings:', error.message)
  }
  return data || []
}

export async function getAllBookingsForAdmin() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('counseling_bookings')
    .select(`
      id,
      scheduled_at,
      status,
      notes,
      created_at,
      student:profiles!counseling_bookings_student_id_fkey(
        id,
        full_name,
        school
      ),
      guru:profiles!counseling_bookings_guru_id_fkey(
        id,
        full_name
      )
    `)
    .order('scheduled_at', { ascending: false })

  if (error) {
    console.warn('Error fetching all bookings for admin:', error.message)
  }
  return data || []
}

export async function getCounselorAvailability(guruId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('counselor_availability_settings')
    .select('*')
    .eq('guru_id', guruId)
    .maybeSingle()

  return data || null
}

export async function saveCounselorAvailability(
  guruId: string,
  payload: AvailabilitySettingsPayload
) {
  const supabase = createClient()
  return await supabase
    .from('counselor_availability_settings')
    .upsert(
      {
        guru_id: guruId,
        active_days: payload.activeDays,
        time_slots: payload.timeSlots,
        disabled_dates: payload.disabledDates,
        custom_notes: payload.customNotes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'guru_id' }
    )
}

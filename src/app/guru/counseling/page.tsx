import React from "react";
import { createClient } from "@/lib/supabase/server";
import { CounselingTable } from "@/components/guru/CounselingTable";

export default async function CounselingPage() {
  const supabase = createClient();
  
  // We need to fetch bookings assigned to this Guru BK
  // RLS will only allow guru to see their own, but we'll fetch anyway.
  
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return <div>Silakan login sebagai Guru BK.</div>;
  }

  // Fetch bookings with student profiles
  const { data: bookings, error } = await supabase
    .from('counseling_bookings')
    .select(`
      id,
      student_id,
      guru_id,
      scheduled_at,
      status,
      student:profiles!counseling_bookings_student_id_fkey(
        full_name
      )
    `)
    .eq('guru_id', user.user.id)
    .order('scheduled_at', { ascending: true });

  if (error) {
    throw new Error(`Error fetching counseling bookings: ${error.message}`);
  }

  // Transform the response slightly for the component
  const formattedBookings = bookings?.map((b) => ({
    id: b.id,
    student_id: b.student_id,
    guru_id: b.guru_id,
    scheduled_at: b.scheduled_at,
    status: b.status,
    student_profile: b.student as unknown as { full_name: string }
  })) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Persetujuan Konseling</h1>
          <p className="text-brand-700">Kelola permintaan sesi konseling dari siswa</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-brand-300 overflow-hidden">
        <CounselingTable bookings={formattedBookings as any} />
      </div>
    </div>
  );
}

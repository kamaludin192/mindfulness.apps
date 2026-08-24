import { createClient } from "@/lib/supabase/server";
import { CounselingTable } from "@/components/guru/CounselingTable";
import { CalendarCheck2 } from "lucide-react";

export default async function CounselingPage() {
  const supabase = createClient();
  
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-base text-[#0f172a]">Silakan login sebagai Guru BK.</p>
      </div>
    );
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
    .order('scheduled_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching counseling bookings: ${error.message}`);
  }

  const formattedBookings = bookings?.map((b) => ({
    id: b.id,
    student_id: b.student_id,
    guru_id: b.guru_id,
    scheduled_at: b.scheduled_at,
    status: b.status,
    student_profile: b.student as unknown as { full_name: string }
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#065f46] border border-emerald-200 mb-2">
            <CalendarCheck2 className="w-3.5 h-3.5" />
            <span>Layanan Konseling Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            Persetujuan & Jadwal Konseling
          </h1>
          <p className="text-xs sm:text-sm text-[#334155] font-medium">
            Kelola permintaan sesi bimbingan konseling dan konfirmasi waktu sesi online bersama siswa.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xs border-2 border-[#d5dcc4] overflow-hidden">
        <CounselingTable bookings={formattedBookings as unknown as Parameters<typeof CounselingTable>[0]["bookings"]} />
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { StudentTable } from "@/components/guru/StudentTable";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Monitoring Progres Siswa - Superadmin CMS",
};

export default async function AdminMonitoringSesiPage() {
  const supabase = createClient();
  
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-base text-[#0f172a]">Silakan login sebagai Superadmin.</p>
      </div>
    );
  }

  // Fetch exactly like Guru BK does
  const { data: studentsWithProgress, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      created_at,
      exercise_progress(
        id,
        session_id,
        status,
        points_earned
      ),
      assessments(
        id,
        mood_score,
        notes,
        created_at
      )
    `)
    .eq('role', 'siswa')
    .order('full_name', { ascending: true });

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-3xl border border-red-200">
        <p className="font-bold text-red-700">Gagal memuat data progres siswa.</p>
        <p className="text-xs text-red-600 mt-2">{error.message}</p>
        <p className="text-xs text-red-600 mt-1">Pastikan skema database dan cache sudah diperbarui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Audit Progres & Worksheet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            Monitoring Sesi Siswa
          </h1>
          <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
            Pantau tingkat partisipasi, penyelesaian lembar kerja pada 4 sesi intervensi, dan perolehan poin dari seluruh siswa secara real-time.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xs border-2 border-slate-200 overflow-hidden">
        <StudentTable students={studentsWithProgress as unknown as Parameters<typeof StudentTable>[0]["students"]} />
      </div>
    </div>
  );
}

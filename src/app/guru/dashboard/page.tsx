import { createClient } from "@/lib/supabase/server";
import { StudentTable } from "@/components/guru/StudentTable";
import { Users } from "lucide-react";

export default async function GuruDashboardMonitoring() {
  const supabase = createClient();
  
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-base text-[#0f172a]">Silakan login sebagai Guru BK.</p>
      </div>
    );
  }

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
     throw new Error(`Error fetching students progress: ${error.message}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#065f46] border border-emerald-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Manajemen Peserta Didik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            Monitoring Progres Siswa
          </h1>
          <p className="text-xs sm:text-sm text-[#334155] font-medium">
            Pantau partisipasi, penyelesaian 4 modul intervensi, dan perolehan poin siswa secara real-time.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xs border-2 border-[#d5dcc4] overflow-hidden">
        <StudentTable students={studentsWithProgress as unknown as Parameters<typeof StudentTable>[0]["students"]} />
      </div>
    </div>
  );
}

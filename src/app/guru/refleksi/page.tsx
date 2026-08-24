import { createClient } from "@/lib/supabase/server";
import EmotionMonitoringView, { type AssessmentItem } from "@/components/shared/EmotionMonitoringView";
import { HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Monitoring Emosi & Refleksi Siswa - Portal Guru BK",
};

export default async function GuruEmotionMonitoringPage() {
  const supabase = createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.user) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-base text-[#0f172a]">Silakan login sebagai Guru BK.</p>
      </div>
    );
  }

  // Fetch all assessments with student profiles
  const { data: assessments, error } = await supabase
    .from("assessments")
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
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Could not fetch assessments:", error.message);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#065f46] border border-emerald-200 mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Manajemen Afektif & Kesejahteraan Siswa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            Monitoring Check-in Emosi & Refleksi
          </h1>
          <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
            Pantau suasana hati harian, tren perkembangan afektif, dan catatan refleksi mendalam siswa untuk deteksi dini serta pendampingan bimbingan konseling yang tepat sasaran.
          </p>
        </div>
      </div>

      {/* Interactive Monitoring View */}
      <EmotionMonitoringView
        assessments={(assessments || []) as unknown as AssessmentItem[]}
        role="guru"
      />
    </div>
  );
}

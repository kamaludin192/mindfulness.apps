import EmotionMonitoringView from "@/components/shared/EmotionMonitoringView";
import { HeartHandshake } from "lucide-react";
import { requireAuth } from "@/services/auth.service";
import { getAllAssessmentsWithStudents } from "@/services/mood.service";

export const metadata = {
  title: "Monitoring Emosi & Refleksi Siswa - Portal Guru BK",
};

export default async function GuruEmotionMonitoringPage() {
  await requireAuth(["guru_bk", "superadmin"]);
  const assessments = await getAllAssessmentsWithStudents();

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
        assessments={assessments}
        role="guru"
      />
    </div>
  );
}

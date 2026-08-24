import EmotionMonitoringView from "@/components/shared/EmotionMonitoringView";
import { Activity } from "lucide-react";
import { getAllAssessmentsWithStudents } from "@/services/mood.service";

export const metadata = {
  title: "Log Emosi & Refleksi Siswa - Superadmin CMS",
};

export default async function AdminEmotionMonitoringPage() {
  const assessments = await getAllAssessmentsWithStudents();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Audit Kesejahteraan & Refleksi Siswa</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          Log Check-in Emosi & Catatan Refleksi
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Audit menyeluruh data check-in suasana hati dan catatan refleksi peserta didik di seluruh ekosistem aplikasi secara real-time.
        </p>
      </div>

      {/* Interactive Monitoring View */}
      <EmotionMonitoringView
        assessments={assessments}
        role="admin"
      />
    </div>
  );
}

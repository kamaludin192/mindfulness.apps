import ScheduleCmsForm from "@/components/guru/ScheduleCmsForm";
import { SlidersHorizontal } from "lucide-react";
import { type AvailabilitySettingsPayload } from "./actions";
import { requireAuth } from "@/services/auth.service";
import { getCounselorAvailability } from "@/services/counseling.service";

export const metadata = {
  title: "Pengaturan Jadwal Konseling - Portal Guru BK",
};

export default async function GuruScheduleCmsPage() {
  const { user } = await requireAuth(["guru_bk", "superadmin"]);

  // Fetch current availability settings from Supabase
  let initialSettings: AvailabilitySettingsPayload | null = null;
  try {
    const data = await getCounselorAvailability(user.id);
    if (data) {
      initialSettings = {
        activeDays: data.active_days,
        timeSlots: data.time_slots,
        disabledDates: data.disabled_dates,
        customNotes: data.custom_notes,
      };
    }
  } catch (e) {
    console.warn("Could not fetch availability settings, using defaults.", e);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#065f46] border border-emerald-200 mb-2">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>CMS Pengaturan Jadwal Konseling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          Atur Tanggal & Jam Ketersediaan Konseling
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Kelola hari aktif, kuota jam bimbingan, tanggal libur khusus, serta petunjuk kedatangan yang akan muncul secara otomatis di form permohonan konseling portal siswa.
        </p>
      </div>

      {/* Main CMS Form */}
      <ScheduleCmsForm initialSettings={initialSettings} />
    </div>
  );
}

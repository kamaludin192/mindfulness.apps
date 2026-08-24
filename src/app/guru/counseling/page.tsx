import { CounselingTable } from "@/components/guru/CounselingTable";
import { CalendarCheck2 } from "lucide-react";
import { requireAuth } from "@/services/auth.service";
import { getAllBookingsForGuru } from "@/services/counseling.service";

export default async function CounselingPage() {
  const { user } = await requireAuth(["guru_bk", "superadmin"]);
  const bookings = await getAllBookingsForGuru(user.id);

  const formattedBookings = bookings.map((b) => ({
    id: b.id,
    student_id: (b.student as unknown as { id?: string })?.id || "",
    guru_id: user.id,
    scheduled_at: b.scheduled_at,
    status: b.status,
    student_profile: b.student as unknown as { full_name: string },
  }));

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

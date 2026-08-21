import { createClient } from "@/lib/supabase/server";
import { CalendarCheck2, Calendar, Clock, MessageSquareQuote } from "lucide-react";

export const metadata = {
  title: "Audit Konseling - Superadmin CMS",
};

export default async function AdminCounselingPage() {
  const supabase = createClient();

  const { data: bookings, error } = await supabase
    .from("counseling_bookings")
    .select(`
      id,
      student_id,
      guru_id,
      scheduled_at,
      status,
      created_at,
      student:profiles!counseling_bookings_student_id_fkey(
        full_name
      ),
      guru:profiles!counseling_bookings_guru_id_fkey(
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Could not fetch bookings:", error.message);
  }

  const allBookings = bookings || [];
  const pendingCount = allBookings.filter((b) => b.status === "pending").length;
  const approvedCount = allBookings.filter((b) => b.status === "approved").length;
  const rejectedCount = allBookings.filter((b) => b.status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-extrabold text-amber-800 border border-amber-500/30 mb-2">
          <CalendarCheck2 className="w-3.5 h-3.5" />
          <span>Audit Layanan Bimbingan Konseling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
          Audit Seluruh Sesi Konseling Siswa & Guru
        </h1>
        <p className="text-xs sm:text-sm text-[#334155] font-medium max-w-3xl leading-relaxed">
          Pantau seluruh aktivitas pengajuan jadwal temu privat antara siswa dan Guru BK di seluruh platform.
        </p>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-amber-800">Menunggu Respon</span>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-[#057a44]">Telah Disetujui</span>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">{approvedCount}</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-red-700">Ditolak / Batal</span>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">{rejectedCount}</p>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#0f172a]">
            Total {allBookings.length} Riwayat Pengajuan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#0f172a] font-bold">
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4">Guru BK</th>
                <th className="px-6 py-4">Waktu Sesi yang Dipilih</th>
                <th className="px-6 py-4 text-center">Status Jadwal</th>
                <th className="px-6 py-4 text-center">Tanggal Pengajuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allBookings.length > 0 ? (
                allBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                    <td className="px-6 py-4 font-extrabold text-[#0f172a]">
                      {(b.student as unknown as { full_name: string })?.full_name || "Siswa"}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#475569]">
                      {(b.guru as unknown as { full_name: string })?.full_name || "Dra. Endang (Guru BK)"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[#0f172a] font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[#057a44]" />
                        <span>
                          {new Date(b.scheduled_at).toLocaleDateString("id-ID", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <Clock className="w-3.5 h-3.5 text-[#057a44] ml-1.5" />
                        <span>
                          {new Date(b.scheduled_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${
                          b.status === "approved"
                            ? "bg-emerald-100 text-[#065f46] border-emerald-300"
                            : b.status === "pending"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-red-100 text-red-900 border-red-300"
                        }`}
                      >
                        {b.status === "approved"
                          ? "Disetujui"
                          : b.status === "pending"
                          ? "Menunggu"
                          : "Ditolak"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-xs text-[#475569]">
                      {new Date(b.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-slate-500">
                    <MessageSquareQuote className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    Belum ada riwayat permohonan konseling di sistem.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

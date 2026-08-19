import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  CalendarCheck2,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

export default async function GuruDashboard() {
  const supabase = createClient();

  // 1. Fetch count of students
  const { count: studentCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "siswa");

  // 2. Fetch completed exercises count
  const { count: completedExercisesCount } = await supabase
    .from("exercise_progress")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  // 3. Fetch pending counseling bookings
  const { count: pendingBookingsCount } = await supabase
    .from("counseling_bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // 4. Fetch recent student exercise submissions
  const { data: recentProgress } = await supabase
    .from("exercise_progress")
    .select(`
      id,
      session_id,
      status,
      points_earned,
      created_at,
      student:profiles!exercise_progress_student_id_fkey(
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(6);

  // 5. Fetch upcoming counseling sessions
  const { data: upcomingBookings } = await supabase
    .from("counseling_bookings")
    .select(`
      id,
      scheduled_at,
      status,
      student:profiles!counseling_bookings_student_id_fkey(
        full_name
      )
    `)
    .order("scheduled_at", { ascending: true })
    .limit(4);

  const totalStudents = studentCount ?? 0;
  const completedWorksheets = completedExercisesCount ?? 0;
  const pendingRequests = pendingBookingsCount ?? 0;

  return (
    <div className="space-y-8">
      {/* 1. HERO GREETING BANNER */}
      <section className="bg-gradient-to-br from-[#1e2f11] via-[#283e16] to-[#15230c] p-6 sm:p-8 rounded-3xl text-white shadow-md border-2 border-[#3f5726] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 text-xs font-bold text-[#bbf7d0] border border-[#86efac]/40">
            <Sparkles className="w-4 h-4 text-[#a3e635]" />
            <span>Dashboard Pembina BK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
            Selamat Datang di Portal Guru BK 🌿
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
            Pantau perkembangan mindfulness siswa, tinjau pengerjaan lembar kerja digital (LKS), dan kelola jadwal bimbingan konseling secara terstruktur dan aman.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
          <Link
            href="/guru/dashboard"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#a3e635] hover:bg-[#bef264] text-[#0f172a] text-xs sm:text-sm font-extrabold transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Pantau Siswa</span>
          </Link>
          <Link
            href="/guru/counseling"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>Jadwal ({pendingRequests})</span>
          </Link>
        </div>
      </section>

      {/* 2. STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border-2 border-[#d5dcc4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#057a44] flex items-center justify-center shrink-0 border border-emerald-200">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#475569]">Total Siswa Terdaftar</p>
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{totalStudents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-[#d5dcc4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#475569]">LKS Selesai Dikerjakan</p>
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{completedWorksheets}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-[#d5dcc4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#475569]">Booking Menunggu Persetujuan</p>
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{pendingRequests}</p>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN ACTIVITY PANELS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent LKS Activity */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div>
              <h2 className="font-serif font-extrabold text-base text-[#0f172a]">
                Aktivitas Lembar Kerja (LKS) Siswa
              </h2>
              <p className="text-xs text-[#475569] font-medium">Pengiriman tugas dan latihan terbaru dari siswa</p>
            </div>
            <Link
              href="/guru/dashboard"
              className="text-xs font-bold text-[#057a44] hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentProgress && recentProgress.length > 0 ? (
              recentProgress.map((item, idx) => {
                const studentName = (item.student as unknown as { full_name?: string })?.full_name || "Siswa";
                return (
                  <div key={item.id || idx} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-[#0f172a] shrink-0 border border-slate-200">
                        {studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#0f172a]">{studentName}</p>
                        <p className="text-[11px] text-[#475569] font-medium">
                          Menyelesaikan Lembar Kerja
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                      +{item.points_earned || 25} Poin
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-[#475569]">
                Belum ada aktivitas pengerjaan lembar kerja.
              </div>
            )}
          </div>
        </div>

        {/* Right: Upcoming Counseling Bookings */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div>
              <h2 className="font-serif font-extrabold text-base text-[#0f172a]">
                Jadwal Konseling Siswa
              </h2>
              <p className="text-xs text-[#475569] font-medium">Sesi bimbingan 1-on-1 bersama siswa</p>
            </div>
            <Link
              href="/guru/counseling"
              className="text-xs font-bold text-[#057a44] hover:underline flex items-center gap-1"
            >
              <span>Kelola</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingBookings && upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, idx) => {
                const studentName = (booking.student as unknown as { full_name?: string })?.full_name || "Siswa";
                return (
                  <div
                    key={booking.id || idx}
                    className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-xs sm:text-sm text-[#0f172a]">{studentName}</p>
                      <p className="text-[11px] text-[#475569] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#057a44]" />
                        <span>{new Date(booking.scheduled_at).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        <span>•</span>
                        <span>{new Date(booking.scheduled_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      booking.status === 'pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : booking.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {booking.status === 'pending' && 'Menunggu'}
                      {booking.status === 'approved' && 'Disetujui'}
                      {booking.status === 'rejected' && 'Ditolak'}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-[#475569]">
                Belum ada permintaan jadwal konseling.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

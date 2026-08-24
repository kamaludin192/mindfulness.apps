import Link from "next/link";
import {
  Users,
  GraduationCap,
  CheckCircle2,
  CalendarCheck2,
  ArrowRight,
  Video,
  Sparkles,
  Palette,
  Calendar,
} from "lucide-react";
import { getAdminKpiMetrics } from "@/services/admin.service";
import { getAllAssessmentsWithStudents } from "@/services/mood.service";
import { getAllProfiles } from "@/services/profile.service";
import { MOOD_META } from "@/types/mood";

export default async function AdminDashboardOverview() {
  const {
    siswaCount,
    guruCount,
    totalUsers,
    completedExercises,
    totalBookings,
    pendingBookings,
  } = await getAdminKpiMetrics();

  const allProfiles = await getAllProfiles();
  const allAssessments = await getAllAssessmentsWithStudents();
  const recentAssessments = allAssessments.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* 1. HERO BANNER SUPERADMIN */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#090d16] p-6 sm:p-8 rounded-3xl text-white shadow-xl border-2 border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-xs font-extrabold text-amber-300 border border-amber-500/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ADMIN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
            Panel Kontrol & Manajemen Sistem 🛡️
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Kelola seluruh ekosistem <strong>mindfulnessintervention.id</strong>: manajemen role pengguna, modifikasi video & materi 4 sesi, audit konseling, dan pemantauan performa sistem.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
          <Link
            href="/admin/users"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-md cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Kelola Akun ({totalUsers})</span>
          </Link>
          <Link
            href="/admin/materi"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>CMS Materi</span>
          </Link>
        </div>
      </section>

      {/* 2. SYSTEM KPI METRICS GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Total Akun Siswa</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{siswaCount}</p>
          <p className="text-[11px] text-[#057a44] font-bold">Peserta Latihan Aktif</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Total Guru BK</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#057a44] flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{guruCount}</p>
          <p className="text-[11px] text-[#057a44] font-bold">Guru Terdaftar</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Worksheet Terselesaikan</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{completedExercises || 0}</p>
          <p className="text-[11px] text-blue-700 font-bold">Refleksi Terverifikasi</p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Permintaan Konseling</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">{totalBookings}</p>
          <p className="text-[11px] text-amber-700 font-bold">{pendingBookings} Menunggu Approval</p>
        </div>
      </section>

      {/* 3. QUICK NAVIGATION TILES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Link
          href="/admin/tampilan"
          className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 hover:border-amber-500 hover:shadow-md transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-extrabold text-base text-[#0f172a] group-hover:text-amber-800 transition-colors">
            Kustomisasi Tampilan & UI
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Edit teks judul, konten program, visi-misi, profil tim, dan banner pada Beranda, Program, dan Tentang Kami.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800">
            <span>Buka CMS Tampilan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 hover:border-amber-500 hover:shadow-md transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-extrabold text-base text-[#0f172a] group-hover:text-amber-800 transition-colors">
            Kelola Akun & Role
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Ubah role pengguna menjadi Siswa, Guru BK, atau Superadmin, serta kelola status akun.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800">
            <span>Buka Manajemen User</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/materi"
          className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#057a44] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-extrabold text-base text-[#0f172a] group-hover:text-[#057a44] transition-colors">
            Pengaturan Materi & Video
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Perbarui judul sesi, tautan video YouTube/MP4, dan deskripsi materi pembelajaran mindfulness.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#057a44]">
            <span>Buka Pengaturan Materi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/konseling"
          className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition-all space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-extrabold text-base text-[#0f172a] group-hover:text-blue-700 transition-colors">
            Audit Konseling Siswa
          </h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            Pantau seluruh riwayat permohonan bimbingan konseling dan persetujuan jadwal guru secara keseluruhan.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700">
            <span>Buka Audit Konseling</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </section>

      {/* 4. CHECK-IN EMOSI & REFLEKSI HARIAN SISWA (NEW) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-serif font-extrabold text-base sm:text-lg text-[#0f172a] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Log Check-in Emosi & Refleksi Harian Siswa
            </h2>
            <p className="text-xs text-[#475569] font-medium">
              Data refleksi harian siswa atas pertanyaan: <em>&ldquo;Setelah mengisi emosi hari ini, apa yang sedang Anda rasakan dan pikirkan hari ini?&rdquo;</em>
            </p>
          </div>
          <Link
            href="/admin/refleksi"
            className="text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Buka Halaman Monitoring Khusus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAssessments && recentAssessments.length > 0 ? (
            recentAssessments.map((a, idx) => {
              const studentName = (a.student as unknown as { full_name?: string })?.full_name || "Siswa";
              const meta = MOOD_META[a.mood_score] || { label: "Normal", emoji: "😊", color: "bg-slate-100 text-slate-700 border-slate-200" };
              return (
                <div
                  key={a.id || idx}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2.5 hover:border-slate-400 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                        {studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-[#0f172a]">{studentName}</p>
                        <p className="text-[11px] text-[#475569] font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          <span>
                            {new Date(a.created_at).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })} • {new Date(a.created_at).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} WIB
                          </span>
                        </p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${meta.color}`}>
                      <span>{meta.emoji}</span>
                      <span>{meta.label}</span>
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-[#1e2a14] leading-relaxed">
                    {a.notes?.includes('[Evaluasi Pasca 4 Sesi]') ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 mb-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Evaluasi Akhir 4 Sesi</span>
                        </div>
                        <p className="font-semibold text-slate-900">
                          {a.notes}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-[11px] font-semibold text-slate-700 mb-1">Refleksi Pikiran & Perasaan:</p>
                        <p className="italic text-[#2b3a1a]/90 font-medium">
                          {a.notes ? `"${a.notes}"` : <span className="text-gray-400 not-italic font-normal">Tidak ada catatan refleksi tambahan.</span>}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 py-8 text-center text-xs text-[#475569]">
              Belum ada log data check-in emosi dan refleksi siswa.
            </div>
          )}
        </div>
      </section>

      {/* 5. RECENT USERS OVERVIEW */}
      <section className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-serif font-extrabold text-base sm:text-lg text-[#0f172a]">
              Daftar Pengguna Platform Terdaftar
            </h2>
            <p className="text-xs text-[#475569] font-medium">
              Ringkasan {allProfiles?.slice(0, 5).length || 0} pengguna terdaftar terbaru di database
            </p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
          >
            <span>Kelola Semua ({totalUsers})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {allProfiles && allProfiles.length > 0 ? (
            allProfiles.slice(0, 6).map((profile) => (
              <div key={profile.id} className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-[#0f172a] border border-slate-200">
                    {profile.full_name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm text-[#0f172a]">
                      {profile.full_name || "Tanpa Nama"}
                    </p>
                    <p className="text-[11px] text-[#475569]">
                      Terdaftar: {profile.created_at ? new Date(profile.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                  profile.role === 'superadmin'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : profile.role === 'guru_bk'
                    ? 'bg-emerald-100 text-[#065f46] border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  {profile.role === 'superadmin' ? 'Superadmin' : profile.role === 'guru_bk' ? 'Guru BK' : 'Siswa'}
                </span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#475569]">
              Belum ada data pengguna.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

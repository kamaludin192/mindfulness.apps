"use client";

import { useState } from "react";
import { CheckCircle2, Search, Award, BookOpen } from "lucide-react";

type ExerciseProgress = {
  id: string;
  session_id: string;
  status: 'in_progress' | 'completed';
  points_earned: number;
};

type Student = {
  id: string;
  full_name: string;
  created_at: string;
  exercise_progress: ExerciseProgress[] | null;
};

export function StudentTable({ students }: { students: Student[] | null }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!students || students.length === 0) {
    return (
      <div className="p-12 text-center text-[#475569] space-y-2">
        <BookOpen className="w-8 h-8 mx-auto text-[#057a44]/50" />
        <p className="font-bold text-sm text-[#0f172a]">Belum Ada Data Siswa Terdaftar</p>
        <p className="text-xs">Siswa yang mendaftar dan mengikuti modul akan otomatis muncul di sini.</p>
      </div>
    );
  }

  const filteredStudents = students.filter((s) =>
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProgressStats = (progress: ExerciseProgress[] | null) => {
    if (!progress) return { completed: 0, totalPoints: 0, progressPercent: 0 };
    const completed = progress.filter((p) => p.status === 'completed').length;
    const totalPoints = progress.reduce((sum, p) => sum + (p.points_earned || 0), 0);
    const progressPercent = Math.round((completed / 4) * 100);
    return { completed, totalPoints, progressPercent };
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#475569] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama siswa..."
            className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white"
          />
        </div>
        <span className="text-xs font-semibold text-[#475569] self-start sm:self-auto">
          Menampilkan {filteredStudents.length} siswa
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#0f172a] font-bold">
              <th className="px-6 py-4">Nama Siswa</th>
              <th className="px-6 py-4 text-center">Progres 4 Sesi</th>
              <th className="px-6 py-4 text-center">Sesi Selesai</th>
              <th className="px-6 py-4 text-center">Total Poin</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => {
              const { completed, totalPoints, progressPercent } = getProgressStats(student.exercise_progress);
              return (
                <tr key={student.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-[#0f172a]">{student.full_name || "Siswa"}</div>
                    <div className="text-[11px] text-[#475569] font-medium">
                      Terdaftar: {new Date(student.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="max-w-[120px] mx-auto space-y-1">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#057a44] h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#475569]">{progressPercent}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-[#065f46] border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#057a44]" />
                      {completed} / 4 Sesi
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 font-extrabold text-[#0f172a]">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {totalPoints} Poin
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      completed === 4
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : completed > 0
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {completed === 4 ? 'Modul Lengkap' : completed > 0 ? 'Sedang Aktif' : 'Belum Mulai'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

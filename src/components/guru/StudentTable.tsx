"use client";

import { useState } from "react";
import { CheckCircle2, Search, Award, BookOpen, Sparkles, MessageSquare } from "lucide-react";

type ExerciseProgress = {
  id: string;
  session_id: string;
  status: 'in_progress' | 'completed';
  points_earned: number;
};

type Assessment = {
  id: string;
  mood_score: number;
  notes: string | null;
  created_at: string;
};

type Student = {
  id: string;
  full_name: string;
  created_at: string;
  exercise_progress: ExerciseProgress[] | null;
  assessments?: Assessment[] | null;
};

const MOOD_META: Record<number, { label: string; emoji: string; color: string }> = {
  1: { label: "Sangat Buruk", emoji: "😢", color: "bg-red-50 text-red-700 border-red-200" },
  2: { label: "Kurang Baik", emoji: "🙁", color: "bg-orange-50 text-orange-700 border-orange-200" },
  3: { label: "Biasa Saja", emoji: "😐", color: "bg-amber-50 text-amber-700 border-amber-200" },
  4: { label: "Cukup Baik", emoji: "🙂", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  5: { label: "Sangat Senang", emoji: "😄", color: "bg-green-50 text-green-700 border-green-200" },
};

export function StudentTable({ students }: { students: Student[] | null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<{ studentName: string; note: string; mood: number; date: string } | null>(null);

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

  const getLatestAssessment = (assessments?: Assessment[] | null) => {
    if (!assessments || assessments.length === 0) return null;
    return assessments.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
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
              <th className="px-6 py-4">Check-in Emosi & Refleksi</th>
              <th className="px-6 py-4 text-center">Progres 4 Sesi</th>
              <th className="px-6 py-4 text-center">Sesi Selesai</th>
              <th className="px-6 py-4 text-center">Total Poin</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => {
              const { completed, totalPoints, progressPercent } = getProgressStats(student.exercise_progress);
              const latestAssessment = getLatestAssessment(student.assessments);
              const meta = latestAssessment ? MOOD_META[latestAssessment.mood_score] : null;

              return (
                <tr key={student.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-[#0f172a]">{student.full_name || "Siswa"}</div>
                    <div className="text-[11px] text-[#475569] font-medium">
                      Terdaftar: {new Date(student.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>

                  {/* Emotion & Reflection Column */}
                  <td className="px-6 py-4">
                    {latestAssessment && meta ? (
                      <div className="space-y-1.5 max-w-xs">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${meta.color}`}>
                          <span>{meta.emoji}</span>
                          <span>{meta.label}</span>
                        </span>
                        {latestAssessment.notes ? (
                          <div
                            onClick={() => setSelectedNote({
                              studentName: student.full_name,
                              note: latestAssessment.notes || '',
                              mood: latestAssessment.mood_score,
                              date: latestAssessment.created_at,
                            })}
                            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 italic line-clamp-2 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors"
                            title="Klik untuk membaca seluruh refleksi"
                          >
                            &ldquo;{latestAssessment.notes}&rdquo;
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">Tanpa catatan tambahan</p>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Belum check-in</span>
                    )}
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

      {/* Modal Popup for Full Reflection Reading */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border-2 border-[#d5dcc4] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-bold text-base text-[#0f172a]">{selectedNote.studentName}</h3>
                <p className="text-xs text-slate-500">
                  {new Date(selectedNote.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })} WIB
                </p>
              </div>
              {MOOD_META[selectedNote.mood] && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${MOOD_META[selectedNote.mood].color}`}>
                  <span>{MOOD_META[selectedNote.mood].emoji}</span>
                  <span>{MOOD_META[selectedNote.mood].label}</span>
                </span>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#3f5726]">
                Jawaban Refleksi Emosi & Pikiran Siswa:
              </p>
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-[#1e2a14] leading-relaxed whitespace-pre-wrap">
                {selectedNote.note}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2 rounded-xl bg-[#3f5726] hover:bg-[#2e411b] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { CheckCircle2 } from "lucide-react";

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
  if (!students || students.length === 0) {
    return (
      <div className="p-8 text-center text-brand-700">
        Belum ada data siswa.
      </div>
    );
  }

  // Calculate some stats per student
  const getProgressStats = (progress: ExerciseProgress[] | null) => {
    if (!progress) return { completed: 0, totalPoints: 0 };
    const completed = progress.filter((p) => p.status === 'completed').length;
    const totalPoints = progress.reduce((sum, p) => sum + (p.points_earned || 0), 0);
    return { completed, totalPoints };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-brand-50 border-b border-brand-300">
            <th className="px-6 py-4 font-semibold text-brand-900">Nama Siswa</th>
            <th className="px-6 py-4 font-semibold text-brand-900 text-center">Sesi Selesai</th>
            <th className="px-6 py-4 font-semibold text-brand-900 text-center">Total Poin</th>
            <th className="px-6 py-4 font-semibold text-brand-900 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100">
          {students.map((student) => {
            const { completed, totalPoints } = getProgressStats(student.exercise_progress);
            return (
              <tr key={student.id} className="hover:bg-brand-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-brand-900">{student.full_name}</div>
                  <div className="text-sm text-brand-700">
                    Bergabung {new Date(student.created_at).toLocaleDateString('id-ID')}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-4 h-4" />
                    {completed} Sesi
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-brand-900">{totalPoints}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">
                    Lihat Detail LKS
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

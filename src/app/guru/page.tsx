import { Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function GuruDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Dashboard Utama</h1>
          <p className="text-brand-700">Ringkasan kondisi mindfulness siswa hari ini</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-brand-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-50 rounded-xl text-brand-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-700">Total Siswa Aktif</p>
              <p className="text-2xl font-bold text-brand-900">124</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-brand-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-700">Tingkat Partisipasi</p>
              <p className="text-2xl font-bold text-brand-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-brand-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-700">Perlu Perhatian</p>
              <p className="text-2xl font-bold text-brand-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-2xl shadow-sm border border-brand-300 overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-300">
          <h2 className="font-bold text-brand-900">Siswa Perlu Perhatian (Check-in Sedih beruntun)</h2>
        </div>
        <div className="divide-y divide-brand-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-900 font-bold text-sm">
                  S{i}
                </div>
                <div>
                  <p className="font-medium text-brand-900">Siswa {i}</p>
                  <p className="text-sm text-brand-700">Kelas XI-IPA 2</p>
                </div>
              </div>
              <button className="text-sm font-medium text-brand-500 hover:text-brand-700">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

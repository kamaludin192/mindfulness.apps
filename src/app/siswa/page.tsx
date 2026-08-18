import { Activity, CalendarHeart, SmilePlus } from "lucide-react";

export default function SiswaDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Welcome Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-brand-300">
        <h2 className="text-xl font-bold text-brand-900 mb-2">Halo, Andi!</h2>
        <p className="text-brand-700 text-sm">
          Bagaimana perasaanmu hari ini? Mari luangkan waktu sejenak untuk melatih mindfulness.
        </p>
      </section>

      {/* Quick Actions / Feeling Check-in */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-brand-900 px-1">Check-in Harian</h3>
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-brand-300 shadow-sm hover:bg-brand-50 transition-colors">
            <SmilePlus className="h-8 w-8 text-brand-500 mb-2" />
            <span className="text-xs font-medium text-brand-900">Senang</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-brand-300 shadow-sm hover:bg-brand-50 transition-colors">
            <Activity className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-xs font-medium text-brand-900">Biasa</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-brand-300 shadow-sm hover:bg-brand-50 transition-colors">
            <CalendarHeart className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-xs font-medium text-brand-900">Sedih</span>
          </button>
        </div>
      </section>

      {/* Recommended Content */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-semibold text-brand-900">Materi Terbaru</h3>
          <button className="text-xs font-medium text-brand-500 hover:text-brand-700">Lihat Semua</button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-brand-300 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-50 rounded-lg flex-shrink-0 flex items-center justify-center text-brand-300">
                <SmilePlus />
              </div>
              <div>
                <h4 className="font-semibold text-brand-900 text-sm">Latihan Pernapasan {i}</h4>
                <p className="text-xs text-brand-700 mt-1 line-clamp-2">
                  Latihan sederhana untuk memusatkan perhatian dan menenangkan pikiran.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

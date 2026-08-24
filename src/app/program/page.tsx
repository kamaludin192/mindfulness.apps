import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import {
  Brain,
  Leaf,
  Headphones,
  Smile,
  Award,
  Sparkles,
  BookOpen,
  MessageCircle,
  Heart,
} from "lucide-react";

export default function ProgramPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f3f6e8] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40">
      <Navbar />

      <main className="flex-1">
        {/* 1. HEADER SECTION */}
        <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 text-[#3f5726] text-xs md:text-sm font-semibold mb-6 shadow-xs border border-[#d5dcc4]">
            <Sparkles className="w-4 h-4 text-[#3f5726]" />
            <span>Latihan Terstruktur</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            Program 4 Sesi <span className="text-[#3f5726]">Interaktif</span>
          </h1>

          <p className="text-base md:text-lg text-[#2b3a1a]/80 max-w-3xl mx-auto leading-relaxed">
            Metode psikoedukasi terstruktur yang dirancang bertahap untuk membantu siswa mengamati pikiran, mereduksi kecemasan, dan mengelola emosi dalam suasana belajar yang aman.
          </p>
        </section>

        {/* 2. METODOLOGI BERTAHAP (3 TAHAP) */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Latihan Terstruktur untuk Siswa SMA</span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif">
                Tahapan Membangun Kesadaran
              </h2>
              <p className="text-sm text-[#2b3a1a]/70">
                Tiga tahapan sistematis untuk memastikan setiap siswa mendapatkan pendampingan yang tepat dan berkelanjutan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Tahap 1 */}
              <div className="bg-[#f3f6e8]/60 rounded-3xl p-8 border border-[#d5dcc4]/50 shadow-xs relative">
                <div className="w-12 h-12 rounded-2xl bg-[#c2db8f] flex items-center justify-center font-bold text-xl text-[#1e2a14] mb-6 shadow-xs">
                  1
                </div>
                <h3 className="font-bold text-lg mb-3">Asesmen Awal</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Mengidentifikasi kondisi psikologis awal, tingkat stres akademik, dan kesiapan emosional siswa untuk menentukan kesesuaian pendampingan.
                </p>
              </div>

              {/* Tahap 2 */}
              <div className="bg-[#f3f6e8]/60 rounded-3xl p-8 border border-[#d5dcc4]/50 shadow-xs relative">
                <div className="w-12 h-12 rounded-2xl bg-[#3f5726] flex items-center justify-center font-bold text-xl text-white mb-6 shadow-xs">
                  2
                </div>
                <h3 className="font-bold text-lg mb-3">Latihan Rutin</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Menumbuhkan kebiasaan baru melalui 4 modul video interaktif dan pengisian digital worksheet reflektif secara konsisten.
                </p>
              </div>

              {/* Tahap 3 */}
              <div className="bg-[#f3f6e8]/60 rounded-3xl p-8 border border-[#d5dcc4]/50 shadow-xs relative">
                <div className="w-12 h-12 rounded-2xl bg-[#75845c] flex items-center justify-center font-bold text-xl text-white mb-6 shadow-xs">
                  3
                </div>
                <h3 className="font-bold text-lg mb-3">Evaluasi Progress</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Memantau perkembangan afektif dan stabilitas suasana hati siswa secara berkala untuk mengevaluasi efektivitas intervensi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 4 SESI MINDFULNESS DETAIL */}
        <section className="bg-[#f3f6e8] px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Modul Utama</span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif">
                4 Sesi Mindfulness Interaktif
              </h2>
              <p className="text-sm text-[#2b3a1a]/70">
                Setiap sesi terdiri dari video panduan mindfulness dan penugasan lembar kerja mandiri.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sesi 1 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-[#e8ece1] hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block px-3.5 py-1 bg-[#e8ece1] rounded-full text-xs font-bold text-[#3f5726]">
                    SESI 1
                  </span>
                  <Sparkles className="w-5 h-5 text-[#3f5726]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">Mindful Breathing</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  Latihan pernapasan sadar yang dilengkapi dengan materi psikoedukasi untuk melatih fokus dan ketenangan saat menghadapi situasi pemicu kecemasan.
                </p>
                <div className="p-4 rounded-2xl bg-[#f3f6e8] text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80">Tugas di rumah: berapa kali berlatih <em>mindful breathing</em> selama sehari.</p>
                </div>
              </div>

              {/* Sesi 2 (Dark Green Card) */}
              <div className="bg-[#3f5726] text-white rounded-3xl p-8 md:p-10 shadow-md hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block px-3.5 py-1 bg-white/20 rounded-full text-xs font-bold text-[#c2db8f]">
                    SESI 2
                  </span>
                  <Leaf className="w-5 h-5 text-[#c2db8f]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">Mindful Sitting and Mindful Listening</h3>
                <p className="text-sm text-white/90 leading-relaxed mb-6">
                  Berlatih mengobservasi sekeliling dengan kesadaran penuh tanpa menghakimi saat duduk tenang dan mendengarkan dengan penuh perhatian.
                </p>
                <div className="p-4 rounded-2xl bg-white/10 text-xs space-y-2 border border-white/10">
                  <p className="font-semibold text-[#c2db8f] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-white/80">Penugasan <em>worksheet experience calendar</em> untuk dilakukan di rumah seharian apa yang dirasakan pada perasaan dan pikiran.</p>
                </div>
              </div>

              {/* Sesi 3 (Light Sage Card) */}
              <div className="bg-[#e8ece1] rounded-3xl p-8 md:p-10 shadow-xs border border-[#d5dcc4]/50 hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block px-3.5 py-1 bg-white rounded-full text-xs font-bold text-[#3f5726]">
                    SESI 3
                  </span>
                  <Brain className="w-5 h-5 text-[#3f5726]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">Body Scanning</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  Kenali ketegangan fisik melalui teknik pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.
                </p>
                <div className="p-4 rounded-2xl bg-white/80 text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80">Penugasan <em>worksheet daily thought record</em>.</p>
                </div>
              </div>

              {/* Sesi 4 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-[#e8ece1] hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block px-3.5 py-1 bg-[#e8ece1] rounded-full text-xs font-bold text-[#3f5726]">
                    SESI 4
                  </span>
                  <Heart className="w-5 h-5 text-[#3f5726]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">Gratitude and Loving in Kindness</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  Tumbuhkan rasa syukur dan memupuk cinta kasih serta kebaikan hati terhadap diri sendiri maupun orang lain.
                </p>
                <div className="p-4 rounded-2xl bg-[#f3f6e8] text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80">Penugasan <em>worksheet gratitude</em> (menyebutkan hal yang disyukuri) dan <em>worksheet letter for myself</em> (menuliskan surat cinta untuk diri).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PENGALAMAN PEMBELAJARAN (3 FITUR) */}
        <section className="bg-[#e8ece1] px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-serif mb-4">
              Pengalaman Pembelajaran
            </h2>
            <p className="text-sm md:text-base text-[#2b3a1a]/80 max-w-2xl mx-auto mb-14">
              Sistem yang dirancang untuk mendukung fokus, kenyamanan, dan pelacakan progres secara aman.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">Panduan Program Terstruktur</h3>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Smile className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">Pelacakan Mood Harian</h3>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">Pelacakan Konsistensi</h3>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ATURAN INTEGRASI KONSELING (KUNCI KELULUSAN SESI) */}
        <section className="bg-white px-4 py-20 border-t border-[#d5dcc4]/40">
          <div className="max-w-4xl mx-auto bg-[#f3f6e8] rounded-3xl p-8 md:p-12 border border-[#d5dcc4] flex flex-col md:flex-row items-center gap-8 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#3f5726] flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold font-serif">
                Integrasi Chat Konseling Guru BK
              </h3>
              <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                Setelah menuntaskan 4 sesi latihan dan mengisi worksheet, tombol <strong>Booking Konseling 1-on-1</strong> akan terbuka secara otomatis untuk sesi pendalaman bersama Guru BK Anda.
              </p>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <BottomCta
          title="Mulai Sesi Pertama Sekarang"
          subtitle="Bergabunglah dengan program intervensi mindfulness dan rasakan perubahannya pada kenyamanan belajarmu."
          buttonText="Masuk ke Portal Siswa"
          buttonHref="/login"
        />
      </main>

      <Footer />
    </div>
  );
}

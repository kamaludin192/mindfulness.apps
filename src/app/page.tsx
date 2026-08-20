import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import {
  ArrowRight,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f5f8ec] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40 relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative px-4 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
          {/* Ambient Lighting Circles */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#c8e29a]/35 via-[#dfecc7]/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
          <div className="absolute top-40 -left-20 w-80 h-80 bg-[#3f5726]/10 blur-3xl pointer-events-none -z-10 rounded-full" />
          <div className="absolute top-40 -right-20 w-80 h-80 bg-[#c2db8f]/20 blur-3xl pointer-events-none -z-10 rounded-full" />

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
            {/* Trust / Official Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white text-[#1e2a14] text-xs md:text-sm font-bold shadow-xs border border-[#d5dcc4] backdrop-blur-md hover:border-[#3f5726] transition-all">
              <span className="w-2 h-2 rounded-full bg-[#3f5726] animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-[#3f5726]" />
              <span>mindfulnessintervention.id • Ruang Aman & Terverifikasi Siswa</span>
            </div>

            {/* Headline */}
            <div className="space-y-3 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif leading-[1.15] tracking-tight text-[#141f0d]">
                Mindfulness-Based <br className="hidden sm:inline" />
                <span className="text-[#3f5726]">Intervention</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#243316] font-medium max-w-3xl mx-auto leading-relaxed pt-2">
                Mindfulness-Based Intervention adalah intervensi berbasis kesadaran yang melatih hadir secara utuh pada momen saat ini secara sengaja. Platform ini digunakan sebagai optimalisasi media layanan Bimbingan dan Konseling untuk memudahkan siswa SMA dalam memperoleh bantuan layanan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2f431b] hover:bg-[#1e2a14] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
              >
                <span>Mulai Sesi Pertama Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#2b3a1a] border border-[#d5dcc4] hover:border-[#3f5726]/40 px-7 py-4 rounded-full font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer text-sm md:text-base backdrop-blur-xs"
              >
                <BookOpen className="w-4 h-4 text-[#3f5726]" />
                <span>Jelajahi 4 Sesi Latihan</span>
              </Link>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl text-left pt-2">
              <div className="bg-white/85 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4] shadow-2xs">
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#2f431b]">4 Sesi</p>
                <p className="text-xs text-[#2b3a1a]/70 font-medium">Video & Lembar Kerja</p>
              </div>
              <div className="bg-white/85 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4] shadow-2xs">
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#2f431b]">1-on-1</p>
                <p className="text-xs text-[#2b3a1a]/70 font-medium">Jadwal Guru BK</p>
              </div>
              <div className="bg-white/85 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4] shadow-2xs">
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#2f431b]">100%</p>
                <p className="text-xs text-[#2b3a1a]/70 font-medium">Privasi Terjaga</p>
              </div>
              <div className="bg-white/85 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4] shadow-2xs">
                <p className="text-2xl md:text-3xl font-bold font-serif text-[#2f431b]">Edukasi</p>
                <p className="text-xs text-[#2b3a1a]/70 font-medium">Psikoedukasi Terstruktur</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. METODOLOGI SECTION */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/60">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 items-start">
              <div className="md:col-span-1 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3f5726]">Metodologi Ilmiah</span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif leading-snug text-[#1e2a14]">
                  Membangun Kesadaran Secara Bertahap
                </h2>
                <p className="text-xs text-[#2b3a1a]/70 leading-relaxed">
                  Dirancang terstruktur dan ramah pelajar agar tidak membebani mental siswa.
                </p>
              </div>

              <div className="md:col-span-3 grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-[#e2e8f0] space-y-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center font-bold mb-3 text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-base text-[#1e2a14]">Asesmen & Pengenalan</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Mengenali kondisi awal emosi dan pernapasan Anda untuk memastikan kesiapan dalam mengikuti latihan.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-[#e2e8f0] space-y-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#3f5726] text-white flex items-center justify-center font-bold mb-3 text-sm shadow-xs">
                    2
                  </div>
                  <h3 className="font-bold text-base text-[#1e2a14]">Latihan Rutin & LKS</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Mempraktikkan video mindfulness dan mengisi lembar kerja digital untuk mengintegrasikan pengalaman.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-[#e2e8f0] space-y-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#75845c] text-white flex items-center justify-center font-bold mb-3 text-sm shadow-xs">
                    3
                  </div>
                  <h3 className="font-bold text-base text-[#1e2a14]">Evaluasi & Konseling BK</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Memantau perkembangan diri dan berdiskusi tatap muka bersama Guru BK saat membutuhkan bimbingan mendalam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEKILAS 4 SESI MINDFULNESS */}
        <section className="bg-[#f5f8ec] px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3f5726]">Modul Latihan</span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1e2a14] mt-1">4 Sesi Mindfulness Interaktif</h2>
              </div>
              <Link
                href="/program"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3f5726] hover:underline"
              >
                <span>Lihat Detail Lengkap Modul</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Sesi 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#f3f6e8] rounded-full text-xs font-semibold mb-3 text-[#3f5726] border border-[#d5dcc4]">
                  Sesi 1
                </span>
                <h3 className="text-lg font-bold font-serif mb-2 text-[#1e2a14]">
                  Menyadari Napas & Tubuh (Mindful Breathing)
                </h3>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed mb-4">
                  Mempelajari dasar pernapasan sadar dan pemindaian tubuh (*body scan*) untuk menenangkan sistem saraf.
                </p>
                <div className="text-[11px] text-[#3f5726] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Worksheet Latihan Mindful Breathing</span>
                </div>
              </div>

              {/* Sesi 2 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#f3f6e8] rounded-full text-xs font-semibold mb-3 text-[#3f5726] border border-[#d5dcc4]">
                  Sesi 2
                </span>
                <h3 className="text-lg font-bold font-serif mb-2 text-[#1e2a14]">
                  Pengenalan Pikiran & Regulasi Emosi
                </h3>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed mb-4">
                  Mengamati pikiran yang datang dan pergi tanpa menghakimi, menciptakan ruang jeda sebelum merespons.
                </p>
                <div className="text-[11px] text-[#3f5726] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Worksheet Experiences Calender</span>
                </div>
              </div>

              {/* Sesi 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#f3f6e8] rounded-full text-xs font-semibold mb-3 text-[#3f5726] border border-[#d5dcc4]">
                  Sesi 3
                </span>
                <h3 className="text-lg font-bold font-serif mb-2 text-[#1e2a14]">
                  Mengelola Stres Akademik & Kecemasan
                </h3>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed mb-4">
                  Strategi praktis meredakan kepanikan saat ujian, defusi kognitif, dan teknik relaksasi mandiri.
                </p>
                <div className="text-[11px] text-[#3f5726] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Worksheet Daily Thought Record</span>
                </div>
              </div>

              {/* Sesi 4 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#f3f6e8] rounded-full text-xs font-semibold mb-3 text-[#3f5726] border border-[#d5dcc4]">
                  Sesi 4
                </span>
                <h3 className="text-lg font-bold font-serif mb-2 text-[#1e2a14]">
                  Welas Asih Diri (Self-Compassion) & Integrasi
                </h3>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed mb-4">
                  Membiasakan sikap ramah pada diri sendiri saat gagal dan menumbuhkan rasa syukur dalam kehidupan.
                </p>
                <div className="text-[11px] text-[#3f5726] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Jurnal Rasa Syukur & Surat Cinta Diri</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BOTTOM CTA */}
        <BottomCta />
      </main>

      <Footer />
    </div>
  );
}

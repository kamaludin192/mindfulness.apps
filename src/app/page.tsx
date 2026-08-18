import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import {
  ArrowRight,
  ShieldCheck,
  Brain,
  BookOpen,
  Leaf,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f3f6e8] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="px-4 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 text-[#3f5726] text-xs md:text-sm font-semibold mb-6 shadow-xs border border-[#d5dcc4]">
            <ShieldCheck className="w-4 h-4 text-[#3f5726]" />
            <span>Ruang Aman & Terverifikasi untuk Pelajar</span>
          </div>

          <h1 className="text-3xl md:text-6xl font-bold font-serif mb-6 leading-tight max-w-4xl">
            Mindfulness-Based Intervention (MBI)
            <br />
            <span className="text-[#3f5726]">untuk Siswa</span>
          </h1>

          <p className="text-base md:text-xl text-[#2b3a1a]/80 mb-10 max-w-3xl leading-relaxed">
            Intervensi berbasis kesadaran yang melatih Anda untuk hadir secara utuh pada momen saat ini. Platform ini dirancang khusus untuk memudahkan siswa dalam memperoleh bantuan layanan konseling secara optimal.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3f5726] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#2b3a1a] transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
            >
              <span>Mulai Sesi Pertama</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/program"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#3f5726] border border-[#d5dcc4] px-7 py-3.5 rounded-full font-semibold hover:bg-[#e8ece1] transition-all hover:shadow-xs cursor-pointer text-sm md:text-base"
            >
              <span>Pelajari 4 Sesi Program</span>
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
            <div className="bg-white/80 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4]/60 shadow-xs">
              <p className="text-2xl md:text-3xl font-bold font-serif text-[#3f5726]">4 Sesi</p>
              <p className="text-xs md:text-sm text-[#2b3a1a]/70">Latihan Video & LKS</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4]/60 shadow-xs">
              <p className="text-2xl md:text-3xl font-bold font-serif text-[#3f5726]">1-on-1</p>
              <p className="text-xs md:text-sm text-[#2b3a1a]/70">Konseling Guru BK</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4]/60 shadow-xs">
              <p className="text-2xl md:text-3xl font-bold font-serif text-[#3f5726]">100%</p>
              <p className="text-xs md:text-sm text-[#2b3a1a]/70">Privasi Terjaga</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4.5 rounded-2xl border border-[#d5dcc4]/60 shadow-xs">
              <p className="text-2xl md:text-3xl font-bold font-serif text-[#3f5726]">Klinis</p>
              <p className="text-xs md:text-sm text-[#2b3a1a]/70">Berbasis Bukti MBCT</p>
            </div>
          </div>
        </section>

        {/* 2. METODOLOGI SECTION (Ringkasan) */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 items-start">
              <div className="md:col-span-1 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Metodologi Ilmiah</span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif leading-snug">
                  Membangun Kesadaran Secara Bertahap
                </h2>
                <p className="text-xs text-[#2b3a1a]/70 leading-relaxed">
                  Dirancang terstruktur agar tidak membebani mental pelajar.
                </p>
              </div>

              <div className="md:col-span-3 grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-[#f3f6e8]/60 p-6 rounded-2xl border border-[#d5dcc4]/40">
                  <div className="w-9 h-9 rounded-full bg-[#c2db8f] flex items-center justify-center font-bold text-[#1e2a14] mb-4 text-sm shadow-xs">
                    1
                  </div>
                  <h3 className="font-bold text-base mb-2">Asesmen Awal</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Mengidentifikasi kondisi awal Anda untuk memastikan kesesuaian layanan pendampingan yang akan diberikan.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-[#f3f6e8]/60 p-6 rounded-2xl border border-[#d5dcc4]/40">
                  <div className="w-9 h-9 rounded-full bg-[#3f5726] flex items-center justify-center font-bold text-white mb-4 text-sm shadow-xs">
                    2
                  </div>
                  <h3 className="font-bold text-base mb-2">Latihan Rutin</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Menumbuhkan kebiasaan baru agar praktik mindfulness dapat diterapkan secara konsisten dalam kehidupan sehari-hari.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-[#f3f6e8]/60 p-6 rounded-2xl border border-[#d5dcc4]/40">
                  <div className="w-9 h-9 rounded-full bg-[#75845c] flex items-center justify-center font-bold text-white mb-4 text-sm shadow-xs">
                    3
                  </div>
                  <h3 className="font-bold text-base mb-2">Evaluasi Progress</h3>
                  <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                    Memantau perkembangan diri secara berkala dan melihat sejauh mana efektivitas latihan yang telah dilakukan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEKILAS 4 SESI MINDFULNESS */}
        <section className="bg-[#f3f6e8] px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Modul Latihan</span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif mt-1">4 Sesi Mindfulness Interaktif</h2>
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
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#e8ece1] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#e8ece1] rounded-full text-xs font-semibold mb-3 text-[#3f5726]">
                  Sesi 1
                </span>
                <h3 className="text-lg font-bold mb-2">Mindful Breathing</h3>
                <p className="text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Latihan pernapasan sadar yang dilengkapi materi psikoedukasi untuk melatih fokus dan ketenangan.
                </p>
              </div>

              {/* Sesi 2 */}
              <div className="bg-[#3f5726] text-white rounded-3xl p-8 shadow-xs hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                    Sesi 2
                  </span>
                  <Leaf className="w-5 h-5 text-[#c2db8f]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Mindful Sitting & Listening</h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                  Berlatih mengobservasi sekeliling dengan kesadaran penuh serta worksheet experience calendar.
                </p>
              </div>

              {/* Sesi 3 */}
              <div className="bg-[#e8ece1] rounded-3xl p-8 shadow-xs hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#3f5726]">
                    Sesi 3
                  </span>
                  <Brain className="w-5 h-5 text-[#3f5726]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Body Scanning</h3>
                <p className="text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Kenali ketegangan fisik melalui pemindaian tubuh dan latihan daily thought record.
                </p>
              </div>

              {/* Sesi 4 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#e8ece1] hover:-translate-y-1 transition-all">
                <span className="inline-block px-3 py-1 bg-[#e8ece1] rounded-full text-xs font-semibold mb-3 text-[#3f5726]">
                  Sesi 4
                </span>
                <h3 className="text-lg font-bold mb-2">Gratitude & Loving Kindness</h3>
                <p className="text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed">
                  Tumbuhkan rasa syukur dan welas asih diri melalui penugasan gratitude journal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TENTANG KAMI SNAPSHOT */}
        <section className="bg-white px-4 py-20 border-t border-[#d5dcc4]/40">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Di Balik Layar</span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif leading-snug">
                Dikembangkan Bersama Pakar Bimbingan & Psikologi
              </h2>
              <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                Platform ini merupakan hasil riset integrasi *cybercounseling* dan terapi kognitif berbasis kesadaran (MBCT) oleh tim akademisi konseling terpercaya.
              </p>
              <div className="pt-2">
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#3f5726] text-white hover:bg-[#2b3a1a] transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Kenali Tim Peneliti Kami</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-[#f3f6e8] p-8 rounded-3xl border border-[#d5dcc4]/60 space-y-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                Keunggulan Layanan
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-[#2b3a1a]/80">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3f5726] mt-1.5" />
                  <span>Pendampingan konseling terintegrasi langsung dengan Guru BK sekolah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3f5726] mt-1.5" />
                  <span>Pantauan suasana hati harian & perkembangan intervensi berkala.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3f5726] mt-1.5" />
                  <span>Akses mandiri latihan mindfulness dari gawai mana saja.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA BANNER */}
        <BottomCta />
      </main>

      <Footer />
    </div>
  );
}

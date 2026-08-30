import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import { getLayoutConfig } from "@/services/cms.service";
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

export default async function ProgramPage() {
  const config = await getLayoutConfig();
  const program = config.programPage;

  return (
    <div className="min-h-screen font-sans bg-[#f3f6e8] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40">
      <Navbar />

      <main className="flex-1">
        {/* 1. HEADER SECTION */}
        <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 text-[#3f5726] text-xs md:text-sm font-semibold mb-6 shadow-xs border border-[#d5dcc4]">
            <Sparkles className="w-4 h-4 text-[#3f5726]" />
            <span>{program.badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            {program.title}
          </h1>

          <p className="text-base md:text-lg text-[#2b3a1a]/80 max-w-3xl mx-auto leading-relaxed">
            {program.subtitle}
          </p>
        </section>

        {/* 2. METODOLOGI BERTAHAP (3 TAHAP) */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a7a35]">Latihan Terstruktur untuk Siswa SMA</span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif">
                {program.methodologyHeading}
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
                <h3 className="font-bold text-lg mb-3">{program.step1Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  {program.step1Desc}
                </p>
              </div>

              {/* Tahap 2 */}
              <div className="bg-[#f3f6e8]/60 rounded-3xl p-8 border border-[#d5dcc4]/50 shadow-xs relative">
                <div className="w-12 h-12 rounded-2xl bg-[#3f5726] flex items-center justify-center font-bold text-xl text-white mb-6 shadow-xs">
                  2
                </div>
                <h3 className="font-bold text-lg mb-3">{program.step2Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  {program.step2Desc}
                </p>
              </div>

              {/* Tahap 3 */}
              <div className="bg-[#f3f6e8]/60 rounded-3xl p-8 border border-[#d5dcc4]/50 shadow-xs relative">
                <div className="w-12 h-12 rounded-2xl bg-[#75845c] flex items-center justify-center font-bold text-xl text-white mb-6 shadow-xs">
                  3
                </div>
                <h3 className="font-bold text-lg mb-3">{program.step3Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                  {program.step3Desc}
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
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">{program.session1Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  {program.session1Desc}
                </p>
                <div className="p-4 rounded-2xl bg-[#f3f6e8] text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80" dangerouslySetInnerHTML={{ __html: program.session1Homework }} />
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
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">{program.session2Title}</h3>
                <p className="text-sm text-white/90 leading-relaxed mb-6">
                  {program.session2Desc}
                </p>
                <div className="p-4 rounded-2xl bg-white/10 text-xs space-y-2 border border-white/10">
                  <p className="font-semibold text-[#c2db8f] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-white/80" dangerouslySetInnerHTML={{ __html: program.session2Homework }} />
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
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">{program.session3Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  {program.session3Desc}
                </p>
                <div className="p-4 rounded-2xl bg-white/80 text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80" dangerouslySetInnerHTML={{ __html: program.session3Homework }} />
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
                <h3 className="text-xl md:text-2xl font-bold font-serif mb-3">{program.session4Title}</h3>
                <p className="text-sm text-[#2b3a1a]/80 leading-relaxed mb-6">
                  {program.session4Desc}
                </p>
                <div className="p-4 rounded-2xl bg-[#f3f6e8] text-xs space-y-2 border border-[#d5dcc4]/50">
                  <p className="font-semibold text-[#3f5726] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Penugasan:
                  </p>
                  <p className="text-[#2b3a1a]/80" dangerouslySetInnerHTML={{ __html: program.session4Homework }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PENGALAMAN PEMBELAJARAN (3 FITUR) */}
        <section className="bg-[#e8ece1] px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-serif mb-4">
              {program.learningTitle}
            </h2>
            <p className="text-sm md:text-base text-[#2b3a1a]/80 max-w-2xl mx-auto mb-14">
              {program.learningSubtitle}
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">{program.learningFeature1}</h3>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Smile className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">{program.learningFeature2}</h3>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/40 hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f3f6e8] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg">{program.learningFeature3}</h3>
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
                {program.counselingBannerTitle || "Syarat & Prosedur Konseling Online 1-on-1"}
              </h3>
              <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                {program.counselingBannerText || "Setelah menuntaskan 4 sesi latihan dan mengisi worksheet, tombol Permohonan Konseling 1-on-1 akan terbuka secara otomatis untuk sesi pendalaman bersama Guru BK Anda."}
              </p>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <BottomCta />
      </main>

      <Footer />
    </div>
  );
}

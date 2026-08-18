import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import {
  Brain,
  CheckCircle2,
  User,
  Eye,
  Flag,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f3f6e8] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40">
      <Navbar />

      <main className="flex-1">
        {/* 1. HEADER SECTION */}
        <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 text-[#3f5726] text-xs md:text-sm font-semibold mb-6 shadow-xs border border-[#d5dcc4]">
            <ShieldCheck className="w-4 h-4 text-[#3f5726]" />
            <span>Inisiatif Berbasis Riset Klinis</span>
          </div>

          <h4 className="text-xs font-bold tracking-widest uppercase text-[#5a7a35] mb-2">TENTANG KAMI</h4>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            Membangun Resiliensi Digital Pelajar
            <br />
            <span className="text-[#3f5726]">Melalui Intervensi Klinis</span>
          </h1>

          <p className="text-base md:text-lg text-[#2b3a1a]/80 max-w-3xl mx-auto leading-relaxed">
            Kami hadir sebagai ruang aman bagi remaja untuk mengelola stres, kecemasan, dan tekanan akademik melalui pendekatan kesadaran penuh (mindfulness) berbasis praktik yang tervalidasi.
          </p>
        </section>

        {/* 2. VISI & MISI SECTION */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Kolom Kiri: Visi & SVG Badge Stempel */}
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-[#f3f6e8] border border-[#d5dcc4]/50 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3f5726] flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-[#1e2a14]">Visi Kami</h3>
                  </div>
                  <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                    Menjadi platform pendampingan mental terdepan di Indonesia yang menjembatani layanan bimbingan sekolah dengan inovasi digital, menciptakan ruang singgah psikologis yang aman bagi pelajar di fase transisi.
                  </p>
                </div>

                {/* Stempel Melingkar SVG (Figma Match) */}
                <div className="flex items-center justify-center p-6 bg-[#f3f6e8]/40 rounded-3xl border border-[#d5dcc4]/30">
                  <div className="w-48 h-48 rounded-full bg-[#3f5726] flex items-center justify-center relative text-white shadow-md">
                    {/* SVG Text on circular path */}
                    <svg className="w-full h-full absolute inset-0 animate-spin-slow" viewBox="0 0 200 200" style={{ animationDuration: "25s" }}>
                      <path
                        id="textCircle"
                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                        fill="none"
                      />
                      <text className="text-[11px] font-bold tracking-[0.25em] uppercase fill-[#c2db8f]">
                        <textPath href="#textCircle" startOffset="0%">
                          KLINIS • TERUKUR • BERBASIS BUKTI •
                        </textPath>
                      </text>
                    </svg>
                    <Brain className="w-10 h-10 text-white z-10" />
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Misi */}
              <div className="p-8 md:p-10 rounded-3xl bg-[#f3f6e8] border border-[#d5dcc4]/50 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3f5726] flex items-center justify-center text-white">
                    <Flag className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-[#1e2a14]">Misi Kami</h3>
                </div>

                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                    </div>
                    <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                      <strong>Intervensi Tervalidasi:</strong> Menyediakan program intervensi berbasis kesadaran yang tervalidasi untuk mendukung regulasi emosi usia muda.
                    </p>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                    </div>
                    <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                      <strong>Akses Terintegrasi:</strong> Memfasilitasi akses bimbingan psikologis yang terintegrasi langsung dengan fasilitator pendidikan dan Guru BK.
                    </p>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                    </div>
                    <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                      <strong>Evaluasi Digital:</strong> Mengembangkan instrumen digital untuk membantu evaluasi dan pemantauan kesejahteraan mental secara berkala.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DIDUKUNG OLEH SECTION */}
        <section className="bg-[#e8ece1] px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#3f5726]">DIDUKUNG OLEH</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-xs border border-[#d5dcc4]/60">
                <Brain className="w-6 h-6 text-[#3f5726]" />
                <span className="font-semibold text-sm">Konseling MBCT</span>
              </div>

              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-xs border border-[#d5dcc4]/60">
                <Building2 className="w-6 h-6 text-[#3f5726]" />
                <span className="font-semibold text-sm">Klinik Psikologi Terapan</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TIM PENELITI (3 PROFIL) */}
        <section className="bg-[#f3f6e8] px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5a7a35]">TIM PENELITI</span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif">
                Di Balik Layar
              </h2>
              <p className="text-sm text-[#2b3a1a]/70">
                Para akademisi dan praktisi bimbingan konseling yang merumuskan kurikulum serta intervensi digital ini.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Profil 1: Nabila */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">Nabila Fuadina, M.Psi.</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">Akademisi & Pakar Inovasi Bimbingan</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  Akademisi yang berfokus pada integrasi cybercounseling dan pengembangan media intervensi digital. Aktif merancang metode mindfulness untuk mengoptimalkan kesehatan mental (well-being) dan adaptasi sosial pada fase transisi remaja.
                </p>
              </div>

              {/* Profil 2: Riski */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">Riski Putra Ayu Distira, M.Pd</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">Praktisi Konseling & Akademisi</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  Pakar bimbingan psikologis yang berfokus pada intervensi kelompok dan pendekatan Cognitive Behavior Therapy (CBT). Berpengalaman merancang modul pendampingan klinis untuk mereduksi kecemasan sosial dan mengatasi prokrastinasi akademik di kalangan pelajar.
                </p>
              </div>

              {/* Profil 3: Dr. Thrisia */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">Dr. Thrisia Febrianti, M.Pd</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">Pakar Psikologi Positif & Akademisi</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  Doktor pendidikan yang memfokuskan risetnya pada inovasi Mindfulness-Based Cognitive Therapy (MBCT) dan psikologi positif. Memiliki kepakaran dalam merancang model intervensi klinis berbasis bukti guna mengoptimalkan psychological well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOTTOM CTA */}
        <BottomCta
          title="Mari Berkolaborasi untuk Kesehatan Mental Remaja"
          subtitle="Akses platform mindfulness sekarang untuk mulai membimbing siswa menuju kesejahteraan psikologis yang optimal."
          buttonText="Masuk ke Portal"
          buttonHref="/login"
        />
      </main>

      <Footer />
    </div>
  );
}

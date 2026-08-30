import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomCta from "@/components/public/BottomCta";
import { getLayoutConfig } from "@/services/cms.service";
import {
  Brain,
  CheckCircle2,
  User,
  Eye,
  Flag,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default async function TentangKamiPage() {
  const config = await getLayoutConfig();
  const tentang = config.tentangKamiPage;

  return (
    <div className="min-h-screen font-sans bg-[#f3f6e8] text-[#2b3a1a] flex flex-col selection:bg-[#c2db8f]/40">
      <Navbar />

      <main className="flex-1">
        {/* 1. HEADER SECTION */}
        <section className="px-4 pt-16 pb-16 md:pt-24 md:pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white text-[#1e2a14] text-xs md:text-sm font-bold shadow-xs border border-[#d5dcc4] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3f5726] animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-[#3f5726]" />
            <span>{tentang.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif mb-6 leading-[1.15] tracking-tight text-[#141f0d]">
            {tentang.titlePrefix} <br className="hidden sm:inline" />
            <span className="text-[#3f5726]">{tentang.titleHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#243316] font-medium max-w-3xl mx-auto leading-relaxed">
            {tentang.description}
          </p>
        </section>

        {/* 2. VISI & MISI SECTION */}
        <section className="bg-white px-4 py-20 border-y border-[#d5dcc4]/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Kolom Kiri: Visi */}
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-[#f3f6e8] border border-[#d5dcc4]/50 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3f5726] flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-[#1e2a14]">{tentang.visiTitle}</h3>
                  </div>
                  <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                    {tentang.visiText}
                  </p>
                </div>

                {/* Stempel Melingkar SVG (Figma Match) */}
                <div className="flex items-center justify-center p-6 bg-[#f3f6e8]/40 rounded-3xl border border-[#d5dcc4]/30">
                  <div className="w-48 h-48 rounded-full bg-[#3f5726] flex items-center justify-center relative text-white shadow-md">
                    <svg className="w-full h-full absolute inset-0 animate-spin-slow" viewBox="0 0 200 200" style={{ animationDuration: "25s" }}>
                      <path
                        id="textCircle"
                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                        fill="none"
                      />
                      <text className="text-[11px] font-bold tracking-[0.25em] uppercase fill-[#c2db8f]">
                        <textPath href="#textCircle" startOffset="0%">
                          {tentang.stampText}
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
                  <h3 className="text-2xl font-bold font-serif text-[#1e2a14]">{tentang.misiTitle}</h3>
                </div>

                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                    </div>
                    <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                      <strong>{tentang.misi1Title}:</strong> {tentang.misi1Text}
                    </p>
                  </li>

                  <li className="flex gap-4 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#3f5726]" />
                    </div>
                    <p className="text-sm text-[#2b3a1a]/80 leading-relaxed">
                      <strong>{tentang.misi2Title}:</strong> {tentang.misi2Text}
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
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#3f5726]">{tentang.supportBadge}</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-xs border border-[#d5dcc4]/60">
                <Brain className="w-6 h-6 text-[#3f5726]" />
                <span className="font-semibold text-sm">{tentang.supporter1}</span>
              </div>

              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-xs border border-[#d5dcc4]/60">
                <Building2 className="w-6 h-6 text-[#3f5726]" />
                <span className="font-semibold text-sm">{tentang.supporter2}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TIM PENELITI (3 PROFIL) */}
        <section className="bg-[#f3f6e8] px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5a7a35]">{tentang.teamBadge}</span>
              <h2 className="text-2xl md:text-4xl font-bold font-serif">
                {tentang.teamHeading}
              </h2>
              <p className="text-sm text-[#2b3a1a]/70">
                {tentang.teamSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Profil 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">{tentang.member1Name}</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">{tentang.member1Role}</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  {tentang.member1Bio}
                </p>
              </div>

              {/* Profil 2 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">{tentang.member2Name}</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">{tentang.member2Role}</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  {tentang.member2Bio}
                </p>
              </div>

              {/* Profil 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#d5dcc4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-all">
                <div className="w-28 h-28 rounded-full bg-[#f3f6e8] border-4 border-white mb-6 flex items-center justify-center shadow-xs">
                  <User className="w-12 h-12 text-[#3f5726]" />
                </div>
                <h3 className="font-bold text-lg mb-1">{tentang.member3Name}</h3>
                <p className="text-xs font-semibold text-[#5a7a35] mb-4">{tentang.member3Role}</p>
                <p className="text-xs text-[#2b3a1a]/80 leading-relaxed">
                  {tentang.member3Bio}
                </p>
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

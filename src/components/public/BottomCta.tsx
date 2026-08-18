import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface BottomCtaProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function BottomCta({
  title = "Siap Memulai Perjalanan Anda?",
  subtitle = "Ambil langkah pertama untuk merawat kesejahteraan mentalmu dan temukan ketenangan bersama bimbingan Guru BK hari ini.",
  buttonText = "Daftar / Mulai Sekarang",
  buttonHref = "/login",
}: BottomCtaProps) {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto bg-[#3f5726] rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#c2db8f] mb-2 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Langkah Sadarmu</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold leading-tight font-serif">
            {title}
          </h2>

          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#3f5726] px-8 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-[#f3f6e8] transition-all hover:shadow-lg hover:scale-102 cursor-pointer w-full sm:w-auto"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

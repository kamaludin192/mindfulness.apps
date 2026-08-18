import Link from "next/link";
import { Leaf, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e2a14] text-[#e8ece1] py-16 px-4 md:px-8 border-t border-[#3f5726]/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3f5726]">
              <Leaf className="w-4 h-4 text-white" />
            </span>
            <span className="font-serif font-bold text-xl tracking-tight text-white">
              mindfulness<span className="font-normal text-[#c2db8f]">.id</span>
            </span>
          </div>
          <p className="text-sm text-[#e8ece1]/70 max-w-md leading-relaxed">
            Platform Mindfulness-Based Intervention (MBI) berbasis bukti ilmiah yang dirancang khusus untuk memfasilitasi bimbingan konseling dan penguatan kesehatan mental pelajar di Indonesia.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3f5726]/50 text-xs text-[#c2db8f] border border-[#c2db8f]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Klinis • Terukur • Berbasis Bukti</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Navigasi</h4>
          <ul className="space-y-2.5 text-sm text-[#e8ece1]/70">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/program" className="hover:text-white transition-colors">
                Program & 4 Sesi
              </Link>
            </li>
            <li>
              <Link href="/tentang-kami" className="hover:text-white transition-colors">
                Tentang Kami & Tim
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-[#c2db8f] transition-colors font-medium">
                Portal Masuk (Login)
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Crisis Hotline */}
        <div>
          <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Bantuan Darurat</h4>
          <p className="text-xs text-[#e8ece1]/70 mb-3 leading-relaxed">
            Jika Anda atau seseorang yang Anda kenal membutuhkan bantuan psikologis segera:
          </p>
          <div className="p-3.5 rounded-2xl bg-[#3f5726]/30 border border-[#c2db8f]/20 text-xs space-y-1">
            <p className="font-bold text-[#c2db8f] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              Hotline Kemenkes RI: 119
            </p>
            <p className="text-[#e8ece1]/60 text-[11px]">Layanan Konseling & Krisis 24 Jam</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#e8ece1]/50">
        <p>&copy; {new Date().getFullYear()} Mindfulness.id - Hak Cipta Dilindungi.</p>
        <div className="flex gap-6">
          <Link href="/login" className="hover:text-white transition-colors">
            Masuk Siswa
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Masuk Guru BK
          </Link>
        </div>
      </div>
    </footer>
  );
}

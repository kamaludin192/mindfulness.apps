"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/program", label: "Program" },
    { href: "/tentang-kami", label: "Tentang Kami" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d5dcc4] bg-[#f3f6e8]/95 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3f5726] shadow-sm group-hover:scale-105 transition-transform">
            <Leaf className="w-4 h-4 text-white" />
          </span>
          <span className="font-serif font-bold text-lg tracking-tight text-[#3f5726]">
            mindfulness<span className="font-normal text-[#5a7a35]">.id</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-[#d5dcc4]/60 shadow-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#3f5726] text-white shadow-xs"
                    : "text-[#2b3a1a]/80 hover:text-[#2b3a1a] hover:bg-[#e8ece1]/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#3f5726] text-white hover:bg-[#2b3a1a] transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Masuk / Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#3f5726] hover:bg-[#e8ece1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3f5726]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d5dcc4] bg-[#f3f6e8] px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-2xl text-base font-medium transition-all ${
                  isActive
                    ? "bg-[#3f5726] text-white font-semibold"
                    : "text-[#2b3a1a] hover:bg-[#e8ece1]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#d5dcc4]/60">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl text-base font-semibold bg-[#3f5726] text-white hover:bg-[#2b3a1a] transition-colors"
            >
              <span>Masuk / Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

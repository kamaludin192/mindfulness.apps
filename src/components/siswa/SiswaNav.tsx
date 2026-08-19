'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, MessageSquareQuote, User, Leaf, PhoneCall } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { href: '/siswa', label: 'Beranda', icon: Home },
  { href: '/siswa/worksheet', label: 'Sesi & Materi', icon: BookOpen },
  { href: '/siswa/chat', label: 'Konseling BK', icon: MessageSquareQuote },
  { href: '/siswa/profil', label: 'Profil Saya', icon: User },
]

export function SiswaSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#d5dcc4] h-screen sticky top-0 justify-between p-5 z-20">
      <div className="space-y-6">
        {/* Brand Logo */}
        <Link href="/siswa" className="flex items-center gap-2.5 px-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#3f5726] text-white shadow-xs">
            <Leaf className="w-5 h-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm text-[#1e2a14] leading-tight">
              mindfulness
            </span>
            <span className="text-[11px] text-[#3f5726] font-medium">Portal Siswa</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="space-y-1.5 pt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/siswa'
                ? pathname === '/siswa'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#3f5726] text-white shadow-xs'
                    : 'text-[#2b3a1a]/70 hover:bg-[#f3f6e8] hover:text-[#1e2a14]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Ruang Aman / Crisis Hotline Widget */}
      <div className="p-3.5 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4]/80 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-[#3f5726] font-bold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Ruang Aman Siswa</span>
        </div>
        <p className="text-[11px] text-[#2b3a1a]/70 leading-snug">
          Butuh bantuan mendesak? Layanan konseling krisis nasional siap 24/7 di Hotline <strong>119</strong>.
        </p>
      </div>
    </aside>
  )
}

export function SiswaBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#d5dcc4] flex justify-around items-center h-16 px-2 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive =
          item.href === '/siswa'
            ? pathname === '/siswa'
            : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-all ${
              isActive
                ? 'text-[#3f5726] font-bold'
                : 'text-[#2b3a1a]/60 hover:text-[#1e2a14]'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-[#3f5726]/10 -translate-y-0.5' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

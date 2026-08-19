'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  CalendarCheck2,
  Clock,
  LogOut,
  Leaf,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react'
import { logoutAction } from '@/app/siswa/profil/actions'

const NAV_ITEMS = [
  {
    href: '/guru',
    label: 'Dashboard Ringkasan',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/guru/dashboard',
    label: 'Monitoring Siswa & LKS',
    icon: Users,
    exact: false,
  },
  {
    href: '/guru/counseling',
    label: 'Jadwal & Konseling BK',
    icon: CalendarCheck2,
    exact: false,
  },
  {
    href: '/guru/jadwal',
    label: 'CMS Ketersediaan Jadwal',
    icon: Clock,
    exact: false,
  },
]

export function GuruSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-[#d5dcc4] hidden md:flex flex-col sticky top-0 h-screen justify-between p-5 z-20">
      <div className="space-y-6">
        {/* Brand Logo */}
        <Link href="/guru" className="flex items-center gap-2.5 px-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#057a44] text-white shadow-xs shrink-0">
            <Leaf className="w-5 h-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs tracking-tight text-[#0f172a] leading-tight">
              mindfulnessintervention<span className="text-[#057a44]">.id</span>
            </span>
            <span className="text-[10px] text-[#057a44] font-bold">Portal Guru BK</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1.5 pt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#057a44] text-white shadow-xs'
                    : 'text-[#334155] hover:bg-[#f3f6e8] hover:text-[#0f172a]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info & Logout */}
      <div className="pt-4 border-t border-[#e2e8f0] space-y-3">
        <div className="p-3 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] text-[11px] text-[#334155] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#057a44] shrink-0" />
          <span>Akses Terautentikasi Guru BK</span>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

export function GuruMobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="md:hidden bg-white border-b border-[#d5dcc4] p-4 flex items-center justify-between sticky top-0 z-30">
      <Link href="/guru" className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#057a44] text-white">
          <Leaf className="w-4 h-4" />
        </span>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-xs text-[#0f172a]">
            mindfulnessintervention<span className="text-[#057a44]">.id</span>
          </span>
          <span className="text-[9px] text-[#057a44] font-bold">Portal Guru BK</span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 text-[#0f172a] bg-[#f8fafc] rounded-xl border border-[#e2e8f0]"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[#d5dcc4] p-4 shadow-lg space-y-2 animate-in fade-in">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-[#057a44] text-white'
                    : 'text-[#334155] hover:bg-[#f3f6e8]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <div className="pt-2 border-t border-[#e2e8f0]">
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

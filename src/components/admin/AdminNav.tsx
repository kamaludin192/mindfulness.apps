'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Video,
  CalendarCheck2,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import { logoutAction } from '@/app/siswa/profil/actions'

const ADMIN_NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Overview & Metrik',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/users',
    label: 'Manajemen Akun & Role',
    icon: Users,
    exact: false,
  },
  {
    href: '/admin/materi',
    label: 'CMS Materi & Video 4 Sesi',
    icon: Video,
    exact: false,
  },
  {
    href: '/admin/konseling',
    label: 'Audit Jadwal Konseling',
    icon: CalendarCheck2,
    exact: false,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-[#0f172a] text-white border-r border-slate-800 hidden md:flex flex-col sticky top-0 h-screen justify-between p-5 z-20">
      <div className="space-y-6">
        {/* Superadmin Brand Logo */}
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-extrabold shadow-md shrink-0">
            <Shield className="w-5 h-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-sm tracking-tight text-white leading-tight">
              mindfulnessintervention<span className="text-amber-400">.id</span>
            </span>
            <span className="text-[10px] text-amber-400 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              SUPERADMIN CMS
            </span>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Menu Utama CMS
          </p>
          <nav className="space-y-1.5">
            {ADMIN_NAV_ITEMS.map((item) => {
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
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Quick Portal Switchers */}
        <div className="space-y-1 pt-2 border-t border-slate-800">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Pratinjau Portal
          </p>
          <div className="space-y-1">
            <Link
              href="/guru"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Portal Guru BK
              </span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>

            <Link
              href="/siswa"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                Portal Siswa
              </span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info & Logout */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Wewenang Penuh Superadmin</span>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/40 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border border-red-900/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun Admin</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

export function AdminMobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="md:hidden bg-[#0f172a] text-white border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
      <Link href="/admin" className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold">
          <Shield className="w-4 h-4" />
        </span>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-xs text-white">
            mindfulnessintervention<span className="text-amber-400">.id</span>
          </span>
          <span className="text-[9px] text-amber-400 font-extrabold">SUPERADMIN CMS</span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 text-white bg-slate-800 rounded-xl border border-slate-700"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#0f172a] border-b border-slate-800 p-4 shadow-2xl space-y-2 animate-in fade-in">
          {ADMIN_NAV_ITEMS.map((item) => {
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
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-3 border-t border-slate-800 space-y-1">
            <Link
              href="/guru"
              className="flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-400 font-semibold"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Buka Portal Guru BK</span>
            </Link>
            <Link
              href="/siswa"
              className="flex items-center gap-2 px-4 py-2.5 text-xs text-teal-400 font-semibold"
            >
              <Users className="w-4 h-4" />
              <span>Buka Portal Siswa</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-950/40 rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun Admin</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

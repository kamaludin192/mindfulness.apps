'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Bell,
  MessageSquareQuote,
  CalendarCheck2,
  BookOpen,
  Heart,
  CheckCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { type NotificationItem } from '@/lib/notifications'

function formatRelativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return 'Baru saja'
  if (diffMinutes < 60) return `${diffMinutes} mnt lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays === 1) return 'Kemarin'
  return `${diffDays} hari lalu`
}

export default function NotificationBell({
  notifications = [],
  role = 'siswa',
}: {
  notifications: NotificationItem[]
  role?: 'siswa' | 'guru_bk' | 'superadmin'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [readIds, setReadIds] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load read notification IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`read_notifications_${role}`)
      if (stored) {
        setReadIds(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [role])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length

  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id)
    setReadIds(allIds)
    try {
      localStorage.setItem(`read_notifications_${role}`, JSON.stringify(allIds))
    } catch {
      // Ignore
    }
  }

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id]
      setReadIds(updated)
      try {
        localStorage.setItem(`read_notifications_${role}`, JSON.stringify(updated))
      } catch {
        // Ignore
      }
    }
    setIsOpen(false)
  }

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'chat':
        return <MessageSquareQuote className="w-4 h-4 text-emerald-600" />
      case 'booking':
        return <CalendarCheck2 className="w-4 h-4 text-amber-600" />
      case 'session':
        return <BookOpen className="w-4 h-4 text-[#3f5726]" />
      case 'mood':
        return <Heart className="w-4 h-4 text-rose-500" />
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />
    }
  }

  const getCategoryBadgeClass = (category: NotificationItem['category']) => {
    switch (category) {
      case 'chat':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'booking':
        return 'bg-amber-50 text-amber-900 border-amber-200'
      case 'session':
        return 'bg-[#f3f6e8] text-[#2b3a1a] border-[#d5dcc4]'
      case 'mood':
        return 'bg-rose-50 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pusat Notifikasi & Pengingat"
        className="relative p-2.5 rounded-2xl bg-white border border-[#d5dcc4] hover:bg-[#f3f6e8] text-[#1e2a14] transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-center group"
      >
        <Bell className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#3f5726] group-hover:scale-110 transition-transform" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center px-1 rounded-full bg-red-600 text-white font-extrabold text-[10px] ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border-2 border-[#d5dcc4] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#3f5726]/10 text-[#3f5726] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold font-serif text-[#0f172a]">
                  Pusat Notifikasi
                </h3>
                <p className="text-[10px] text-[#64748b]">
                  {unreadCount > 0
                    ? `${unreadCount} pemberitahuan belum dibaca`
                    : 'Semua notifikasi sudah dibaca'}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-bold text-[#057a44] hover:text-[#046238] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Baca Semua</span>
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-[#f1f5f9]">
            {notifications.length > 0 ? (
              notifications.map((item) => {
                const isItemRead = readIds.includes(item.id)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => markAsRead(item.id)}
                    className={`block p-4 transition-colors hover:bg-[#f8fafc] ${
                      !isItemRead ? 'bg-[#f3f6e8]/40' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {getCategoryIcon(item.category)}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <p
                            className={`text-xs font-bold truncate ${
                              !isItemRead ? 'text-[#0f172a]' : 'text-[#475569]'
                            }`}
                          >
                            {item.title}
                          </p>
                          <span className="text-[10px] text-[#94a3b8] shrink-0 flex items-center gap-0.5 font-medium">
                            <Clock className="w-2.5 h-2.5" />
                            {formatRelativeTime(item.createdAt)}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {!isItemRead && (
                        <span className="w-2 h-2 rounded-full bg-[#057a44] shrink-0 mt-2" />
                      )}
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
                  <CheckCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-xs font-bold text-[#0f172a]">Tidak ada notifikasi baru</p>
                <p className="text-[11px] text-[#64748b]">
                  Semua sesi latihan dan jadwal konseling Anda sudah diperbarui.
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation Link */}
          <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] text-center">
            <Link
              href={role === 'siswa' ? '/siswa/chat' : '/guru/counseling'}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#057a44] hover:text-[#046238] transition-colors"
            >
              <span>{role === 'siswa' ? 'Buka Ruang Konseling & Chat' : 'Buka Manajemen Konseling'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

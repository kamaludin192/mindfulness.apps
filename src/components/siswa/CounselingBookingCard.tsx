'use client'

import { useState } from 'react'
import { Calendar, Clock, AlertCircle, Trash2, CalendarDays } from 'lucide-react'
import { requestCounseling, cancelCounseling } from '@/app/siswa/chat/actions'

interface BookingSlot {
  id: string
  timeRange: string
  startTime: string
  isBooked?: boolean
}

const DEFAULT_SLOTS: BookingSlot[] = [
  { id: '1', timeRange: '09:00 - 09:45', startTime: '09:00' },
  { id: '2', timeRange: '10:00 - 10:45', startTime: '10:00' },
  { id: '3', timeRange: '13:00 - 13:45', startTime: '13:00', isBooked: true },
  { id: '4', timeRange: '14:00 - 14:45', startTime: '14:00' },
]

export default function CounselingBookingCard({
  guruId,
  guruName,
  existingBooking,
}: {
  guruId: string
  guruName: string
  existingBooking?: {
    id: string
    scheduled_at: string
    status: 'pending' | 'approved' | 'rejected'
  } | null
}) {
  // Tomorrow's date in YYYY-MM-DD format as default
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDateStr = tomorrow.toISOString().split('T')[0]

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr)
  const [selectedSlot, setSelectedSlot] = useState<string>('1') // default to first slot (09:00 - 09:45)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [canceling, setCanceling] = useState(false)

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedSlot) return

    const slot = DEFAULT_SLOTS.find((s) => s.id === selectedSlot)
    if (!slot || slot.isBooked) return

    setLoading(true)
    setErrorMsg(null)

    try {
      // Build ISO timestamp from selected date and start time
      const scheduledDateTime = new Date(`${selectedDate}T${slot.startTime}:00`).toISOString()
      await requestCounseling(guruId, scheduledDateTime)
    } catch (err) {
      console.error(err)
      const message = err instanceof Error ? err.message : 'Gagal mengajukan jadwal konseling.'
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!existingBooking) return
    setCanceling(true)
    try {
      await cancelCounseling(existingBooking.id)
    } catch (err) {
      console.error(err)
    } finally {
      setCanceling(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-serif tracking-tight">
          Jadwalkan Konseling Guru BK
        </h2>
        <p className="text-xs sm:text-sm text-[#64748b]">
          Pilih slot jam privat bersama {guruName || 'Dra. Endang (Guru BK)'}.
        </p>
      </div>

      {/* If booking already exists */}
      {existingBooking ? (
        <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              Status Jadwal Anda
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                existingBooking.status === 'approved'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : existingBooking.status === 'rejected'
                  ? 'bg-red-50 text-red-800 border-red-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {existingBooking.status === 'approved'
                ? 'Disetujui'
                : existingBooking.status === 'rejected'
                ? 'Ditolak'
                : 'Menunggu Konfirmasi'}
            </span>
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-[#1e293b]">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#057a44]" />
              <span>
                {new Date(existingBooking.scheduled_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#057a44]" />
              <span>
                Pukul{' '}
                {new Date(existingBooking.scheduled_at).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                WIB
              </span>
            </p>
            <p className="text-[11px] text-[#64748b] pt-1">
              Tempat: <strong>Ruang Konseling Bimbingan & Konseling (BK)</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            disabled={canceling}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{canceling ? 'Membatalkan...' : 'Batalkan / Ajukan Jadwal Baru'}</span>
          </button>
        </div>
      ) : (
        /* Form Section */
        <form onSubmit={handleBookingSubmit} className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. TANGGAL SESI */}
          <div className="space-y-2">
            <label
              htmlFor="bookingDate"
              className="text-[11px] font-bold text-[#334155] uppercase tracking-wider block"
            >
              TANGGAL SESI
            </label>
            <div className="relative">
              <input
                id="bookingDate"
                type="date"
                required
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-xs sm:text-sm text-[#0f172a] font-medium focus:outline-none focus:ring-2 focus:ring-[#057a44] focus:border-transparent transition-all cursor-pointer"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#64748b]">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. PILIH JAM KETERSEDIAAN */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold text-[#334155] uppercase tracking-wider block">
              PILIH JAM KETERSEDIAAN
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {DEFAULT_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id
                const isBooked = slot.isBooked

                if (isBooked) {
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled
                      className="py-3 px-3 rounded-2xl border border-[#e2e8f0] bg-[#f1f5f9] text-[#94a3b8] text-xs sm:text-sm font-medium line-through cursor-not-allowed flex items-center justify-center select-none"
                    >
                      {slot.timeRange} (Booked)
                    </button>
                  )
                }

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`py-3 px-3 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#86efac] bg-[#e6f9f0] text-[#065f46] font-bold shadow-xs'
                        : 'border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] text-[#334155] font-medium'
                    }`}
                  >
                    {slot.timeRange}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. SUBMIT CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !selectedSlot}
              className="w-full py-4 px-6 bg-[#057a44] hover:bg-[#046238] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              <span>{loading ? 'Mengirim Permintaan...' : 'Kirim Permintaan Booking Konseling'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

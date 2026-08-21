'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Clock,
  AlertCircle,
  Trash2,
  CalendarDays,
  CheckCircle2,
  MessageSquareQuote,
  UserCheck,
} from 'lucide-react'
import { requestCounseling, cancelCounseling } from '@/app/siswa/chat/actions'

export interface BookingSlot {
  id: string
  timeRange: string
  startTime: string
  isActive?: boolean
  isBooked?: boolean
}

export interface CounselorAvailability {
  active_days?: string[]
  time_slots?: BookingSlot[]
  disabled_dates?: string[]
  custom_notes?: string
}

const DEFAULT_SLOTS: BookingSlot[] = [
  { id: '1', timeRange: '09:00 - 09:45', startTime: '09:00', isActive: true },
  { id: '2', timeRange: '10:00 - 10:45', startTime: '10:00', isActive: true },
  { id: '3', timeRange: '13:00 - 13:45', startTime: '13:00', isActive: true, isBooked: true },
  { id: '4', timeRange: '14:00 - 14:45', startTime: '14:00', isActive: true },
]

export default function CounselingBookingCard({
  guruId,
  guruName,
  guruList,
  existingBooking,
  availability,
}: {
  guruId: string
  guruName: string
  guruList?: { id: string; full_name: string }[] | null
  existingBooking?: {
    id: string
    scheduled_at: string
    status: 'pending' | 'approved' | 'rejected'
  } | null
  availability?: CounselorAvailability | null
}) {
  const router = useRouter()
  // Tomorrow's date in YYYY-MM-DD format as default
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDateStr = tomorrow.toISOString().split('T')[0]

  const slots = availability?.time_slots && availability.time_slots.length > 0
    ? availability.time_slots
    : DEFAULT_SLOTS

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr)
  const [selectedSlot, setSelectedSlot] = useState<string>(slots[0]?.id || '1')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [canceling, setCanceling] = useState(false)

  // Check if date is in blackout / disabled dates
  const isDateBlackout = availability?.disabled_dates?.includes(selectedDate)

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedSlot) return

    const slot = slots.find((s) => s.id === selectedSlot)
    if (!slot || slot.isBooked || slot.isActive === false) return

    if (isDateBlackout) {
      setErrorMsg('Guru BK tidak tersedia pada tanggal yang dipilih. Silakan pilih tanggal lain.')
      return
    }

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
    <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#d5dcc4] shadow-xs w-full space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] font-serif tracking-tight">
            Jadwalkan Konseling Guru BK
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Pilih Guru BK dan slot jam privat yang tersedia untuk bimbingan tatap muka.
          </p>
        </div>

        {/* Guru BK Counselor Picker (if multiple or available) */}
        {guruList && guruList.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] space-y-2">
            <label className="text-xs font-extrabold text-[#1e2a14] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#057a44]" />
                <span>Pilih Guru BK / Konselor:</span>
              </span>
              <span className="text-[11px] font-bold text-[#057a44]">
                {guruList.length} Pendidik Tersedia
              </span>
            </label>
            <select
              value={guruId}
              onChange={(e) => {
                router.push(`/siswa/chat?guruId=${e.target.value}`)
              }}
              className="w-full p-3 bg-white text-[#0f172a] rounded-xl text-xs sm:text-sm font-bold border border-slate-200 outline-none focus:ring-2 focus:ring-[#057a44] shadow-2xs cursor-pointer"
            >
              {guruList.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.full_name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* If booking already exists */}
      {existingBooking ? (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#f8fafc] border border-[#d5dcc4] space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
              Status Jadwal Anda
            </span>
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                existingBooking.status === 'approved'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : existingBooking.status === 'pending'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  : 'bg-red-100 text-red-800 border-red-300'
              }`}
            >
              {existingBooking.status === 'approved' && 'Disetujui'}
              {existingBooking.status === 'pending' && 'Menunggu Konfirmasi'}
              {existingBooking.status === 'rejected' && 'Dibatalkan'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#0f172a] font-bold">
            <CalendarDays className="w-5 h-5 text-[#057a44] shrink-0" />
            <div>
              <p>
                {new Date(existingBooking.scheduled_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-[#475569] font-normal">
                Pukul{' '}
                {new Date(existingBooking.scheduled_at).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                WIB
              </p>
            </div>
          </div>

          {existingBooking.status === 'pending' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#e2e8f0]">
              <p className="text-xs text-[#475569]">
                Permintaan sedang ditinjau oleh Guru BK. Anda dapat membatalkan jika ingin mengganti jadwal.
              </p>
              <button
                type="button"
                onClick={handleCancel}
                disabled={canceling}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{canceling ? 'Membatalkan...' : 'Batalkan Jadwal'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Booking Form matching Reference UI */
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. TANGGAL SESI */}
          <div className="space-y-2">
            <label
              htmlFor="bookingDate"
              className="text-xs font-bold text-[#0f172a] uppercase tracking-wider block"
            >
              TANGGAL SESI
            </label>
            <div className="relative">
              <input
                id="bookingDate"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-4 pl-12 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] font-bold outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white transition-all cursor-pointer"
              />
              <Calendar className="w-5 h-5 text-[#057a44] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {availability?.active_days && availability.active_days.length > 0 && (
              <p className="text-[11px] text-[#475569] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#057a44]" />
                <span>Hari aktif konseling: <strong>{availability.active_days.join(', ')}</strong></span>
              </p>
            )}

            {isDateBlackout && (
              <p className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Tanggal ini tidak menerima bimbingan (Libur/Cuti Khusus).</span>
              </p>
            )}
          </div>

          {/* 2. PILIH JAM KETERSEDIAAN */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider block">
              PILIH JAM KETERSEDIAAN
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot.id
                const isUnavailable = slot.isBooked || slot.isActive === false

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isUnavailable}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`py-3.5 px-3 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                      isSelected
                        ? 'border-2 border-[#057a44] bg-[#f0fdf4] text-[#065f46] shadow-xs'
                        : isUnavailable
                        ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                        : 'border-slate-200 bg-[#f8fafc] text-[#0f172a] hover:bg-slate-100'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        isUnavailable ? 'line-through' : ''
                      }`}
                    >
                      {slot.timeRange}
                    </span>
                    <span className="text-[10px] font-medium">
                      {isUnavailable
                        ? '(Booked/Tutup)'
                        : isSelected
                        ? 'Slot Dipilih'
                        : 'Tersedia'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. CATATAN / PETUNJUK DARI GURU BK */}
          {availability?.custom_notes && (
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#065f46] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <MessageSquareQuote className="w-4 h-4 text-[#057a44]" />
                <span>Petunjuk Ruang & Waktu dari Guru BK:</span>
              </div>
              <p className="leading-relaxed pl-5 font-medium text-[#0f172a]">
                {availability.custom_notes}
              </p>
            </div>
          )}

          {/* 4. BUTTON KIRIM PERMINTAAN */}
          <button
            type="submit"
            disabled={loading || isDateBlackout}
            className="w-full py-4 px-6 bg-[#057a44] hover:bg-[#046238] text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>
              {loading ? 'Mengajukan Jadwal...' : 'Kirim Permintaan Booking Konseling'}
            </span>
          </button>
        </form>
      )}
    </div>
  )
}

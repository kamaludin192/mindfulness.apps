'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  CalendarOff,
  MessageSquareQuote,
  Eye,
  Check,
} from 'lucide-react'
import {
  saveAvailabilitySettings,
  type TimeSlotConfig,
  type AvailabilitySettingsPayload,
} from '@/app/guru/jadwal/actions'

const DAYS_OF_WEEK = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
]

const DEFAULT_TIME_SLOTS: TimeSlotConfig[] = [
  { id: '1', timeRange: '09:00 - 09:45', startTime: '09:00', isActive: true },
  { id: '2', timeRange: '10:00 - 10:45', startTime: '10:00', isActive: true },
  { id: '3', timeRange: '13:00 - 13:45', startTime: '13:00', isActive: true },
  { id: '4', timeRange: '14:00 - 14:45', startTime: '14:00', isActive: true },
]

export default function ScheduleCmsForm({
  initialSettings,
}: {
  initialSettings?: AvailabilitySettingsPayload | null
}) {
  const [activeDays, setActiveDays] = useState<string[]>(
    initialSettings?.activeDays || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
  )
  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>(
    initialSettings?.timeSlots || DEFAULT_TIME_SLOTS
  )
  const [disabledDates, setDisabledDates] = useState<string[]>(
    initialSettings?.disabledDates || []
  )
  const [customNotes, setCustomNotes] = useState<string>(
    initialSettings?.customNotes ||
      'Sesi konseling tatap muka diadakan di Ruang Bimbingan Konseling (BK). Harap hadir 5 menit sebelum waktu yang dipilih.'
  )

  // New slot form state
  const [newStartTime, setNewStartTime] = useState('08:00')
  const [newEndTime, setNewEndTime] = useState('08:45')

  // New blackout date form state
  const [newBlackoutDate, setNewBlackoutDate] = useState('')

  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Toggle active day
  const toggleDay = (day: string) => {
    if (activeDays.includes(day)) {
      if (activeDays.length > 1) {
        setActiveDays(activeDays.filter((d) => d !== day))
      }
    } else {
      setActiveDays([...activeDays, day])
    }
  }

  // Toggle slot active status
  const toggleSlotStatus = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    )
  }

  // Add new time slot
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStartTime || !newEndTime) return

    const newSlot: TimeSlotConfig = {
      id: String(Date.now()),
      timeRange: `${newStartTime} - ${newEndTime}`,
      startTime: newStartTime,
      isActive: true,
    }

    setTimeSlots([...timeSlots, newSlot].sort((a, b) => a.startTime.localeCompare(b.startTime)))
  }

  // Remove slot
  const handleRemoveSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
    }
  }

  // Add blackout date
  const handleAddBlackoutDate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlackoutDate) return
    if (!disabledDates.includes(newBlackoutDate)) {
      setDisabledDates([...disabledDates, newBlackoutDate].sort())
      setNewBlackoutDate('')
    }
  }

  // Remove blackout date
  const handleRemoveBlackoutDate = (dateStr: string) => {
    setDisabledDates(disabledDates.filter((d) => d !== dateStr))
  }

  // Save all settings
  const handleSave = async () => {
    setSaving(true)
    setErrorMsg(null)
    setSavedSuccess(false)

    try {
      await saveAvailabilitySettings({
        activeDays,
        timeSlots,
        disabledDates,
        customNotes,
      })
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 4000)
    } catch (err) {
      console.error(err)
      setErrorMsg('Gagal menyimpan pengaturan jadwal. Silakan coba lagi.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: CMS Control Panels */}
      <div className="lg:col-span-7 space-y-6">
        {/* 1. Panel Hari Layanan */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#e2e8f0] pb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#057a44] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif text-[#0f172a]">
                1. Hari Ketersediaan Layanan BK
              </h2>
              <p className="text-xs text-[#475569]">
                Pilih hari-hari ketika Anda membuka layanan konseling tatap muka untuk siswa.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = activeDays.includes(day)
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#057a44] text-white shadow-xs'
                      : 'bg-[#f8fafc] text-[#475569] border border-slate-200 hover:bg-[#f1f5f9]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{day}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Panel Slot Jam Konseling */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#e2e8f0] pb-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif text-[#0f172a]">
                2. Manajemen Jam Konseling
              </h2>
              <p className="text-xs text-[#475569]">
                Atur jam sesi privat yang dapat dipilih oleh siswa di portal konseling.
              </p>
            </div>
          </div>

          {/* List Existing Slots */}
          <div className="space-y-2.5 pt-1">
            {timeSlots.map((slot, index) => (
              <div
                key={slot.id || index}
                className="flex items-center justify-between p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200 gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-200 text-[#0f172a] font-extrabold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-extrabold text-xs sm:text-sm text-[#0f172a]">
                      {slot.timeRange}
                    </p>
                    <p className="text-[11px] text-[#475569]">
                      Mulai pukul {slot.startTime} WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSlotStatus(slot.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                      slot.isActive
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {slot.isActive ? 'Slot Dibuka' : 'Slot Ditutup'}
                  </button>

                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(slot.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Hapus slot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah Slot Baru */}
          <div className="pt-2 border-t border-[#e2e8f0]">
            <p className="text-xs font-bold text-[#0f172a] mb-2">Tambah Jam Baru:</p>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-2 rounded-xl border border-slate-200 flex-1">
                <span className="text-xs text-[#475569] font-medium">Mulai:</span>
                <input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-[#0f172a] outline-none"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-2 rounded-xl border border-slate-200 flex-1">
                <span className="text-xs text-[#475569] font-medium">Selesai:</span>
                <input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-[#0f172a] outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSlot}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#057a44] hover:bg-[#046238] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Jam</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Panel Tanggal Libur / Nonaktif Khusus (Blackout Dates) */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#e2e8f0] pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <CalendarOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif text-[#0f172a]">
                3. Tanggal Libur / Nonaktif Khusus
              </h2>
              <p className="text-xs text-[#475569]">
                Tentukan tanggal tertentu saat Anda tidak dapat menerima sesi (dinas luar, rapat guru, cuti).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <input
              type="date"
              value={newBlackoutDate}
              onChange={(e) => setNewBlackoutDate(e.target.value)}
              className="p-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-[#057a44] flex-1"
            />
            <button
              type="button"
              onClick={handleAddBlackoutDate}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] border border-[#86efac] rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Tambah Tanggal Libur
            </button>
          </div>

          {/* List Blackout Dates */}
          {disabledDates.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {disabledDates.map((dateStr) => (
                <div
                  key={dateStr}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-800"
                >
                  <span>{new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlackoutDate(dateStr)}
                    className="text-red-500 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[#64748b] italic">
              Tidak ada tanggal libur khusus yang ditambahkan.
            </p>
          )}
        </div>

        {/* 4. Panel Catatan / Pengumuman untuk Siswa */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#d5dcc4] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#e2e8f0] pb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold font-serif text-[#0f172a]">
                4. Petunjuk & Lokasi untuk Siswa
              </h2>
              <p className="text-xs text-[#475569]">
                Pesan ini akan ditampilkan tepat di bawah form pengajuan jadwal siswa.
              </p>
            </div>
          </div>

          <textarea
            rows={3}
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="Tuliskan catatan lokasi ruang BK, syarat kedatangan, dll..."
            className="w-full p-3.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white resize-y leading-relaxed"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2">
          {errorMsg && (
            <div className="p-3.5 mb-3 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-800">
              {errorMsg}
            </div>
          )}

          {savedSuccess && (
            <div className="p-4 mb-3 bg-emerald-50 border-2 border-[#86efac] rounded-2xl text-xs font-extrabold text-[#065f46] flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#057a44] shrink-0" />
              <span>Pengaturan Ketersediaan Jadwal Berhasil Disimpan & Diterapkan ke Portal Siswa!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full py-4 px-6 bg-[#057a44] hover:bg-[#046238] text-white font-extrabold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Menyimpan Pengaturan...' : 'Simpan & Terapkan Pengaturan Jadwal'}</span>
          </button>
        </div>
      </div>

      {/* Right Column: Live Preview of Student Portal Booking Card */}
      <div className="lg:col-span-5 sticky top-6 space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Eye className="w-4 h-4 text-[#057a44]" />
          <h3 className="font-serif font-extrabold text-sm text-[#0f172a]">
            Simulasi Tampilan di Sisi Siswa:
          </h3>
        </div>

        {/* Mock Booking Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#d5dcc4] shadow-sm space-y-5">
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-[#0f172a] font-serif">
              Jadwalkan Konseling Guru BK
            </h4>
            <p className="text-xs text-[#475569]">
              Pilih slot jam privat bersama Guru BK.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#0f172a] block">TANGGAL SESI</label>
            <div className="p-3 bg-[#f8fafc] rounded-xl border border-slate-200 text-xs text-[#0f172a] font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#057a44]" />
              <span>Hari Aktif: {activeDays.join(', ')}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#0f172a] block">PILIH JAM KETERSEDIAAN</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot, i) => (
                <div
                  key={slot.id || i}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${
                    i === 0
                      ? 'border-[#057a44] bg-emerald-50 text-[#065f46] shadow-2xs'
                      : slot.isActive
                      ? 'border-slate-200 bg-[#f8fafc] text-[#0f172a]'
                      : 'border-slate-200 bg-slate-100 text-slate-400 line-through'
                  }`}
                >
                  <p>{slot.timeRange}</p>
                  <p className="text-[10px] font-normal">
                    {i === 0 ? '(Dipilih)' : slot.isActive ? '(Tersedia)' : '(Tutup)'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Notes Preview */}
          {customNotes && (
            <div className="p-3.5 bg-[#f0fdf4] rounded-2xl border border-[#bbf7d0] text-[11px] text-[#065f46] leading-relaxed">
              <span className="font-bold block mb-0.5">Petunjuk Guru BK:</span>
              {customNotes}
            </div>
          )}

          <button
            type="button"
            disabled
            className="w-full py-3.5 rounded-2xl bg-[#057a44] text-white font-bold text-xs opacity-90 cursor-not-allowed text-center shadow-xs"
          >
            Kirim Permintaan Booking Konseling
          </button>
        </div>
      </div>
    </div>
  )
}

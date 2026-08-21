'use client'

import { useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  CalendarCheck2,
  Calendar,
  Clock,
  ArrowRight,
  Send,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  MessageSquareQuote,
} from 'lucide-react'
import { submitProgramEvaluation } from '@/app/siswa/evaluasi/actions'
import Link from 'next/link'

interface PostProgramEvaluationCardProps {
  completedCount: number
  guruId?: string
  guruName?: string
}

export default function PostProgramEvaluationCard({
  completedCount,
  guruId = 'b2c3d4e5-f6a1-4b2c-9d8e-1f2a3b4c5d6e',
  guruName = 'Dra. Endang (Guru BK)',
}: PostProgramEvaluationCardProps) {
  // Only display when student has finished all 4 sessions
  if (completedCount < 4) {
    return null
  }

  // Tomorrow's date default
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDateStr = tomorrow.toISOString().split('T')[0]

  const TIME_SLOTS = [
    { id: '1', timeRange: '09:00 - 09:45 WIB', startTime: '09:00' },
    { id: '2', timeRange: '10:00 - 10:45 WIB', startTime: '10:00' },
    { id: '3', timeRange: '13:00 - 13:45 WIB', startTime: '13:00' },
    { id: '4', timeRange: '14:00 - 14:45 WIB', startTime: '14:00' },
  ]

  const [rating, setRating] = useState<'membantu' | 'tidak_membantu' | null>(null)
  const [followUp, setFollowUp] = useState<'selesai' | 'konseling' | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr)
  const [selectedSlot, setSelectedSlot] = useState<string>('1')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) {
      setErrorMsg('Silakan pilih apakah program ini Membantu atau Tidak Membantu terlebih dahulu.')
      return
    }
    if (!followUp) {
      setErrorMsg('Silakan pilih apakah ingin Selesai Latihannya atau Lanjut Konseling dengan Guru BK.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      let scheduledAt: string | undefined
      if (followUp === 'konseling') {
        const slot = TIME_SLOTS.find((s) => s.id === selectedSlot) || TIME_SLOTS[0]
        scheduledAt = new Date(`${selectedDate}T${slot.startTime}:00`).toISOString()
      }

      await submitProgramEvaluation({
        feedbackRating: rating,
        followUpChoice: followUp,
        notes: notes.trim() || undefined,
        scheduledAt,
        guruId,
      })

      setIsSubmitted(true)
    } catch (err: unknown) {
      const error = err as Error
      setErrorMsg(error?.message || 'Gagal mengirim evaluasi layanan.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-[#1a2e12] via-[#243a18] to-[#12200c] text-white rounded-3xl p-6 sm:p-8 md:p-9 border-2 border-[#a3e635]/40 shadow-xl space-y-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 text-xs font-extrabold text-[#bef264] border border-[#a3e635]/40">
          <Sparkles className="w-4 h-4 text-[#a3e635]" />
          <span>Selamat! Anda Telah Menyelesaikan 4 Sesi Penuh (100%)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight text-white">
          Evaluasi Layanan Intervensi Mindfulness 🌿
        </h2>
        <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed max-w-2xl">
          Terima kasih telah berpartisipasi aktif dalam 4 sesi latihan mindfulness. Mohon berikan evaluasi singkat mengenai pengalaman yang Anda rasakan serta tentukan langkah selanjutnya.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#a3e635]/50 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#a3e635] text-[#0f172a] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Evaluasi Berhasil Tersimpan!</h3>
              <p className="text-xs text-[#bef264]">
                Jawaban Anda telah terekam dan diteruskan ke Guru BK.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-xs sm:text-sm text-white/90 space-y-2">
            <p>
              <strong>Penilaian Layanan:</strong>{' '}
              <span className="text-[#a3e635] font-bold">
                {rating === 'membantu' ? '👍 Membantu' : '👎 Tidak Membantu'}
              </span>
            </p>
            <p>
              <strong>Langkah Pilihan:</strong>{' '}
              <span className="text-[#a3e635] font-bold">
                {followUp === 'konseling'
                  ? `💬 Lanjut Konseling dengan Guru BK (${guruName})`
                  : '🌱 Selesai Latihannya (Mandiri)'}
              </span>
            </p>
            {followUp === 'konseling' && (
              <p className="text-xs text-amber-200">
                Permohonan jadwal bimbingan konseling telah otomatis dikirim ke Guru BK dan menunggu konfirmasi.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {followUp === 'konseling' && (
              <Link
                href="/siswa/chat"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#0f172a] text-xs font-extrabold transition-colors cursor-pointer"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Buka Ruang Konseling & Chat BK</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Ubah Jawaban Evaluasi
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Question 1: Membantu / Tidak Membantu */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <label className="block text-xs sm:text-sm font-extrabold text-white">
              1. Apakah 4 sesi layanan intervensi mindfulness ini membantu Anda?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRating('membantu')
                  setErrorMsg(null)
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-left cursor-pointer ${
                  rating === 'membantu'
                    ? 'bg-[#a3e635] text-[#0f172a] border-[#bef264] shadow-md scale-[1.01]'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  rating === 'membantu' ? 'bg-[#0f172a] text-[#a3e635]' : 'bg-white/20 text-white'
                }`}>
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm">Membantu</p>
                  <p className={`text-[11px] ${rating === 'membantu' ? 'text-[#0f172a]/80' : 'text-white/70'}`}>
                    Merasa lebih tenang, fokus, dan terbantu.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRating('tidak_membantu')
                  setErrorMsg(null)
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-left cursor-pointer ${
                  rating === 'tidak_membantu'
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md scale-[1.01]'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  rating === 'tidak_membantu' ? 'bg-white text-rose-600' : 'bg-white/20 text-white'
                }`}>
                  <ThumbsDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm">Tidak Membantu</p>
                  <p className={`text-[11px] ${rating === 'tidak_membantu' ? 'text-white/90' : 'text-white/70'}`}>
                    Belum merasakan perubahan signifikan.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Question 2: Selesai Latihan / Lanjut Konseling Guru BK */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <label className="block text-xs sm:text-sm font-extrabold text-white">
              2. Setelah menyelesaikan 4 sesi ini, apa yang Anda pilih selanjutnya?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFollowUp('selesai')
                  setErrorMsg(null)
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-left cursor-pointer ${
                  followUp === 'selesai'
                    ? 'bg-[#a3e635] text-[#0f172a] border-[#bef264] shadow-md scale-[1.01]'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  followUp === 'selesai' ? 'bg-[#0f172a] text-[#a3e635]' : 'bg-white/20 text-white'
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm">Selesai Latihannya</p>
                  <p className={`text-[11px] ${followUp === 'selesai' ? 'text-[#0f172a]/80' : 'text-white/70'}`}>
                    Merasa cukup dan akan menerapkan latihan secara mandiri.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFollowUp('konseling')
                  setErrorMsg(null)
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-left cursor-pointer ${
                  followUp === 'konseling'
                    ? 'bg-[#a3e635] text-[#0f172a] border-[#bef264] shadow-md scale-[1.01]'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  followUp === 'konseling' ? 'bg-[#0f172a] text-[#a3e635]' : 'bg-white/20 text-white'
                }`}>
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm">Lanjut Konseling dengan Guru BK</p>
                  <p className={`text-[11px] ${followUp === 'konseling' ? 'text-[#0f172a]/80' : 'text-white/70'}`}>
                    Ingin bimbingan tatap muka / konsultasi lanjutan bersama Guru BK.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Form if student chooses "Lanjut Konseling" */}
          {followUp === 'konseling' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border-2 border-[#a3e635]/60 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#bef264]">
                <CalendarCheck2 className="w-4 h-4" />
                <span>Pilih Jadwal Temu Bimbingan Bersama {guruName}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#a3e635]" />
                    <span>Pilih Tanggal Konseling:</span>
                  </label>
                  <input
                    type="date"
                    min={defaultDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-white text-[#0f172a] rounded-xl text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-[#a3e635]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#a3e635]" />
                    <span>Pilih Sesi Jam:</span>
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-3 bg-white text-[#0f172a] rounded-xl text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-[#a3e635]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.timeRange}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white block">
                  Topik atau hal yang ingin dikonsultasikan (Opsional):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Ingin mendiskusikan kendala fokus belajar atau kecemasan..."
                  className="w-full p-3 bg-white text-[#0f172a] rounded-xl text-xs sm:text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#a3e635]"
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/20 border border-rose-500 text-rose-200 text-xs font-bold rounded-xl animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !rating || !followUp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#a3e635] hover:bg-[#bef264] text-[#0f172a] text-xs sm:text-sm font-extrabold transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Evaluasi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Evaluasi & Konfirmasi</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}

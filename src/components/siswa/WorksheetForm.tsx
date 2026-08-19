'use client'

import { useState } from 'react'
import { submitWorksheet } from '@/app/siswa/worksheet/actions'
import { CheckCircle2, Save, FileEdit } from 'lucide-react'

interface WorksheetFormProps {
  sessionId: string
  initialData?: { reflection?: string; actionPlan?: string } | null
  status: 'in_progress' | 'completed' | null
}

export default function WorksheetForm({ sessionId, initialData, status }: WorksheetFormProps) {
  const [loading, setLoading] = useState(false)
  const [reflection, setReflection] = useState(initialData?.reflection || '')
  const [actionPlan, setActionPlan] = useState(initialData?.actionPlan || '')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitWorksheet(sessionId, JSON.stringify({ reflection, actionPlan }))
      setSavedSuccess(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const isCompleted = status === 'completed' || savedSuccess

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6 pt-6 border-t border-[#d5dcc4]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-bold font-serif text-[#1e2a14] flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#3f5726]" />
            Lembar Kerja & Refleksi Digital
          </h3>
          <p className="text-xs text-[#2b3a1a]/70">
            Tuliskan perasaan dan rencanamu dengan jujur. Catatan ini aman dan privat.
          </p>
        </div>
      </div>

      {/* Field 1: Refleksi Diri */}
      <div className="bg-[#f8fafc] rounded-2xl border border-[#d5dcc4] overflow-hidden focus-within:border-[#3f5726] focus-within:ring-2 focus-within:ring-[#3f5726]/20 transition-all">
        <div className="bg-[#f3f6e8] px-4 py-3 border-b border-[#d5dcc4] flex items-center justify-between">
          <label htmlFor="reflection" className="text-xs md:text-sm font-bold text-[#1e2a14]">
            1. Refleksi Diri (Apa yang kamu rasakan & pelajari?)
          </label>
          <span className="text-[11px] text-[#3f5726] font-medium">Wajib Diisi</span>
        </div>
        <div className="p-4">
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            disabled={isCompleted}
            placeholder="Ceritakan pengalamanmu saat mempraktikkan latihan mindfulness dalam video ini..."
            rows={4}
            className="w-full p-2 bg-transparent text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none resize-y disabled:opacity-75"
            required
          />
        </div>
      </div>

      {/* Field 2: Rencana Aksi */}
      <div className="bg-[#f8fafc] rounded-2xl border border-[#d5dcc4] overflow-hidden focus-within:border-[#3f5726] focus-within:ring-2 focus-within:ring-[#3f5726]/20 transition-all">
        <div className="bg-[#f3f6e8] px-4 py-3 border-b border-[#d5dcc4] flex items-center justify-between">
          <label htmlFor="actionPlan" className="text-xs md:text-sm font-bold text-[#1e2a14]">
            2. Rencana Aksi (Langkah kecil yang akan kamu coba hari ini)
          </label>
          <span className="text-[11px] text-[#3f5726] font-medium">Wajib Diisi</span>
        </div>
        <div className="p-4">
          <textarea
            id="actionPlan"
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            disabled={isCompleted}
            placeholder="Contoh: Saya akan meluangkan waktu 2 menit mengambil napas sadar sebelum mulai belajar..."
            rows={3}
            className="w-full p-2 bg-transparent text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none resize-y disabled:opacity-75"
            required
          />
        </div>
      </div>

      {/* Submit / Completed Feedback */}
      {!isCompleted ? (
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-5 bg-[#3f5726] hover:bg-[#2b3a1a] text-white font-semibold text-xs md:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{loading ? 'Menyimpan Jawaban...' : 'Simpan Lembar Kerja & Selesaikan Sesi'}</span>
        </button>
      ) : (
        <div className="p-4 bg-green-50 rounded-2xl border border-green-200 text-green-800 text-xs md:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="font-bold">Lembar Kerja Sesi Ini Telah Berhasil Diselesaikan</p>
              <p className="text-[11px] text-green-700">Jawabanmu telah tersimpan dan dapat ditinjau oleh Guru BK.</p>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

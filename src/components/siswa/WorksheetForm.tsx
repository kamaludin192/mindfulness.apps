'use client'

import { useState } from 'react'
import { submitWorksheet } from '@/app/siswa/worksheet/actions'
import { CheckCircle2, Save } from 'lucide-react'

interface WorksheetFormProps {
  sessionId: string
  initialData?: { reflection?: string; actionPlan?: string } | null
  status: 'in_progress' | 'completed' | null
}

export default function WorksheetForm({ sessionId, initialData, status }: WorksheetFormProps) {
  const [loading, setLoading] = useState(false)
  const [reflection, setReflection] = useState(initialData?.reflection || '')
  const [actionPlan, setActionPlan] = useState(initialData?.actionPlan || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitWorksheet(sessionId, JSON.stringify({ reflection, actionPlan }))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const isCompleted = status === 'completed'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <h3 className="text-xl font-bold text-brand-900 mb-2">Lembar Kerja Siswa</h3>
      
      <div className="bg-surface rounded-2xl shadow-sm border border-brand-50 overflow-hidden flex flex-col">
        <div className="bg-brand-50 px-4 py-3 border-b border-brand-100">
          <label htmlFor="reflection" className="font-semibold text-brand-900 block">
            Refleksi Diri
          </label>
        </div>
        <div className="p-4">
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            disabled={isCompleted}
            placeholder="Apa yang kamu pelajari dari video tersebut?"
            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none transition-all resize-y text-gray-800 disabled:bg-gray-50"
            required
          />
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-brand-50 overflow-hidden flex flex-col">
        <div className="bg-brand-50 px-4 py-3 border-b border-brand-100">
          <label htmlFor="actionPlan" className="font-semibold text-brand-900 block">
            Rencana Aksi
          </label>
        </div>
        <div className="p-4">
          <textarea
            id="actionPlan"
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            disabled={isCompleted}
            placeholder="Tindakan apa yang akan kamu lakukan?"
            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none transition-all resize-y text-gray-800 disabled:bg-gray-50"
            required
          />
        </div>
      </div>

      {!isCompleted ? (
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 px-4 bg-brand-900 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Menyimpan LKS...' : 'Simpan LKS & Selesaikan Sesi'}
        </button>
      ) : (
        <div className="mt-2 w-full py-3 px-4 bg-green-50 text-green-700 font-medium rounded-xl flex items-center justify-center gap-2 border border-green-200">
          <CheckCircle2 className="w-5 h-5" />
          Sesi Ini Telah Diselesaikan
        </div>
      )}
    </form>
  )
}

'use client'

import { useState } from 'react'
import { submitWorksheet } from '@/app/siswa/worksheet/actions'
import {
  CheckCircle2,
  Save,
  Plus,
  Trash2,
} from 'lucide-react'

export interface BreathingRow {
  id: string
  date: string
  time: string
  duration: string
  notes: string
}

export interface ExperienceRow {
  id: string
  experience: string
  sensations: string
  feelings: string
  thoughts: string
}

export interface ThoughtRow {
  id: string
  situation: string
  thoughts: string
  emotions: string
  sensations: string
}

export interface IntegrationRow {
  id: string
  experience: string
  sensations: string
  selfCompassion: string
  commitment: string
}

export interface WorksheetPayload {
  sessionNumber?: number
  breathingRows?: BreathingRow[]
  experienceRows?: ExperienceRow[]
  thoughtRows?: ThoughtRow[]
  integrationRows?: IntegrationRow[]
  summaryNote?: string
  submittedAt?: string
}

interface WorksheetFormProps {
  sessionId: string
  sessionNumber: number
  initialData?: WorksheetPayload | null
  status: 'in_progress' | 'completed' | null
}

// Default templates for each worksheet
const DEFAULT_BREATHING_ROWS: BreathingRow[] = [
  { id: '1', date: '', time: '', duration: '', notes: '' },
  { id: '2', date: '', time: '', duration: '', notes: '' },
  { id: '3', date: '', time: '', duration: '', notes: '' },
]

const DEFAULT_EXPERIENCE_ROWS: ExperienceRow[] = [
  { id: '1', experience: '', sensations: '', feelings: '', thoughts: '' },
  { id: '2', experience: '', sensations: '', feelings: '', thoughts: '' },
]

const DEFAULT_THOUGHT_ROWS: ThoughtRow[] = [
  { id: '1', situation: '', thoughts: '', emotions: '', sensations: '' },
  { id: '2', situation: '', thoughts: '', emotions: '', sensations: '' },
]

const DEFAULT_INTEGRATION_ROWS: IntegrationRow[] = [
  { id: '1', experience: '', sensations: '', selfCompassion: '', commitment: '' },
  { id: '2', experience: '', sensations: '', selfCompassion: '', commitment: '' },
]

export default function WorksheetForm({
  sessionId,
  sessionNumber = 1,
  initialData,
  status,
}: WorksheetFormProps) {
  const [loading, setLoading] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Sesi 1 State (Mindful Breathing)
  const [breathingRows, setBreathingRows] = useState<BreathingRow[]>(
    initialData?.breathingRows || DEFAULT_BREATHING_ROWS
  )

  // Sesi 2 State (Experiences Calender)
  const [experienceRows, setExperienceRows] = useState<ExperienceRow[]>(
    initialData?.experienceRows || DEFAULT_EXPERIENCE_ROWS
  )

  // Sesi 3 State (Daily Thought Record)
  const [thoughtRows, setThoughtRows] = useState<ThoughtRow[]>(
    initialData?.thoughtRows || DEFAULT_THOUGHT_ROWS
  )

  // Sesi 4 State (Integration & Self-Compassion)
  const [integrationRows, setIntegrationRows] = useState<IntegrationRow[]>(
    initialData?.integrationRows || DEFAULT_INTEGRATION_ROWS
  )

  // General reflections
  const [summaryNote, setSummaryNote] = useState<string>(initialData?.summaryNote || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload: WorksheetPayload = {
        sessionNumber,
        breathingRows: sessionNumber === 1 ? breathingRows : undefined,
        experienceRows: sessionNumber === 2 ? experienceRows : undefined,
        thoughtRows: sessionNumber === 3 ? thoughtRows : undefined,
        integrationRows: sessionNumber === 4 ? integrationRows : undefined,
        summaryNote,
        submittedAt: new Date().toISOString(),
      }

      await submitWorksheet(sessionId, JSON.stringify(payload))
      setSavedSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isCompleted = status === 'completed' || savedSuccess

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6 pt-6 border-t border-[#d5dcc4]">
      {/* Header Worksheet */}
      <div className="text-center space-y-1 pb-2 border-b border-[#d5dcc4]/60">
        <span className="text-[10px] font-mono tracking-widest text-[#2b3a1a]/60 uppercase">
          LAMPIRAN MODUL MINDFULNESS
        </span>
        <h3 className="text-lg md:text-xl font-bold font-serif text-[#1e2a14] uppercase tracking-wide">
          {sessionNumber === 1 && 'WORKSHEET LATIHAN MINDFUL BREATHING'}
          {sessionNumber === 2 && 'WORKSHEET EXPERIENCES CALENDER'}
          {sessionNumber === 3 && 'WORKSHEET DAILY THOUGHT RECORD'}
          {sessionNumber === 4 && 'WORKSHEET EXPERIENCES CALENDER & INTEGRASI'}
        </h3>
        {sessionNumber === 2 && (
          <div className="max-w-2xl mx-auto pt-2 text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed italic bg-[#f3f6e8] p-3.5 rounded-2xl border border-[#d5dcc4]">
            &ldquo;Menyadari peristiwa yang menyenangkan pada saat itu terjadi. Gunakan pertanyaan untuk memusatkan perhatian Anda pada detail pengalaman saat itu terjadi, lalu selesaikan kalender pengalaman menyenangkan sesegera mungkin setelah pengalaman itu.&rdquo;
          </div>
        )}
        {sessionNumber === 3 && (
          <div className="max-w-2xl mx-auto pt-2 text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed italic bg-[#f3f6e8] p-3.5 rounded-2xl border border-[#d5dcc4]">
            &ldquo;Catat dan kenali peristiwa pemicu, pikiran otomatis yang melintas, kadar intensitas perasaan emosi (0–10), dan sensasi fisik pada tubuh Anda.&rdquo;
          </div>
        )}
        {sessionNumber === 4 && (
          <div className="max-w-2xl mx-auto pt-2 text-xs md:text-sm text-[#2b3a1a]/80 leading-relaxed italic bg-[#f3f6e8] p-3.5 rounded-2xl border border-[#d5dcc4]">
            &ldquo;Menerapkan welas asih diri (self-compassion) saat menghadapi momen sulit serta merangkul komitmen latihan kesadaran penuh dalam kehidupan sehari-hari.&rdquo;
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 1. SESI 1: LATIHAN MINDFUL BREATHING TABLE */}
      {/* ========================================================= */}
      {sessionNumber === 1 && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-[#1e2a14] shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#e2e8f0]/60 border-b border-[#1e2a14] text-[#1e2a14] font-bold text-center">
                  <th className="p-3 border-r border-[#1e2a14] w-[25%] uppercase">HARI / TANGGAL</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[18%] uppercase">PUKUL</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[18%] uppercase">DURASI</th>
                  <th className="p-3 border-r border-[#1e2a14] uppercase">KET (PENGAMATAN)</th>
                  {!isCompleted && <th className="p-3 w-10"></th>}
                </tr>
              </thead>
              <tbody>
                {breathingRows.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b border-[#1e2a14]/30 hover:bg-[#f8fafc]">
                    <td className="p-2.5 border-r border-[#1e2a14]">
                      <input
                        type="text"
                        disabled={isCompleted}
                        value={row.date}
                        onChange={(e) => {
                          const updated = [...breathingRows]
                          updated[idx].date = e.target.value
                          setBreathingRows(updated)
                        }}
                        placeholder="e.g. Senin, 24 Ags"
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14]">
                      <input
                        type="text"
                        disabled={isCompleted}
                        value={row.time}
                        onChange={(e) => {
                          const updated = [...breathingRows]
                          updated[idx].time = e.target.value
                          setBreathingRows(updated)
                        }}
                        placeholder="07:00 WIB"
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14]">
                      <input
                        type="text"
                        disabled={isCompleted}
                        value={row.duration}
                        onChange={(e) => {
                          const updated = [...breathingRows]
                          updated[idx].duration = e.target.value
                          setBreathingRows(updated)
                        }}
                        placeholder="10 Menit"
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14]">
                      <input
                        type="text"
                        disabled={isCompleted}
                        value={row.notes}
                        onChange={(e) => {
                          const updated = [...breathingRows]
                          updated[idx].notes = e.target.value
                          setBreathingRows(updated)
                        }}
                        placeholder="Sensasi napas & tubuh yang dirasakan..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none disabled:border-none"
                      />
                    </td>
                    {!isCompleted && (
                      <td className="p-2 text-center">
                        {breathingRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setBreathingRows(breathingRows.filter((_, i) => i !== idx))
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isCompleted && (
            <button
              type="button"
              onClick={() => {
                setBreathingRows([
                  ...breathingRows,
                  { id: String(Date.now()), date: '', time: '', duration: '', notes: '' },
                ])
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f3f6e8] hover:bg-[#e6edd2] text-[#3f5726] rounded-xl text-xs font-bold border border-[#d5dcc4] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Baris Latihan</span>
            </button>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SESI 2: EXPERIENCES CALENDER TABLE */}
      {/* ========================================================= */}
      {sessionNumber === 2 && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-[#1e2a14] shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#e2e8f0]/60 border-b border-[#1e2a14] text-[#1e2a14] font-bold text-center">
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Ceritakan PENGALAMANNYA</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Bagaimana SENSASI TUBUH Anda secara detail</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Suasana hati & PERASAAN yang menyertai</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">PIKIRAN di benak Anda sekarang saat menulis ini</th>
                  {!isCompleted && <th className="p-2 w-8"></th>}
                </tr>
              </thead>
              <tbody>
                {experienceRows.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b border-[#1e2a14]/30 hover:bg-[#f8fafc]">
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.experience}
                        onChange={(e) => {
                          const updated = [...experienceRows]
                          updated[idx].experience = e.target.value
                          setExperienceRows(updated)
                        }}
                        placeholder="Peristiwa menyenangkan apa yang terjadi?"
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.sensations}
                        onChange={(e) => {
                          const updated = [...experienceRows]
                          updated[idx].sensations = e.target.value
                          setExperienceRows(updated)
                        }}
                        placeholder="Sensasi fisik di tubuh (rileks, hangat, lega, dll)..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.feelings}
                        onChange={(e) => {
                          const updated = [...experienceRows]
                          updated[idx].feelings = e.target.value
                          setExperienceRows(updated)
                        }}
                        placeholder="Emosi & perasaan yang menyertai..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.thoughts}
                        onChange={(e) => {
                          const updated = [...experienceRows]
                          updated[idx].thoughts = e.target.value
                          setExperienceRows(updated)
                        }}
                        placeholder="Pikiran di benak saat menuliskan ini..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    {!isCompleted && (
                      <td className="p-2 text-center align-top">
                        {experienceRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setExperienceRows(experienceRows.filter((_, i) => i !== idx))
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isCompleted && (
            <button
              type="button"
              onClick={() => {
                setExperienceRows([
                  ...experienceRows,
                  { id: String(Date.now()), experience: '', sensations: '', feelings: '', thoughts: '' },
                ])
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f3f6e8] hover:bg-[#e6edd2] text-[#3f5726] rounded-xl text-xs font-bold border border-[#d5dcc4] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pengalaman Menyenangkan</span>
            </button>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. SESI 3: DAILY THOUGHT RECORD TABLE */}
      {/* ========================================================= */}
      {sessionNumber === 3 && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-[#1e2a14] shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#e2e8f0]/60 border-b border-[#1e2a14] text-[#1e2a14] font-bold text-center">
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">
                    Ceritakan KEJADIAN SPESIFIKNYA (Apa? Kapan? Di Mana? Siapa?)
                  </th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">
                    PIKIRAN / BAYANGAN selintas apa yang muncul pada saat itu?
                  </th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">
                    PERASAAN apa yang muncul? Berapa kadarnya dari 0 – 10?
                  </th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">
                    SENSASI TUBUH
                  </th>
                  {!isCompleted && <th className="p-2 w-8"></th>}
                </tr>
              </thead>
              <tbody>
                {thoughtRows.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b border-[#1e2a14]/30 hover:bg-[#f8fafc]">
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.situation}
                        onChange={(e) => {
                          const updated = [...thoughtRows]
                          updated[idx].situation = e.target.value
                          setThoughtRows(updated)
                        }}
                        placeholder="Contoh: Menghadapi ujian matematika di kelas bersama teman-teman..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.thoughts}
                        onChange={(e) => {
                          const updated = [...thoughtRows]
                          updated[idx].thoughts = e.target.value
                          setThoughtRows(updated)
                        }}
                        placeholder="Contoh: 'Saya pasti tidak bisa mengerjakan soal ini'..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.emotions}
                        onChange={(e) => {
                          const updated = [...thoughtRows]
                          updated[idx].emotions = e.target.value
                          setThoughtRows(updated)
                        }}
                        placeholder="Contoh: Cemas (Kadar 8/10), Takut (Kadar 7/10)..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.sensations}
                        onChange={(e) => {
                          const updated = [...thoughtRows]
                          updated[idx].sensations = e.target.value
                          setThoughtRows(updated)
                        }}
                        placeholder="Contoh: Jantung berdegup cepat, bahu tegang, telapak tangan berkeringat..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    {!isCompleted && (
                      <td className="p-2 text-center align-top">
                        {thoughtRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setThoughtRows(thoughtRows.filter((_, i) => i !== idx))
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isCompleted && (
            <button
              type="button"
              onClick={() => {
                setThoughtRows([
                  ...thoughtRows,
                  { id: String(Date.now()), situation: '', thoughts: '', emotions: '', sensations: '' },
                ])
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f3f6e8] hover:bg-[#e6edd2] text-[#3f5726] rounded-xl text-xs font-bold border border-[#d5dcc4] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Catatan Pikiran</span>
            </button>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. SESI 4: INTEGRASI & WELAS ASIH DIRI TABLE */}
      {/* ========================================================= */}
      {sessionNumber === 4 && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-[#1e2a14] shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#e2e8f0]/60 border-b border-[#1e2a14] text-[#1e2a14] font-bold text-center">
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Ceritakan Momen / Pengalaman</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Sensasi Tubuh yang Muncul</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Respon Welas Asih Diri (Self-Compassion)</th>
                  <th className="p-3 border-r border-[#1e2a14] w-[25%]">Komitmen Praktik Harian</th>
                  {!isCompleted && <th className="p-2 w-8"></th>}
                </tr>
              </thead>
              <tbody>
                {integrationRows.map((row, idx) => (
                  <tr key={row.id || idx} className="border-b border-[#1e2a14]/30 hover:bg-[#f8fafc]">
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.experience}
                        onChange={(e) => {
                          const updated = [...integrationRows]
                          updated[idx].experience = e.target.value
                          setIntegrationRows(updated)
                        }}
                        placeholder="Tantangan atau momen berharga yang dialami..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.sensations}
                        onChange={(e) => {
                          const updated = [...integrationRows]
                          updated[idx].sensations = e.target.value
                          setIntegrationRows(updated)
                        }}
                        placeholder="Sensasi fisik yang disadari..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.selfCompassion}
                        onChange={(e) => {
                          const updated = [...integrationRows]
                          updated[idx].selfCompassion = e.target.value
                          setIntegrationRows(updated)
                        }}
                        placeholder="Kata-kata kebaikan untuk diri sendiri saat gagal/lelah..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    <td className="p-2.5 border-r border-[#1e2a14] align-top">
                      <textarea
                        rows={3}
                        disabled={isCompleted}
                        value={row.commitment}
                        onChange={(e) => {
                          const updated = [...integrationRows]
                          updated[idx].commitment = e.target.value
                          setIntegrationRows(updated)
                        }}
                        placeholder="Langkah nyata menjaga ketenangan secara mandiri..."
                        className="w-full p-2 rounded-xl bg-transparent border border-slate-200 focus:border-[#3f5726] focus:bg-white outline-none resize-y disabled:border-none"
                      />
                    </td>
                    {!isCompleted && (
                      <td className="p-2 text-center align-top">
                        {integrationRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setIntegrationRows(integrationRows.filter((_, i) => i !== idx))
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isCompleted && (
            <button
              type="button"
              onClick={() => {
                setIntegrationRows([
                  ...integrationRows,
                  { id: String(Date.now()), experience: '', sensations: '', selfCompassion: '', commitment: '' },
                ])
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#f3f6e8] hover:bg-[#e6edd2] text-[#3f5726] rounded-xl text-xs font-bold border border-[#d5dcc4] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Baris Refleksi Integrasi</span>
            </button>
          )}
        </div>
      )}

      {/* Summary Note */}
      <div className="bg-[#f8fafc] p-4 sm:p-5 rounded-2xl border border-[#d5dcc4] space-y-2">
        <label htmlFor="summaryNote" className="text-xs sm:text-sm font-bold text-[#1e2a14] block">
          Catatan & Kesimpulan Pembelajaran Sesi Ini (Opsional)
        </label>
        <textarea
          id="summaryNote"
          rows={2}
          disabled={isCompleted}
          value={summaryNote}
          onChange={(e) => setSummaryNote(e.target.value)}
          placeholder="Tuliskan wawasan atau hal penting yang ingin kamu ingat dari sesi ini..."
          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none focus:ring-2 focus:ring-[#3f5726] disabled:border-none disabled:bg-transparent"
        />
      </div>

      {/* Submit / Completed Feedback */}
      {!isCompleted ? (
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-[#3f5726] hover:bg-[#2b3a1a] text-white font-bold text-xs md:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{loading ? 'Menyimpan Lembar Kerja...' : 'Simpan & Selesaikan Lembar Kerja'}</span>
        </button>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-900 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <p className="font-bold text-xs md:text-sm">Lembar Kerja Tersimpan & Selesai!</p>
              <p className="text-[11px] text-green-700">
                Poin progres telah diperbarui. Anda siap melanjutkan ke sesi berikutnya.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSavedSuccess(false)}
            className="px-4 py-2 bg-white hover:bg-green-100 text-green-800 text-xs font-bold rounded-xl border border-green-300 transition-colors cursor-pointer shrink-0"
          >
            Edit / Tambah Catatan
          </button>
        </div>
      )}
    </form>
  )
}

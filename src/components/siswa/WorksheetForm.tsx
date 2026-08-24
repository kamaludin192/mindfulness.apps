'use client'

import { useState } from 'react'
import { submitWorksheet } from '@/app/siswa/worksheet/actions'
import Link from 'next/link'
import {
  CheckCircle2,
  Save,
  Plus,
  Trash2,
  Heart,
  Sparkles,
  Smile,
  ArrowRight,
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

export interface GratitudeItem {
  id: string
  text: string
}

export interface WorksheetPayload {
  sessionNumber?: number
  breathingRows?: BreathingRow[]
  experienceRows?: ExperienceRow[]
  thoughtRows?: ThoughtRow[]
  gratitudeItems?: GratitudeItem[]
  selfLoveLetter?: string
  summaryNote?: string
  submittedAt?: string
}

import type { ExerciseProgressStatus } from '@/types/exercise'

interface WorksheetFormProps {
  sessionId: string
  sessionNumber: number
  initialData?: WorksheetPayload | null
  status: ExerciseProgressStatus | null
}

// Default templates for worksheets
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

const DEFAULT_GRATITUDE_ITEMS: GratitudeItem[] = [
  { id: '1', text: '' },
  { id: '2', text: '' },
  { id: '3', text: '' },
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

  // Sesi 4 State (Gratitude Journal & Self-Love Letter)
  const [gratitudeItems, setGratitudeItems] = useState<GratitudeItem[]>(
    initialData?.gratitudeItems || DEFAULT_GRATITUDE_ITEMS
  )
  const [selfLoveLetter, setSelfLoveLetter] = useState<string>(
    initialData?.selfLoveLetter || ''
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
        gratitudeItems: sessionNumber === 4 ? gratitudeItems : undefined,
        selfLoveLetter: sessionNumber === 4 ? selfLoveLetter : undefined,
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
          {sessionNumber === 1 && 'WORKSHEET MINDFUL BREATHING'}
          {sessionNumber === 2 && 'WORKSHEET EXPERIENCE CALENDAR'}
          {sessionNumber === 3 && 'WORKSHEET DAILY THOUGHT RECORD'}
          {sessionNumber === 4 && 'WORKSHEET GRATITUDE & LETTER FOR MYSELF'}
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
            &ldquo;Merayakan perjalanan kesadaran diri dengan menumbuhkan rasa syukur dan memeluk diri sendiri melalui surat kasih sayang yang tulus.&rdquo;
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
      {/* 4. SESI 4: GRATITUDE (JURNAL SYUKUR) & SURAT CINTA DIRI */}
      {/* ========================================================= */}
      {sessionNumber === 4 && (
        <div className="space-y-6">
          {/* Bagian 1: Gratitude (Menulis apa yang disyukuri) */}
          <div className="bg-[#fefce8] p-5 sm:p-6 rounded-3xl border border-[#fef08a] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-[#fef08a] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-amber-800 flex items-center justify-center">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold font-serif text-[#1e2a14]">
                    1. Gratitude
                  </h4>
                  <p className="text-xs text-[#2b3a1a]/70">
                    Tuliskan hal-hal yang kamu syukuri hari ini (hal kecil, orang berharga, atau kebaikan diri).
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 hidden sm:inline-block">
                Refleksi Syukur
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {gratitudeItems.map((item, idx) => (
                <div key={item.id || idx} className="flex items-start gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-900 shrink-0 mt-1">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <input
                      type="text"
                      disabled={isCompleted}
                      value={item.text}
                      onChange={(e) => {
                        const updated = [...gratitudeItems]
                        updated[idx].text = e.target.value
                        setGratitudeItems(updated)
                      }}
                      placeholder={
                        idx === 0
                          ? 'Hari ini saya sangat bersyukur atas...'
                          : idx === 1
                          ? 'Satu hal menyenangkan yang membuat saya tersenyum adalah...'
                          : 'Saya berterima kasih kepada diri saya karena sudah berusaha...'
                      }
                      className="w-full p-3 bg-white border border-amber-200 rounded-2xl text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white disabled:bg-white/60"
                    />
                  </div>
                  {!isCompleted && gratitudeItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setGratitudeItems(gratitudeItems.filter((_, i) => i !== idx))
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {!isCompleted && (
              <button
                type="button"
                onClick={() => {
                  setGratitudeItems([
                    ...gratitudeItems,
                    { id: String(Date.now()), text: '' },
                  ])
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-300 transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Hal yang Disyukuri</span>
              </button>
            )}
          </div>

          {/* Bagian 2: Surat Cinta untuk Diri Sendiri (Self-Love Letter) */}
          <div className="bg-[#fffdfa] p-5 sm:p-6 rounded-3xl border border-[#f3cbb5] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-[#f3cbb5]/70 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-rose-100" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold font-serif text-[#1e2a14]">
                    2. Letter For MySelf
                  </h4>
                  <p className="text-xs text-[#2b3a1a]/70">
                    Tuliskan surat apresiasi, maaf, dan penerimaan tulus untuk dirimu yang telah berjuang sejauh ini.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hidden sm:inline-block">
                Self-Compassion Letter
              </span>
            </div>

            {/* Inspirasi Kata Kunci */}
            <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-100 text-[11px] text-rose-900 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                Inspirasi Kalimat yang Dapat Kamu Tuliskan:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-rose-800/90 pl-1">
                <li>&ldquo;Teruntuk diriku yang telah berjuang dan bertahan melewati hari-hari sulit...&rdquo;</li>
                <li>&ldquo;Aku memaafkan diriku atas kesalahan dan rasa lelah di masa lalu...&rdquo;</li>
                <li>&ldquo;Mulai hari ini, aku berjanji untuk lebih menyayangi dan bersikap lembut pada diriku sendiri...&rdquo;</li>
              </ul>
            </div>

            {/* Editor Surat Cinta */}
            <div className="relative">
              <textarea
                rows={7}
                disabled={isCompleted}
                value={selfLoveLetter}
                onChange={(e) => setSelfLoveLetter(e.target.value)}
                placeholder="Tuliskan surat cinta dan pelukan hangat untuk dirimu di sini..."
                className="w-full p-4 bg-white border border-[#f3cbb5] rounded-2xl text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none focus:ring-2 focus:ring-rose-400 resize-y leading-relaxed font-sans shadow-2xs disabled:bg-white/60"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Summary Note (Hanya untuk Sesi 1-3 jika dibutuhkan) */}
      {sessionNumber !== 4 && (
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
            placeholder="wawasan atau hal apa yang kamu rasakan"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs md:text-sm text-[#1e2a14] placeholder-[#2b3a1a]/40 outline-none focus:ring-2 focus:ring-[#3f5726] disabled:border-none disabled:bg-transparent"
          />
        </div>
      )}

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
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-xs md:text-sm">Lembar Kerja Tersimpan & Selesai!</p>
                <p className="text-[11px] text-green-700">
                  Poin progres dan refleksi welas asih Anda telah tersimpan dengan aman di jurnal pribadi.
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

          {sessionNumber === 4 && (
            <div className="p-5 bg-gradient-to-br from-[#1e2f11] via-[#283e16] to-[#15230c] text-white rounded-2xl border-2 border-[#a3e635]/50 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 text-[11px] font-extrabold text-[#bef264] border border-[#a3e635]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>Modul 4 Sesi Selesai!</span>
                </div>
                <p className="font-serif font-extrabold text-sm sm:text-base">
                  Isi Evaluasi Layanan & Pilihan Konseling Lanjutan 🌿
                </p>
                <p className="text-xs text-white/80">
                  Beri penilaian apakah sesi ini Membantu serta tentukan langkah mandiri atau lanjut konseling bersama Guru BK.
                </p>
              </div>

              <Link
                href="/siswa"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-[#0f172a] text-xs font-extrabold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span>Buka Form Evaluasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </form>
  )
}

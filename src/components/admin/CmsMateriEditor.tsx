'use client'

import { useState } from 'react'
import {
  Video,
  Save,
  CheckCircle2,
  AlertCircle,
  Play,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { updateCmsSession } from '@/app/admin/actions'

export type CmsSessionItem = {
  session_number: number
  title: string
  video_url: string
  description?: string
}

const DEFAULT_SESSIONS: CmsSessionItem[] = [
  {
    session_number: 1,
    title: 'Sesi 1: Mindful Breathing',
    video_url: '',
    description: 'Materi dasar untuk melatih fokus pernapasan, relaksasi otot, dan penenangan sistem saraf.',
  },
  {
    session_number: 2,
    title: 'Sesi 2: Mindful Sitting and Mindful Listening',
    video_url: '',
    description: 'Melatih kesadaran saat duduk tenang dan mendengarkan dengan penuh perhatian tanpa menghakimi.',
  },
  {
    session_number: 3,
    title: 'Sesi 3: Body Scanning',
    video_url: '',
    description: 'Mempelajari pemindaian sensasi tubuh secara menyeluruh untuk meredakan ketegangan fisik dan kecemasan.',
  },
  {
    session_number: 4,
    title: 'Sesi 4: Gratitude and Loving in Kindness',
    video_url: '',
    description: 'Menumbuhkan rasa syukur serta memupuk cinta kasih dan kebaikan hati terhadap diri sendiri dan orang lain.',
  },
]

export default function CmsMateriEditor({
  initialSessions,
}: {
  initialSessions?: { session_number: number; title: string; video_url: string | null }[] | null
}) {
  const [sessions, setSessions] = useState<CmsSessionItem[]>(() => {
    return DEFAULT_SESSIONS.map((def) => {
      const found = initialSessions?.find((s) => s.session_number === def.session_number)
      if (found) {
        return {
          ...def,
          title: found.title || def.title,
          video_url: found.video_url || def.video_url,
        }
      }
      return def
    })
  })

  const [activeSessionNum, setActiveSessionNum] = useState<number>(1)
  const [savingNum, setSavingNum] = useState<number | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const currentSession = sessions.find((s) => s.session_number === activeSessionNum) || sessions[0]

  const handleChange = (field: 'title' | 'video_url' | 'description', value: string) => {
    setSessions(
      sessions.map((s) =>
        s.session_number === activeSessionNum ? { ...s, [field]: value } : s
      )
    )
  }

  const handleSaveSession = async () => {
    setSavingNum(activeSessionNum)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      await updateCmsSession(currentSession.session_number, {
        title: currentSession.title,
        videoUrl: currentSession.video_url,
        description: currentSession.description,
      })
      setSuccessMsg(`Materi Sesi ${currentSession.session_number} berhasil diperbarui & disimpan ke database!`)
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err) {
      console.error(err)
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menyimpan materi.')
    } finally {
      setSavingNum(null)
    }
  }

  // Helper to extract YouTube embed URL if valid
  const getEmbedUrl = (url: string) => {
    if (!url) return null
    if (url.includes('youtube.com/embed/')) return url
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    return url
  }

  const embedUrl = getEmbedUrl(currentSession.video_url)

  return (
    <div className="space-y-6">
      {/* Session Tab Switcher */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sessions.map((s) => {
          const isSelected = s.session_number === activeSessionNum
          return (
            <button
              key={s.session_number}
              type="button"
              onClick={() => setActiveSessionNum(s.session_number)}
              className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'border-amber-500 bg-white shadow-md'
                  : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {s.session_number}
                </span>
                {isSelected && <Sparkles className="w-4 h-4 text-amber-500" />}
              </div>
              <p className="font-extrabold text-xs sm:text-sm text-[#0f172a] line-clamp-2">
                {s.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                EDIT MATERI SESI {currentSession.session_number}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold font-serif text-[#0f172a]">
                Pengaturan Judul & Video Panduan
              </h2>
            </div>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 text-[#065f46] rounded-2xl text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#057a44] shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 border-2 border-red-300 text-red-800 rounded-2xl text-xs font-extrabold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a] block">
                JUDUL SESI PEMBELAJARAN
              </label>
              <input
                type="text"
                value={currentSession.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Contoh: Sesi 1: Menyadari Napas & Tubuh"
                className="w-full p-3.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-[#0f172a] outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a] block">
                URL VIDEO PANDUAN (YOUTUBE / DIRECT VIDEO)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentSession.video_url}
                  onChange={(e) => handleChange('video_url', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-3.5 pl-10 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#0f172a] outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                <Video className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-slate-500">
                Mendukung link YouTube standar (watch?v=...), tautan pendek (youtu.be/...), atau embed URL.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a] block">
                DESKRIPSI & TUJUAN SESI
              </label>
              <textarea
                rows={3}
                value={currentSession.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Deskripsi singkat yang akan dipelajari siswa..."
                className="w-full p-3.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white resize-y"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveSession}
            disabled={savingNum === currentSession.session_number}
            className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            {savingNum === currentSession.session_number ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4 text-amber-400" />
            )}
            <span>
              {savingNum === currentSession.session_number
                ? 'Menyimpan ke Database...'
                : `Simpan Perubahan Sesi ${currentSession.session_number}`}
            </span>
          </button>
        </div>

        {/* Right Column: Live Video & Preview Card */}
        <div className="lg:col-span-5 space-y-4 sticky top-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                <Play className="w-4 h-4 text-[#057a44]" />
                Pratinjau Video Siswa
              </span>
              {embedUrl && (
                <a
                  href={currentSession.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>Buka Video Asli</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Video Player Box */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={currentSession.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-6 space-y-2 text-slate-400">
                  <Video className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs font-bold">Belum Ada URL Video</p>
                  <p className="text-[11px]">Masukkan link YouTube di sebelah kiri.</p>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200 space-y-1">
              <p className="font-extrabold text-xs text-[#0f172a]">{currentSession.title}</p>
              <p className="text-[11px] text-[#475569] line-clamp-2">
                {currentSession.description || 'Tidak ada deskripsi tambahan.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

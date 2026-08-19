'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

type MoodType = 'tenang' | 'senang' | 'cemas' | 'lelah' | 'sedih' | null

interface MoodOption {
  id: MoodType
  label: string
  emoji: string
  color: string
  message: string
  recommendation: {
    title: string
    link: string
  }
}

const MOODS: MoodOption[] = [
  {
    id: 'tenang',
    label: 'Tenang',
    emoji: '🌿',
    color: 'border-[#3f5726] bg-[#3f5726]/10 text-[#3f5726]',
    message: 'Luar biasa! Pertahankan rasa tenang dan damai ini dalam setiap tarikan napasmu hari ini.',
    recommendation: {
      title: 'Lanjutkan Latihan Sesi',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'senang',
    label: 'Senang',
    emoji: '😊',
    color: 'border-amber-400 bg-amber-50 text-amber-800',
    message: 'Senang mendengarnya! Rayakan perasaan bahagia ini dan bagikan senyuman kepada sesama.',
    recommendation: {
      title: 'Tuliskan Refleksi Syukur',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'cemas',
    label: 'Cemas',
    emoji: '🌪️',
    color: 'border-orange-400 bg-orange-50 text-orange-800',
    message: 'Wajar merasa cemas. Tarik napas 4 detik, tahan 4 detik, dan hembuskan 4 detik perlahan.',
    recommendation: {
      title: 'Latihan Napas Menenangkan (Sesi 1)',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'lelah',
    label: 'Lelah',
    emoji: '⚡',
    color: 'border-purple-400 bg-purple-50 text-purple-800',
    message: 'Tubuh dan pikiranmu sedang butuh jeda. Beri dirimu istirahat sejenak tanpa rasa bersalah.',
    recommendation: {
      title: 'Relaksasi Mindful Body Scan',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'sedih',
    label: 'Sedih',
    emoji: '🌧️',
    color: 'border-blue-400 bg-blue-50 text-blue-800',
    message: 'Perasaanmu sepenuhnya valid. Ingatlah bahwa kamu tidak sendirian, Guru BK siap mendengarkan.',
    recommendation: {
      title: 'Ceritakan ke Guru BK (Chat)',
      link: '/siswa/chat',
    },
  },
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType>(null)

  const activeMoodData = MOODS.find((m) => m.id === selectedMood)

  return (
    <section className="bg-white rounded-3xl p-6 md:p-7 border border-[#d5dcc4] shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm md:text-base font-bold font-serif text-[#1e2a14] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3f5726]" />
          Check-in Emosi Hari Ini
        </h2>
        <span className="text-[11px] text-[#2b3a1a]/60">Pilih perasaanmu saat ini</span>
      </div>

      {/* Mood Selector Buttons */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood.id)}
              className={`p-2.5 sm:p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? `${mood.color} ring-2 ring-[#3f5726] shadow-sm -translate-y-0.5 font-bold`
                  : 'border-[#d5dcc4] bg-[#f3f6e8]/40 hover:bg-[#f3f6e8] text-[#2b3a1a]/80'
              }`}
            >
              <span className="text-xl sm:text-2xl">{mood.emoji}</span>
              <span className="text-[10px] sm:text-xs font-semibold">{mood.label}</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Feedback Card */}
      {activeMoodData && (
        <div className="p-4 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
          <p className="text-xs md:text-sm text-[#1e2a14] leading-relaxed">
            {activeMoodData.message}
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-[#d5dcc4]/60">
            <span className="text-[11px] text-[#2b3a1a]/70 font-medium">
              Rekomendasi Mindfulness:
            </span>
            <Link
              href={activeMoodData.recommendation.link}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#3f5726] hover:text-[#2b3a1a] transition-colors"
            >
              <span>{activeMoodData.recommendation.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

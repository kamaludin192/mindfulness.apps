'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

type MoodScore = 'sangat_buruk' | 'kurang_baik' | 'biasa_saja' | 'cukup_baik' | 'sangat_senang' | null

interface MoodItem {
  id: MoodScore
  label: string
  icon: React.ComponentType<{ className?: string }>
  message: string
  recommendation: {
    title: string
    link: string
  }
}

function SangatBurukIcon({ className = 'w-10 h-10 md:w-12 md:h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Yellow Face */}
      <circle cx="32" cy="32" r="27" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Eyebrows */}
      <path d="M19 19L27 23" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <path d="M45 19L37 23" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="23" cy="28" rx="2.5" ry="3.5" fill="#1A1A1A" />
      <ellipse cx="41" cy="28" rx="2.5" ry="3.5" fill="#1A1A1A" />
      {/* Sad downturned mouth */}
      <path d="M23 43C27 38 37 38 41 43" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
      {/* Blue Teardrop */}
      <path
        d="M20 33C20 33 17 37 17 40C17 42.2 18.8 44 21 44C23.2 44 25 42.2 25 40C25 37 22 33 22 33"
        fill="#00B4D8"
      />
    </svg>
  )
}

function KurangBaikIcon({ className = 'w-10 h-10 md:w-12 md:h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Yellow Face */}
      <circle cx="32" cy="32" r="27" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Eyes */}
      <ellipse cx="23" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      <ellipse cx="41" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      {/* Sad downturned mouth */}
      <path d="M23 43C27 37 37 37 41 43" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function BiasaSajaIcon({ className = 'w-10 h-10 md:w-12 md:h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Yellow Face */}
      <circle cx="32" cy="32" r="27" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Eyes */}
      <ellipse cx="23" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      <ellipse cx="41" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      {/* Straight neutral mouth */}
      <path d="M23 41H41" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function CukupBaikIcon({ className = 'w-10 h-10 md:w-12 md:h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Yellow Face */}
      <circle cx="32" cy="32" r="27" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Eyes */}
      <ellipse cx="23" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      <ellipse cx="41" cy="26" rx="2.5" ry="3.5" fill="#1A1A1A" />
      {/* Gentle smiling mouth */}
      <path d="M23 39C27 45 37 45 41 39" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function SangatSenangIcon({ className = 'w-10 h-10 md:w-12 md:h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Yellow Face */}
      <circle cx="32" cy="32" r="27" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
      {/* Happy closed eyes */}
      <path d="M19 28C21 24 25 24 27 28" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M37 28C39 24 43 24 45 28" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
      {/* Blushing cheeks */}
      <ellipse cx="18" cy="35" rx="4.5" ry="3.5" fill="#FF7043" opacity="0.85" />
      <ellipse cx="46" cy="35" rx="4.5" ry="3.5" fill="#FF7043" opacity="0.85" />
      {/* Wide happy smiling mouth */}
      <path d="M22 39C26 46 38 46 42 39" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

const MOODS: MoodItem[] = [
  {
    id: 'sangat_buruk',
    label: 'Sangat Buruk',
    icon: SangatBurukIcon,
    message: 'Hari ini terasa sangat berat, dan perasaanmu sepenuhnya valid. Luangkan waktu sejenak untuk beristirahat, atau ceritakan pada Guru BK.',
    recommendation: {
      title: 'Ceritakan ke Guru BK (Chat)',
      link: '/siswa/chat',
    },
  },
  {
    id: 'kurang_baik',
    label: 'Kurang Baik',
    icon: KurangBaikIcon,
    message: 'Tarik napas perlahan. Latihan pernapasan sadar dapat membantu meredakan ketegangan dalam pikiranmu.',
    recommendation: {
      title: 'Latihan Napas Menenangkan (Sesi 1)',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'biasa_saja',
    label: 'Biasa Saja',
    icon: BiasaSajaIcon,
    message: 'Kondisi netral adalah waktu yang tepat untuk memperkuat kesadaran hadir utuh di saat ini.',
    recommendation: {
      title: 'Relaksasi Mindful Body Scan',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'cukup_baik',
    label: 'Cukup Baik',
    icon: CukupBaikIcon,
    message: 'Bagus sekali! Pertahankan rasa tenang dan fokus positif ini sepanjang aktivitas belajarmu.',
    recommendation: {
      title: 'Lanjutkan Latihan Modul',
      link: '/siswa/worksheet',
    },
  },
  {
    id: 'sangat_senang',
    label: 'Sangat Senang',
    icon: SangatSenangIcon,
    message: 'Luar biasa! Rayakan rasa bahagia ini dan bagikan senyuman hangat kepada teman-teman di sekitarmu.',
    recommendation: {
      title: 'Tuliskan Refleksi Syukur',
      link: '/siswa/worksheet',
    },
  },
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodScore>('cukup_baik')

  const activeMoodData = MOODS.find((m) => m.id === selectedMood)

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#d5dcc4] shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-extrabold font-serif text-[#0f172a] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#057a44]" />
          Check-in Emosi Hari Ini
        </h2>
        <span className="text-xs font-semibold text-[#475569]">Pilih perasaanmu saat ini</span>
      </div>

      {/* Mood Selector Buttons matching reference image */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5">
        {MOODS.map((mood) => {
          const Icon = mood.icon
          const isSelected = selectedMood === mood.id

          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood.id)}
              className={`py-4 px-2 sm:py-5 sm:px-3 rounded-2xl flex flex-col items-center justify-center gap-2.5 sm:gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[3px] border-[#057a44] bg-emerald-50/50 shadow-xs -translate-y-0.5'
                  : 'border-2 border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#f1f5f9] hover:border-[#cbd5e1]'
              }`}
            >
              <div className="transition-transform duration-200 hover:scale-110">
                <Icon />
              </div>
              <span className={`text-[11px] sm:text-xs text-center leading-tight transition-colors ${
                isSelected ? 'font-extrabold text-[#065f46]' : 'font-bold text-[#1e293b]'
              }`}>
                {mood.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Feedback Card */}
      {activeMoodData && (
        <div className="p-4.5 rounded-2xl bg-[#f0fdf4] border-2 border-[#bbf7d0] animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
          <p className="text-xs sm:text-sm font-medium text-[#0f172a] leading-relaxed">
            {activeMoodData.message}
          </p>
          <div className="flex items-center justify-between pt-2.5 border-t border-[#bbf7d0]">
            <span className="text-xs font-bold text-[#065f46]">
              Rekomendasi Langkah:
            </span>
            <Link
              href={activeMoodData.recommendation.link}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#057a44] hover:text-[#065f46] hover:underline transition-colors"
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

'use client'

import { useState, useMemo } from 'react'
import {
  Smile,
  Search,
  Calendar,
  MessageSquareQuote,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  User,
  ArrowUpDown,
  LayoutGrid,
  List,
  Eye,
  X,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'

export type AssessmentItem = {
  id: string
  mood_score: number
  notes: string | null
  created_at: string
  student?: {
    id?: string
    full_name?: string | null
    email?: string | null
  } | null
}

const MOOD_META: Record<
  number,
  { label: string; emoji: string; badgeBg: string; textCol: string; borderCol: string }
> = {
  1: {
    label: 'Sangat Buruk',
    emoji: '😭',
    badgeBg: 'bg-red-50',
    textCol: 'text-red-700',
    borderCol: 'border-red-200',
  },
  2: {
    label: 'Buruk',
    emoji: '😟',
    badgeBg: 'bg-orange-50',
    textCol: 'text-orange-700',
    borderCol: 'border-orange-200',
  },
  3: {
    label: 'Netral',
    emoji: '😐',
    badgeBg: 'bg-amber-50',
    textCol: 'text-amber-800',
    borderCol: 'border-amber-200',
  },
  4: {
    label: 'Baik',
    emoji: '😊',
    badgeBg: 'bg-emerald-50',
    textCol: 'text-[#065f46]',
    borderCol: 'border-emerald-200',
  },
  5: {
    label: 'Sangat Senang',
    emoji: '😄',
    badgeBg: 'bg-green-50',
    textCol: 'text-green-800',
    borderCol: 'border-green-300',
  },
}

export default function EmotionMonitoringView({
  assessments,
  role = 'guru',
}: {
  assessments: AssessmentItem[]
  role?: 'guru' | 'admin'
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMood, setSelectedMood] = useState<number | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'daily' | 'evaluation'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'mood_asc' | 'mood_desc'>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [activeModalItem, setActiveModalItem] = useState<AssessmentItem | null>(null)

  // 1. KPI Statistics Calculations
  const stats = useMemo(() => {
    const total = assessments.length
    if (total === 0) {
      return { total: 0, avgMood: 0, needAttention: 0, positiveCount: 0, evalCount: 0 }
    }

    const sumMood = assessments.reduce((acc, curr) => acc + (curr.mood_score || 3), 0)
    const avgMood = (sumMood / total).toFixed(1)
    const needAttention = assessments.filter((a) => a.mood_score <= 2).length
    const positiveCount = assessments.filter((a) => a.mood_score >= 4).length
    const evalCount = assessments.filter((a) => a.notes?.includes('[Evaluasi Pasca 4 Sesi]')).length

    return {
      total,
      avgMood,
      needAttention,
      positiveCount,
      evalCount,
    }
  }, [assessments])

  // 2. Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return assessments
      .filter((item) => {
        // Name / email / note search
        const studentName = item.student?.full_name || 'Siswa'
        const noteText = item.notes || ''
        const searchMatches =
          studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          noteText.toLowerCase().includes(searchTerm.toLowerCase())

        if (!searchMatches) return false

        // Mood Filter
        if (selectedMood !== 'all' && item.mood_score !== selectedMood) {
          return false
        }

        // Type Filter
        const isEval = item.notes?.includes('[Evaluasi Pasca 4 Sesi]')
        if (typeFilter === 'daily' && isEval) return false
        if (typeFilter === 'evaluation' && !isEval) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        }
        if (sortBy === 'mood_asc') {
          return (a.mood_score || 3) - (b.mood_score || 3)
        }
        if (sortBy === 'mood_desc') {
          return (b.mood_score || 3) - (a.mood_score || 3)
        }
        return 0
      })
  }, [assessments, searchTerm, selectedMood, typeFilter, sortBy])

  const isGuru = role === 'guru'

  return (
    <div className="space-y-6">
      {/* 1. KPI Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Check-in */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Total Log Check-in</span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                isGuru ? 'bg-emerald-50 text-[#057a44]' : 'bg-amber-50 text-amber-800'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            {stats.total}
          </p>
          <p className="text-[11px] text-[#475569] font-medium">Semua data refleksi siswa</p>
        </div>

        {/* Card 2: Rata-rata Mood */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Rata-rata Skor Emosi</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
              {stats.avgMood}
            </p>
            <span className="text-xs text-[#64748b] font-bold">/ 5.0</span>
          </div>
          <p className="text-[11px] text-blue-700 font-bold">
            {Number(stats.avgMood) >= 3.5 ? '😊 Indeks Relatif Positif' : '😐 Indeks Butuh Perhatian'}
          </p>
        </div>

        {/* Card 3: Butuh Pendampingan */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Emosi Rendah (Mood 1-2)</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-red-600">
            {stats.needAttention}
          </p>
          <p className="text-[11px] text-red-600 font-bold">Prioritas pendampingan BK</p>
        </div>

        {/* Card 4: Evaluasi Pasca Sesi */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#475569]">Evaluasi Pasca Sesi</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-serif text-[#0f172a]">
            {stats.evalCount}
          </p>
          <p className="text-[11px] text-purple-700 font-bold">Survei kelulusan 4 sesi</p>
        </div>
      </div>

      {/* 2. Control Toolbar (Search, Filter, View Switcher) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan nama siswa atau isi catatan refleksi..."
              className={`w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#0f172a] outline-none transition-all ${
                isGuru ? 'focus:ring-2 focus:ring-[#057a44] focus:bg-white' : 'focus:ring-2 focus:ring-amber-500 focus:bg-white'
              }`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & View Mode Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#f8fafc] p-1 border border-slate-200 rounded-2xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 ml-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                aria-label="Urutkan log refleksi"
                className="bg-transparent text-[#0f172a] font-bold outline-none py-1.5 pr-2 cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="mood_asc">Mood Terendah (Prioritas)</option>
                <option value="mood_desc">Mood Tertinggi</option>
              </select>
            </div>

            <div className="flex items-center bg-[#f8fafc] p-1 border border-slate-200 rounded-2xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? isGuru
                      ? 'bg-[#057a44] text-white shadow-xs'
                      : 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tampilan Kartu"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'table'
                    ? isGuru
                      ? 'bg-[#057a44] text-white shadow-xs'
                      : 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tampilan Tabel"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips: Mood Score & Type */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Mood Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#475569] mr-1">Skor Emosi:</span>
            <button
              type="button"
              onClick={() => setSelectedMood('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMood === 'all'
                  ? isGuru
                    ? 'bg-[#057a44] text-white'
                    : 'bg-amber-500 text-slate-950'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua ({assessments.length})
            </button>
            {[1, 2, 3, 4, 5].map((score) => {
              const meta = MOOD_META[score]
              const count = assessments.filter((a) => a.mood_score === score).length
              const isSelected = selectedMood === score
              return (
                <button
                  key={score}
                  type="button"
                  onClick={() => setSelectedMood(score)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? `${meta.badgeBg} ${meta.textCol} ${meta.borderCol} ring-2 ring-offset-1 ${
                          score <= 2 ? 'ring-red-400' : 'ring-emerald-400'
                        }`
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              )
            })}
          </div>

          {/* Type Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1 rounded-xl transition-all ${
                typeFilter === 'all' ? 'bg-white text-[#0f172a] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('daily')}
              className={`px-3 py-1 rounded-xl transition-all ${
                typeFilter === 'daily' ? 'bg-white text-[#0f172a] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Harian
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('evaluation')}
              className={`px-3 py-1 rounded-xl transition-all ${
                typeFilter === 'evaluation' ? 'bg-white text-[#0f172a] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pasca Program
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content: Grid or Table View */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 shadow-xs space-y-3">
          <Smile className="w-12 h-12 mx-auto text-slate-300 animate-pulse" />
          <h3 className="font-extrabold text-base text-[#0f172a]">Tidak Ada Log Refleksi Ditemukan</h3>
          <p className="text-xs text-[#475569] max-w-md mx-auto">
            {searchTerm || selectedMood !== 'all' || typeFilter !== 'all'
              ? 'Tidak ada data yang cocok dengan kriteria pencarian atau filter Anda.'
              : 'Belum ada siswa yang melakukan check-in emosi atau mengisi catatan refleksi.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const studentName = item.student?.full_name || 'Siswa'
            const meta = MOOD_META[item.mood_score] || MOOD_META[3]
            const isEvaluation = item.notes?.includes('[Evaluasi Pasca 4 Sesi]')

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                {/* Header: Student & Mood Badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isGuru ? 'bg-[#057a44]/10 text-[#057a44]' : 'bg-slate-900 text-amber-400'
                        }`}
                      >
                        {studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-xs sm:text-sm text-[#0f172a] line-clamp-1">
                          {studentName}
                        </p>
                        <p className="text-[11px] text-[#475569] font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#64748b]" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })} • {new Date(item.created_at).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} WIB
                          </span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold border shrink-0 ${meta.badgeBg} ${meta.textCol} ${meta.borderCol}`}
                    >
                      <span>{meta.emoji}</span>
                      <span>{meta.label}</span>
                    </span>
                  </div>

                  {/* Reflection Notes Card */}
                  <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#475569]">
                      <span className="flex items-center gap-1">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-[#057a44]" />
                        <span>{isEvaluation ? 'Evaluasi Pasca Program' : 'Catatan Refleksi Emosi'}</span>
                      </span>
                      {isEvaluation && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold">
                          Pasca Sesi
                        </span>
                      )}
                    </div>

                    <p className="text-[#1e2a14] line-clamp-4 font-medium italic">
                      &ldquo;
                      {item.notes
                        ? item.notes.replace(/\[Evaluasi Pasca 4 Sesi\]/g, '').trim()
                        : 'Tidak ada catatan refleksi tambahan.'}
                      &rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#057a44] hover:underline cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Rincian</span>
                  </button>

                  {isGuru ? (
                    <Link
                      href="/guru/counseling"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f3f6e8] hover:bg-[#c2db8f]/40 text-[#2b3a1a] text-xs font-bold rounded-xl border border-[#d5dcc4] transition-all"
                    >
                      <MessageCircle className="w-3 h-3 text-[#057a44]" />
                      <span>Jadwal Konseling</span>
                    </Link>
                  ) : (
                    <Link
                      href="/admin/users"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all"
                    >
                      <User className="w-3 h-3" />
                      <span>Profil Siswa</span>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Siswa</th>
                  <th className="px-6 py-4">Waktu Check-in</th>
                  <th className="px-6 py-4 text-center">Skor & Status Emosi</th>
                  <th className="px-6 py-4">Catatan Refleksi</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredItems.map((item) => {
                  const studentName = item.student?.full_name || 'Siswa'
                  const meta = MOOD_META[item.mood_score] || MOOD_META[3]
                  const isEvaluation = item.notes?.includes('[Evaluasi Pasca 4 Sesi]')

                  return (
                    <tr key={item.id} className="hover:bg-[#f8fafc]/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isGuru ? 'bg-[#057a44]/10 text-[#057a44]' : 'bg-slate-900 text-amber-400'
                            }`}
                          >
                            {studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-[#0f172a]">{studentName}</p>
                            <p className="text-[11px] text-[#475569]">{item.student?.email || '-'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-[#334155] font-medium">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        •{' '}
                        <span className="font-bold">
                          {new Date(item.created_at).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          WIB
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${meta.badgeBg} ${meta.textCol} ${meta.borderCol}`}
                        >
                          <span>{meta.emoji}</span>
                          <span>{meta.label}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 max-w-md">
                        <div className="space-y-1">
                          {isEvaluation && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold inline-block">
                              Evaluasi Pasca Sesi
                            </span>
                          )}
                          <p className="text-xs text-[#1e2a14] line-clamp-2 font-medium">
                            {item.notes
                              ? item.notes.replace(/\[Evaluasi Pasca 4 Sesi\]/g, '').trim()
                              : 'Tidak ada catatan refleksi.'}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveModalItem(item)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172a] font-bold text-xs transition-all cursor-pointer"
                        >
                          Rincian
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. DETAIL MODAL POPUP */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border-2 border-slate-300 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isGuru ? 'bg-[#057a44] text-white' : 'bg-slate-900 text-amber-400'
                  }`}
                >
                  {(activeModalItem.student?.full_name || 'S').charAt(0)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold font-serif text-[#0f172a]">
                    {activeModalItem.student?.full_name || 'Siswa'}
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    {new Date(activeModalItem.created_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    •{' '}
                    {new Date(activeModalItem.created_at).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    WIB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Tutup modal"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mood Summary in Modal */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs font-bold text-[#475569]">Suasana Hati Siswa:</span>
              {(() => {
                const meta = MOOD_META[activeModalItem.mood_score] || MOOD_META[3]
                return (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${meta.badgeBg} ${meta.textCol} ${meta.borderCol}`}
                  >
                    <span className="text-base">{meta.emoji}</span>
                    <span>
                      {meta.label} (Skor {activeModalItem.mood_score}/5)
                    </span>
                  </span>
                )
              })()}
            </div>

            {/* Note Content in Modal */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquareQuote className="w-4 h-4 text-[#057a44]" />
                <span>Isi Catatan Refleksi Lengkap:</span>
              </label>

              <div className="p-4.5 bg-[#f8fafc] rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#0f172a] leading-relaxed whitespace-pre-wrap font-medium">
                {activeModalItem.notes || 'Tidak ada catatan refleksi yang dituliskan oleh siswa.'}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Tutup
              </button>

              {isGuru ? (
                <Link
                  href="/guru/counseling"
                  className="px-5 py-2.5 rounded-xl bg-[#057a44] hover:bg-[#046238] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Buka Jadwal & Konseling</span>
                </Link>
              ) : (
                <Link
                  href="/admin/users"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Kelola Akun Siswa</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

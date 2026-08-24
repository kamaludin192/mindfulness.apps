'use client'

import { useState } from 'react'
import {
  Globe,
  BookOpen,
  Info,
  GraduationCap,
  Users,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
  Layers,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import {
  DEFAULT_LAYOUT_CONFIG,
  type AppLayoutConfig,
  type LandingPageConfig,
  type ProgramPageConfig,
  type TentangKamiPageConfig,
  type StudentPortalConfig,
  type TeacherPortalConfig,
} from '@/lib/layout-cms-config'
import { saveLayoutConfigAction, resetLayoutConfigAction } from '@/app/admin/tampilan/actions'

export default function LayoutCmsEditor({
  initialConfig,
}: {
  initialConfig: AppLayoutConfig
}) {
  const [config, setConfig] = useState<AppLayoutConfig>(initialConfig || DEFAULT_LAYOUT_CONFIG)
  const [activeTab, setActiveTab] = useState<'landing' | 'program' | 'tentang' | 'siswa' | 'guru'>('landing')
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleLandingChange = (field: keyof LandingPageConfig, val: string) => {
    setConfig((prev) => ({
      ...prev,
      landingPage: {
        ...prev.landingPage,
        [field]: val,
      },
    }))
  }

  const handleProgramChange = (field: keyof ProgramPageConfig, val: string) => {
    setConfig((prev) => ({
      ...prev,
      programPage: {
        ...prev.programPage,
        [field]: val,
      },
    }))
  }

  const handleTentangChange = (field: keyof TentangKamiPageConfig, val: string) => {
    setConfig((prev) => ({
      ...prev,
      tentangKamiPage: {
        ...prev.tentangKamiPage,
        [field]: val,
      },
    }))
  }

  const handleStudentChange = (
    field: keyof StudentPortalConfig,
    val: string | boolean
  ) => {
    setConfig((prev) => ({
      ...prev,
      studentPortal: {
        ...prev.studentPortal,
        [field]: val,
      },
    }))
  }

  const handleTeacherChange = (
    field: keyof TeacherPortalConfig,
    val: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      teacherPortal: {
        ...prev.teacherPortal,
        [field]: val,
      },
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setStatusMessage(null)
    try {
      await saveLayoutConfigAction(config)
      setStatusMessage({
        type: 'success',
        text: 'Pengaturan tampilan berhasil disimpan dan langsung diterapkan ke seluruh halaman!',
      })
      setTimeout(() => setStatusMessage(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan konfigurasi.'
      setStatusMessage({ type: 'error', text: msg })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (
      !confirm(
        'Apakah Anda yakin ingin mengembalikan semua teks tampilan ke pengaturan awal (default)?'
      )
    )
      return

    setSaving(true)
    try {
      await resetLayoutConfigAction()
      setConfig(DEFAULT_LAYOUT_CONFIG)
      setStatusMessage({
        type: 'success',
        text: 'Semua tampilan berhasil dikembalikan ke pengaturan awal!',
      })
      setTimeout(() => setStatusMessage(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mereset konfigurasi.'
      setStatusMessage({ type: 'error', text: msg })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Bar: Tabs & Action Buttons */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation Tabs (5 Tabs) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('landing')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. Beranda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('program')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'program'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Program</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tentang')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tentang'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>3. Tentang Kami</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('siswa')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'siswa'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>4. Portal Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guru')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'guru'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>5. Portal Guru BK</span>
          </button>
        </div>

        {/* Global Save & Reset Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="Reset ke teks bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-red-50 text-red-900 border-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs opacity-75 hover:opacity-100"
          >
            Tutup
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: BERANDA (LANDING PAGE) */}
      {/* ========================================================= */}
      {activeTab === 'landing' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>Pengaturan Halaman Beranda (`/`)</span>
              </h3>
              <p className="text-xs text-amber-900/80 font-medium">
                Atur judul headline hero, subjudul, 3 metrik cepat, 3 tahapan kesadaran, dan banner CTA bawah.
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shrink-0 shadow-xs"
            >
              <span>Lihat Beranda</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Hero Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>A. Bagian Header & Hero Section</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Badge Teks Atas
                </label>
                <input
                  type="text"
                  value={config.landingPage.heroBadge}
                  onChange={(e) => handleLandingChange('heroBadge', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Utama Baris 1 (Prefix)
                </label>
                <input
                  type="text"
                  value={config.landingPage.heroTitlePrefix}
                  onChange={(e) => handleLandingChange('heroTitlePrefix', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Utama Baris 2 (Highlight Berwarna)
                </label>
                <input
                  type="text"
                  value={config.landingPage.heroTitleHighlight}
                  onChange={(e) => handleLandingChange('heroTitleHighlight', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Paragraf Deskripsi Pengantar Hero
                </label>
                <textarea
                  rows={3}
                  value={config.landingPage.heroDescription}
                  onChange={(e) => handleLandingChange('heroDescription', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Tombol Utama (Teks)
                </label>
                <input
                  type="text"
                  value={config.landingPage.heroPrimaryBtnText}
                  onChange={(e) => handleLandingChange('heroPrimaryBtnText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Tombol Sekunder (Teks)
                </label>
                <input
                  type="text"
                  value={config.landingPage.heroSecondaryBtnText}
                  onChange={(e) => handleLandingChange('heroSecondaryBtnText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>B. Tiga Kotak Metrik Ringkas (Stats Strip)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Kotak Metrik 1</p>
                <input
                  type="text"
                  placeholder="Angka"
                  value={config.landingPage.stat1Number}
                  onChange={(e) => handleLandingChange('stat1Number', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Keterangan"
                  value={config.landingPage.stat1Label}
                  onChange={(e) => handleLandingChange('stat1Label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Kotak Metrik 2</p>
                <input
                  type="text"
                  placeholder="Angka"
                  value={config.landingPage.stat2Number}
                  onChange={(e) => handleLandingChange('stat2Number', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Keterangan"
                  value={config.landingPage.stat2Label}
                  onChange={(e) => handleLandingChange('stat2Label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Kotak Metrik 3</p>
                <input
                  type="text"
                  placeholder="Angka"
                  value={config.landingPage.stat3Number}
                  onChange={(e) => handleLandingChange('stat3Number', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Keterangan"
                  value={config.landingPage.stat3Label}
                  onChange={(e) => handleLandingChange('stat3Label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569]"
                />
              </div>
            </div>
          </div>

          {/* 3 Steps */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>C. Tiga Tahapan Membangun Kesadaran</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span className="text-xs font-bold text-slate-600">Langkah 1</span>
                </div>
                <input
                  type="text"
                  value={config.landingPage.step1Title}
                  onChange={(e) => handleLandingChange('step1Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.landingPage.step1Desc}
                  onChange={(e) => handleLandingChange('step1Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span className="text-xs font-bold text-slate-600">Langkah 2</span>
                </div>
                <input
                  type="text"
                  value={config.landingPage.step2Title}
                  onChange={(e) => handleLandingChange('step2Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.landingPage.step2Desc}
                  onChange={(e) => handleLandingChange('step2Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span className="text-xs font-bold text-slate-600">Langkah 3</span>
                </div>
                <input
                  type="text"
                  value={config.landingPage.step3Title}
                  onChange={(e) => handleLandingChange('step3Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.landingPage.step3Desc}
                  onChange={(e) => handleLandingChange('step3Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>D. Banner Ajakan Bertindak Bawah (Bottom CTA)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Banner CTA
                </label>
                <input
                  type="text"
                  value={config.landingPage.ctaTitle}
                  onChange={(e) => handleLandingChange('ctaTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Subjudul Banner CTA
                </label>
                <input
                  type="text"
                  value={config.landingPage.ctaSubtitle}
                  onChange={(e) => handleLandingChange('ctaSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Teks Tombol CTA
                </label>
                <input
                  type="text"
                  value={config.landingPage.ctaButtonText}
                  onChange={(e) => handleLandingChange('ctaButtonText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: HALAMAN PROGRAM */}
      {/* ========================================================= */}
      {activeTab === 'program' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Pengaturan Halaman Program (`/program`)</span>
              </h3>
              <p className="text-xs text-amber-900/80 font-medium">
                Sesuaikan teks header program, 3 langkah intervensi siswa, dan banner panduan syarat konseling.
              </p>
            </div>
            <Link
              href="/program"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shrink-0 shadow-xs"
            >
              <span>Lihat Halaman Program</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Header Program */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>A. Header Halaman Program</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Badge Teks Program
                </label>
                <input
                  type="text"
                  value={config.programPage.badge}
                  onChange={(e) => handleProgramChange('badge', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Utama Program
                </label>
                <input
                  type="text"
                  value={config.programPage.title}
                  onChange={(e) => handleProgramChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Paragraf Deskripsi Program
                </label>
                <textarea
                  rows={3}
                  value={config.programPage.subtitle}
                  onChange={(e) => handleProgramChange('subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 3 Tahapan Program */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>B. Tiga Tahapan Kesadaran (Alur Program Siswa)</span>
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0f172a]">
                Judul Bagian Metodologi
              </label>
              <input
                type="text"
                value={config.programPage.methodologyHeading}
                onChange={(e) => handleProgramChange('methodologyHeading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-emerald-800">Tahap 1</span>
                <input
                  type="text"
                  value={config.programPage.step1Title}
                  onChange={(e) => handleProgramChange('step1Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.programPage.step1Desc}
                  onChange={(e) => handleProgramChange('step1Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-emerald-800">Tahap 2</span>
                <input
                  type="text"
                  value={config.programPage.step2Title}
                  onChange={(e) => handleProgramChange('step2Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.programPage.step2Desc}
                  onChange={(e) => handleProgramChange('step2Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-emerald-800">Tahap 3</span>
                <input
                  type="text"
                  value={config.programPage.step3Title}
                  onChange={(e) => handleProgramChange('step3Title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <textarea
                  rows={3}
                  value={config.programPage.step3Desc}
                  onChange={(e) => handleProgramChange('step3Desc', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Banner Syarat Konseling */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>C. Banner Petunjuk Syarat Konseling 1-on-1</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Banner Konseling
                </label>
                <input
                  type="text"
                  value={config.programPage.counselingBannerTitle}
                  onChange={(e) => handleProgramChange('counselingBannerTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Isi Teks Petunjuk Syarat Konseling
                </label>
                <textarea
                  rows={2}
                  value={config.programPage.counselingBannerText}
                  onChange={(e) => handleProgramChange('counselingBannerText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: HALAMAN TENTANG KAMI */}
      {/* ========================================================= */}
      {activeTab === 'tentang' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Pengaturan Halaman Tentang Kami (`/tentang-kami`)</span>
              </h3>
              <p className="text-xs text-amber-900/80 font-medium">
                Atur pengantar, Visi & Misi institusional, dan biodata profil Tim Peneliti / Pengembang.
              </p>
            </div>
            <Link
              href="/tentang-kami"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shrink-0 shadow-xs"
            >
              <span>Lihat Tentang Kami</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Header & Visi Misi */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>A. Header & Visi Misi Platform</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Badge Header
                </label>
                <input
                  type="text"
                  value={config.tentangKamiPage.badge}
                  onChange={(e) => handleTentangChange('badge', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Baris 1
                </label>
                <input
                  type="text"
                  value={config.tentangKamiPage.titlePrefix}
                  onChange={(e) => handleTentangChange('titlePrefix', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Baris 2 (Highlight)
                </label>
                <input
                  type="text"
                  value={config.tentangKamiPage.titleHighlight}
                  onChange={(e) => handleTentangChange('titleHighlight', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Deskripsi Pengantar
                </label>
                <textarea
                  rows={2}
                  value={config.tentangKamiPage.description}
                  onChange={(e) => handleTentangChange('description', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-[#0f172a]">
                  Isi Visi Kami
                </label>
                <textarea
                  rows={2}
                  value={config.tentangKamiPage.visiText}
                  onChange={(e) => handleTentangChange('visiText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Isi Misi 1
                </label>
                <textarea
                  rows={2}
                  value={config.tentangKamiPage.misi1Text}
                  onChange={(e) => handleTentangChange('misi1Text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#0f172a]">
                  Isi Misi 2
                </label>
                <textarea
                  rows={2}
                  value={config.tentangKamiPage.misi2Text}
                  onChange={(e) => handleTentangChange('misi2Text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Tim Peneliti */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>B. Tim Peneliti & Praktisi Pengembang (3 Profil)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Member 1 */}
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Profil Tim 1</p>
                <input
                  type="text"
                  placeholder="Nama Lengkap & Gelar"
                  value={config.tentangKamiPage.member1Name}
                  onChange={(e) => handleTentangChange('member1Name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Peran / Jabatan"
                  value={config.tentangKamiPage.member1Role}
                  onChange={(e) => handleTentangChange('member1Role', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#057a44] font-semibold"
                />
                <textarea
                  rows={4}
                  placeholder="Biografi ringkas"
                  value={config.tentangKamiPage.member1Bio}
                  onChange={(e) => handleTentangChange('member1Bio', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              {/* Member 2 */}
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Profil Tim 2</p>
                <input
                  type="text"
                  placeholder="Nama Lengkap & Gelar"
                  value={config.tentangKamiPage.member2Name}
                  onChange={(e) => handleTentangChange('member2Name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Peran / Jabatan"
                  value={config.tentangKamiPage.member2Role}
                  onChange={(e) => handleTentangChange('member2Role', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#057a44] font-semibold"
                />
                <textarea
                  rows={4}
                  placeholder="Biografi ringkas"
                  value={config.tentangKamiPage.member2Bio}
                  onChange={(e) => handleTentangChange('member2Bio', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>

              {/* Member 3 */}
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-amber-800">Profil Tim 3</p>
                <input
                  type="text"
                  placeholder="Nama Lengkap & Gelar"
                  value={config.tentangKamiPage.member3Name}
                  onChange={(e) => handleTentangChange('member3Name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0f172a]"
                />
                <input
                  type="text"
                  placeholder="Peran / Jabatan"
                  value={config.tentangKamiPage.member3Role}
                  onChange={(e) => handleTentangChange('member3Role', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#057a44] font-semibold"
                />
                <textarea
                  rows={4}
                  placeholder="Biografi ringkas"
                  value={config.tentangKamiPage.member3Bio}
                  onChange={(e) => handleTentangChange('member3Bio', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#475569] leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: PORTAL MURID / SISWA */}
      {/* ========================================================= */}
      {activeTab === 'siswa' && (
        <div className="space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Pengaturan Konten Dashboard Portal Siswa (`/siswa`)</span>
              </h3>
              <p className="text-xs text-emerald-900/80 font-medium">
                Atur salam sambutan, pesan motivasi harian, dan banner pengumuman untuk seluruh siswa yang sedang login.
              </p>
            </div>
            <Link
              href="/siswa"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shrink-0 shadow-xs"
            >
              <span>Lihat Portal Siswa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>A. Salam Sambutan & Header Siswa</span>
            </h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Sambutan Siswa
                </label>
                <input
                  type="text"
                  value={config.studentPortal.welcomeTitle}
                  onChange={(e) => handleStudentChange('welcomeTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Subjudul Sambutan / Pesan Motivasi
                </label>
                <textarea
                  rows={2}
                  value={config.studentPortal.welcomeSubtitle}
                  onChange={(e) => handleStudentChange('welcomeSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-serif font-extrabold text-base text-[#0f172a] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>B. Banner Pengumuman & Tips Harian Siswa</span>
              </h4>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.studentPortal.announcementActive}
                  onChange={(e) => handleStudentChange('announcementActive', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-700">Tampilkan Banner</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Banner Pengumuman / Tips
                </label>
                <input
                  type="text"
                  value={config.studentPortal.announcementTitle}
                  onChange={(e) => handleStudentChange('announcementTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Isi Pesan Banner Pengumuman / Tips
                </label>
                <textarea
                  rows={2}
                  value={config.studentPortal.announcementText}
                  onChange={(e) => handleStudentChange('announcementText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: PORTAL GURU BK */}
      {/* ========================================================= */}
      {activeTab === 'guru' && (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Pengaturan Konten Dashboard Guru BK (`/guru`)</span>
              </h3>
              <p className="text-xs text-blue-900/80 font-medium">
                Sesuaikan judul panduan, pengumuman operasional, dan petunjuk bimbingan konseling untuk guru pembimbing.
              </p>
            </div>
            <Link
              href="/guru"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shrink-0 shadow-xs"
            >
              <span>Lihat Portal Guru</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>A. Judul & Subjudul Banner Guru BK</span>
            </h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Judul Header Guru BK
                </label>
                <input
                  type="text"
                  value={config.teacherPortal.portalTitle}
                  onChange={(e) => handleTeacherChange('portalTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Subjudul Panduan Ringkas
                </label>
                <textarea
                  rows={2}
                  value={config.teacherPortal.portalSubtitle}
                  onChange={(e) => handleTeacherChange('portalSubtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xs space-y-5">
            <h4 className="font-serif font-extrabold text-base text-[#0f172a] border-b border-slate-200 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>B. Catatan Panduan & Prosedur Konseling</span>
            </h4>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Petunjuk Pengingat Daftar Siswa (Banner Note)
                </label>
                <input
                  type="text"
                  value={config.teacherPortal.bannerNotice}
                  onChange={(e) => handleTeacherChange('bannerNotice', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a]">
                  Pedoman Telaah Refleksi Siswa
                </label>
                <textarea
                  rows={2}
                  value={config.teacherPortal.counselorGuidelines}
                  onChange={(e) => handleTeacherChange('counselorGuidelines', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm font-medium text-[#0f172a] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 z-30 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-slate-700">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Simpan perubahan untuk menerapkan teks terbaru ke seluruh platform.</span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <span className="animate-spin w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? 'Menyimpan...' : 'Simpan Semua'}</span>
        </button>
      </div>
    </div>
  )
}

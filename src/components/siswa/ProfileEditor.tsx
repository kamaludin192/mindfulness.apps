'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Edit3,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from 'lucide-react'
import { updateProfile, type ProfileActionState } from '@/app/siswa/profil/actions'

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3f5726] hover:bg-[#2b3a1a] text-white text-xs md:text-sm font-semibold rounded-2xl transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {pending ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      <span>{pending ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
    </button>
  )
}

const initialProfileState: ProfileActionState = {
  error: null,
  success: null,
  updatedName: null,
}

export default function ProfileEditor({
  initialName,
  email,
}: {
  initialName: string
  email: string
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentName, setCurrentName] = useState(initialName)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [state, formAction] = useFormState(updateProfile, initialProfileState)

  useEffect(() => {
    if (state.success) {
      if (state.updatedName) {
        setCurrentName(state.updatedName)
      }
      router.refresh()
    }
  }, [state, router])

  return (
    <div className="space-y-4">
      {/* Toggle Button in Profile Header */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#3f5726] bg-[#3f5726] hover:bg-[#2b3a1a] text-white text-xs md:text-sm font-semibold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profil & Akun</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#d5dcc4] bg-white hover:bg-[#f3f6e8] text-[#2b3a1a] text-xs md:text-sm font-semibold transition-all cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
          <span>Tutup Form Edit</span>
        </button>
      )}

      {/* Edit Form Card */}
      {isOpen && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#3f5726]/30 shadow-md animate-in fade-in slide-in-from-top-3 duration-300 space-y-6">
          <div className="flex items-center justify-between border-b border-[#d5dcc4] pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold font-serif text-[#1e2a14] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#3f5726]" />
                Perbarui Data Profil & Kata Sandi
              </h2>
              <p className="text-xs text-[#2b3a1a]/70">
                Sesuaikan nama lengkap Anda dan ubah kata sandi akun jika diperlukan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-[#2b3a1a]/50 hover:text-[#1e2a14] hover:bg-[#f3f6e8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback Alerts */}
          {state.error && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <p className="leading-snug">{state.error}</p>
            </div>
          )}

          {state.success && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs md:text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
              <p className="leading-snug">{state.success}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Section 1: Informasi Dasar */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#3f5726] uppercase tracking-wider">
                1. Informasi Pribadi
              </h3>

              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-semibold text-[#1e2a14] block"
                >
                  Nama Lengkap Siswa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] text-xs md:text-sm text-[#1e2a14] bg-[#f8fafc]"
                  />
                </div>
              </div>

              {/* Email (Read only) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="userEmail"
                  className="text-xs font-semibold text-[#1e2a14] block"
                >
                  Alamat Email Akun
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="userEmail"
                    type="email"
                    disabled
                    value={email}
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4]/60 rounded-2xl text-xs md:text-sm text-[#2b3a1a]/60 bg-[#f1f5f9] cursor-not-allowed"
                  />
                </div>
                <span className="text-[10px] text-[#2b3a1a]/50 italic block">
                  Email akun tidak dapat diubah langsung demi keamanan data siswa.
                </span>
              </div>
            </div>

            {/* Section 2: Ubah Kata Sandi (Opsional) */}
            <div className="space-y-4 pt-4 border-t border-[#d5dcc4]/70">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#3f5726] uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>2. Keamanan & Ubah Kata Sandi (Opsional)</span>
                </h3>
                <span className="text-[11px] text-[#2b3a1a]/60">Kosongkan jika tidak ingin mengubah</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Kata Sandi Baru */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="newPassword"
                    className="text-xs font-semibold text-[#1e2a14] block"
                  >
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      minLength={6}
                      placeholder="Minimal 6 karakter"
                      className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] text-xs md:text-sm text-[#1e2a14] bg-[#f8fafc]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Konfirmasi Kata Sandi Baru */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmNewPassword"
                    className="text-xs font-semibold text-[#1e2a14] block"
                  >
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      minLength={6}
                      placeholder="Ulangi kata sandi baru"
                      className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] text-xs md:text-sm text-[#1e2a14] bg-[#f8fafc]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5dcc4]/70">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 rounded-2xl border border-[#d5dcc4] bg-white hover:bg-[#f3f6e8] text-[#2b3a1a] text-xs md:text-sm font-semibold transition-all cursor-pointer"
              >
                Batal
              </button>
              <SaveButton />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateGuruProfile, GuruProfileActionState } from '@/app/guru/profil/actions'
import {
  UserCheck,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  GraduationCap,
  CreditCard,
} from 'lucide-react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#057a44] hover:bg-[#065f46] text-white text-xs sm:text-sm font-extrabold transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Menyimpan Perubahan...</span>
        </>
      ) : (
        <span>Simpan Perubahan Profil</span>
      )}
    </button>
  )
}

export default function GuruProfileEditor({
  initialName,
  initialNip,
  email,
}: {
  initialName: string
  initialNip: string
  email: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const initialState: GuruProfileActionState = { error: null, success: null }
  const [state, formAction] = useFormState(updateGuruProfile, initialState)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-2xl bg-[#f3f6e8] hover:bg-[#e4eccf] text-[#057a44] border-2 border-[#d5dcc4] text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
      >
        <UserCheck className="w-4 h-4 text-[#057a44]" />
        <span>Edit Profil & Password</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-[#d5dcc4] shadow-2xl space-y-6 relative my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#e2e8f0] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#065f46] border border-emerald-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Identitas Pendidik & Konselor</span>
                </div>
                <h2 className="font-serif font-extrabold text-xl text-[#0f172a]">
                  Edit Profil Guru BK
                </h2>
                <p className="text-xs text-[#475569]">
                  Perbarui nama lengkap & gelar, NIP, serta kata sandi akun Anda.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Alert Messages */}
            {state.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{state.error}</span>
              </div>
            )}

            {state.success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{state.success}</span>
              </div>
            )}

            <form action={formAction} className="space-y-5">
              {/* Email (Read Only) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#057a44]" />
                  <span>Alamat Email (Login)</span>
                </label>
                <input
                  type="text"
                  disabled
                  value={email}
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono cursor-not-allowed"
                />
                <p className="text-[10px] text-slate-400">Email akun dikelola oleh Superadmin sistem.</p>
              </div>

              {/* Nama Lengkap & Gelar */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#057a44]" />
                  <span>Nama Lengkap & Gelar Akademis <span className="text-red-500">*</span></span>
                </label>
                <input
                  name="fullName"
                  type="text"
                  defaultValue={state.updatedName || initialName}
                  placeholder="Contoh: Dra. Endang Sulistyowati, M.Pd, Kons."
                  required
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white transition-all"
                />
                <p className="text-[10px] text-[#475569]">
                  Nama dan gelar ini akan ditampilkan kepada siswa saat memilih jadwal konseling.
                </p>
              </div>

              {/* NIP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#057a44]" />
                  <span>NIP / Nomor Induk Pegawai</span>
                </label>
                <input
                  name="nip"
                  type="text"
                  defaultValue={state.updatedNip || initialNip}
                  placeholder="Contoh: 19820512 200801 2 015"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0f172a] font-medium outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white transition-all"
                />
              </div>

              {/* Section Divider for Password */}
              <div className="pt-3 border-t border-[#e2e8f0] space-y-3">
                <div>
                  <h3 className="text-xs font-extrabold text-[#0f172a] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#057a44]" />
                    <span>Ganti Kata Sandi (Opsional)</span>
                  </h3>
                  <p className="text-[11px] text-[#475569]">
                    Kosongkan bagian ini jika Anda tidak ingin mengubah kata sandi login.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#334155] block">
                      Kata Sandi Baru
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="Minimal 6 karakter"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-[#0f172a] outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#334155] block">
                      Konfirmasi Kata Sandi
                    </label>
                    <input
                      name="confirmNewPassword"
                      type="password"
                      placeholder="Ulangi kata sandi"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-[#0f172a] outline-none focus:ring-2 focus:ring-[#057a44] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

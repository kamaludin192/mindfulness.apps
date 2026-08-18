'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import {
  Leaf,
  Lock,
  Mail,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  requestPasswordReset,
  verifyOtpAndChangePassword,
  type ResetState,
} from './actions'

function RequestButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-sm md:text-base font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f5726] transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <KeyRound className="h-4 w-4" />
      )}
      <span>{pending ? 'Mengirim Kode...' : 'Kirim Kode Verifikasi OTP'}</span>
    </button>
  )
}

function VerifyButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-sm md:text-base font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f5726] transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <ShieldCheck className="h-4 w-4" />
      )}
      <span>{pending ? 'Memverifikasi...' : 'Verifikasi & Simpan Kata Sandi'}</span>
    </button>
  )
}

const initialResetState: ResetState = {
  step: 'email',
  email: '',
  error: null,
  message: null,
}

export default function ForgotPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')

  const [requestState, requestAction] = useFormState(
    requestPasswordReset,
    initialResetState
  )

  const [verifyState, verifyAction] = useFormState(
    verifyOtpAndChangePassword,
    requestState
  )

  // Use the active step from states
  const activeStep = verifyState.step !== 'email' ? verifyState.step : requestState.step
  const errorMsg = verifyState.error || requestState.error
  const successMsg = verifyState.message || requestState.message

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f3f6e8] text-[#2b3a1a] selection:bg-[#c2db8f]/40 relative overflow-hidden">
      {/* Background organic light circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c2db8f]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#3f5726]/10 blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="p-4 md:p-6 max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xs text-[#3f5726] border border-[#d5dcc4] text-xs md:text-sm font-semibold hover:bg-white hover:shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3f5726]">
            <Leaf className="w-4 h-4 text-white" />
          </span>
          <span className="font-serif font-bold text-sm md:text-base text-[#3f5726] hidden sm:inline">
            mindfulnessintervention<span className="font-normal text-[#5a7a35]">.id</span>
          </span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[#d5dcc4]/80 space-y-6">
          {/* Step 1 & 2 Header Icon */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] text-[#3f5726] mb-1 shadow-xs">
              {activeStep === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-[#3f5726]" />
              ) : activeStep === 'otp' ? (
                <ShieldCheck className="w-6 h-6 text-[#3f5726]" />
              ) : (
                <KeyRound className="w-6 h-6 text-[#3f5726]" />
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1e2a14]">
              {activeStep === 'success'
                ? 'Kata Sandi Diperbarui'
                : activeStep === 'otp'
                ? 'Verifikasi Kode OTP'
                : 'Lupa Kata Sandi'}
            </h1>

            <p className="text-xs md:text-sm text-[#2b3a1a]/70">
              {activeStep === 'success'
                ? 'Silakan masuk dengan akun dan kata sandi baru Anda.'
                : activeStep === 'otp'
                ? `Masukkan 6-digit kode yang dikirim ke ${requestState.email || currentEmail}`
                : 'Masukkan email akun siswa atau guru Anda untuk menerima kode pemulihan.'}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <p className="leading-snug">{errorMsg}</p>
            </div>
          )}

          {successMsg && activeStep !== 'success' && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs md:text-sm animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
              <p className="leading-snug">{successMsg}</p>
            </div>
          )}

          {/* STEP 1: REQUEST OTP (INPUT EMAIL) */}
          {activeStep === 'email' && (
            <form
              action={(formData) => {
                const emailVal = formData.get('email') as string
                setCurrentEmail(emailVal)
                return requestAction(formData)
              }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block"
                  htmlFor="email"
                >
                  Alamat Email Terdaftar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={currentEmail}
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <RequestButton />
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-[#3f5726] hover:underline"
                >
                  Sudah ingat kata sandi? Masuk di sini
                </Link>
              </div>
            </form>
          )}

          {/* STEP 2: VERIFY OTP & NEW PASSWORD */}
          {activeStep === 'otp' && (
            <form action={verifyAction} className="space-y-4">
              <input
                type="hidden"
                name="email"
                value={requestState.email || currentEmail}
              />

              {/* OTP 6-Digit Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block"
                    htmlFor="otp"
                  >
                    Kode OTP (6 Digit)
                  </label>
                  <span className="text-[11px] text-[#3f5726] font-medium">
                    Periksa Email
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={8}
                    autoComplete="one-time-code"
                    className="block w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-xl font-bold border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-[#1e2a14] bg-[#f3f6e8]/40 placeholder-[#2b3a1a]/20 transition-all"
                    placeholder="123456"
                  />
                </div>
              </div>

              {/* New Password Input */}
              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block"
                  htmlFor="newPassword"
                >
                  Kata Sandi Baru (Min. 6 Karakter)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="Kata sandi baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] transition-colors cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block"
                  htmlFor="confirmNewPassword"
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
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="Ulangi kata sandi baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <VerifyButton />
              </div>

              {/* Resend / Change email triggers */}
              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Reset to step 1
                    window.location.reload()
                  }}
                  className="text-[#2b3a1a]/70 hover:text-[#2b3a1a] transition-colors cursor-pointer"
                >
                  Ganti Email
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Trigger resend
                    const formData = new FormData()
                    formData.append('email', requestState.email || currentEmail)
                    requestAction(formData)
                  }}
                  className="text-[#3f5726] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Kirim Ulang Kode</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {activeStep === 'success' && (
            <div className="space-y-6 text-center pt-2">
              <div className="p-4 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4] text-xs text-[#2b3a1a]/80 space-y-1">
                <p className="font-semibold text-[#3f5726] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Pembaruan Berhasil
                </p>
                <p>Akun Anda kini siap digunakan dengan kredensial baru.</p>
              </div>

              <Link
                href="/login"
                className="w-full inline-flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-[#2b3a1a]/50 z-10">
        <p>&copy; {new Date().getFullYear()} Mindfulnessintervention.id - Bimbingan Konseling & Pemulihan Akun.</p>
      </footer>
    </div>
  )
}

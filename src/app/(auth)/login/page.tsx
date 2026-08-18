'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import {
  Leaf,
  Lock,
  Mail,
  User,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { login, register, type AuthState } from './actions'

function SubmitButton({ isRegister }: { isRegister: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-sm md:text-base font-semibold text-white bg-[#3f5726] hover:bg-[#2b3a1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f5726] transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : isRegister ? (
        <UserPlus className="h-4 w-4" />
      ) : (
        <LogIn className="h-4 w-4" />
      )}
      <span>{pending ? 'Memproses...' : isRegister ? 'Daftar Akun Baru' : 'Masuk ke Portal'}</span>
    </button>
  )
}

const initialAuthState: AuthState = {
  error: null,
  success: null,
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loginState, loginAction] = useFormState(login, initialAuthState)
  const [registerState, registerAction] = useFormState(register, initialAuthState)

  const currentState = activeTab === 'login' ? loginState : registerState

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f3f6e8] text-[#2b3a1a] selection:bg-[#c2db8f]/40 relative overflow-hidden">
      {/* Background organic light circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c2db8f]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#3f5726]/10 blur-3xl pointer-events-none" />

      {/* Top Bar / Navigation Back */}
      <header className="p-4 md:p-6 max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xs text-[#3f5726] border border-[#d5dcc4] text-xs md:text-sm font-semibold hover:bg-white hover:shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
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

      {/* Main Auth Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[#d5dcc4]/80 space-y-6">
          {/* Header Card Icon & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f3f6e8] border border-[#d5dcc4] text-[#3f5726] mb-1 shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1e2a14]">
              {activeTab === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
            </h1>
            <p className="text-xs md:text-sm text-[#2b3a1a]/70">
              {activeTab === 'login'
                ? 'Masuk untuk mengakses materi & konseling mindfulness'
                : 'Daftarkan diri Anda untuk memulai perjalanan kesehatan mental'}
            </p>
          </div>

          {/* Dual Mode Switcher Tabs */}
          <div className="p-1 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4]/70 flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#3f5726] text-white shadow-xs'
                  : 'text-[#2b3a1a]/70 hover:text-[#2b3a1a]'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#3f5726] text-white shadow-xs'
                  : 'text-[#2b3a1a]/70 hover:text-[#2b3a1a]'
              }`}
            >
              Daftar Akun
            </button>
          </div>

          {/* Feedback Alerts */}
          {currentState?.error && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <p className="leading-snug">{currentState.error}</p>
            </div>
          )}

          {currentState?.success && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs md:text-sm animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
              <p className="leading-snug">{currentState.success}</p>
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form action={loginAction} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="email">
                  Alamat Email
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
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="nama@sekolah.sch.id"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="password">
                    Kata Sandi
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#3f5726] hover:underline"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <SubmitButton isRegister={false} />
              </div>

              {/* Test account note */}
              <div className="p-3 bg-[#f3f6e8]/80 rounded-2xl border border-[#d5dcc4]/60 text-[11px] text-[#2b3a1a]/70 space-y-1">
                <p className="font-semibold text-[#3f5726] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Akun Uji Coba Demo:
                </p>
                <p>Siswa: <span className="font-mono text-[#1e2a14]">siswa@example.com</span> | Sandi: <span className="font-mono text-[#1e2a14]">password123</span></p>
                <p>Guru BK: <span className="font-mono text-[#1e2a14]">guru@example.com</span> | Sandi: <span className="font-mono text-[#1e2a14]">password123</span></p>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form action={registerAction} className="space-y-4">
              {/* Notice that registration is for students */}
              <div className="p-3.5 bg-[#f3f6e8] rounded-2xl border border-[#d5dcc4] text-xs text-[#2b3a1a]/80 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#3f5726] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Pendaftaran akun ini khusus untuk <strong>Siswa (Murid)</strong>. Akun Guru BK didaftarkan langsung oleh Administrator Sekolah.
                </p>
              </div>
              <input type="hidden" name="role" value="siswa" />

              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="fullName">
                  Nama Lengkap
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
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="Contoh: Ahmad Rizky"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="regEmail">
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="regEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="regPassword">
                  Kata Sandi (Min. 6 Karakter)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="regPassword"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="Minimal 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2b3a1a]/40 hover:text-[#2b3a1a] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1e2a14] uppercase tracking-wider block" htmlFor="confirmPassword">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2b3a1a]/40">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-3 border border-[#d5dcc4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f5726] focus:border-transparent text-sm text-[#1e2a14] bg-white placeholder-[#2b3a1a]/30 transition-all"
                    placeholder="Ulangi kata sandi"
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

              {/* Submit CTA */}
              <div className="pt-2">
                <SubmitButton isRegister={true} />
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="p-4 text-center text-xs text-[#2b3a1a]/50 z-10">
        <p>&copy; {new Date().getFullYear()} Mindfulnessintervention.id - Ruang Aman & Bimbingan Konseling Digital.</p>
      </footer>
    </div>
  )
}

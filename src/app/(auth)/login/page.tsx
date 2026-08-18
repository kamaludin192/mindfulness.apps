'use client'

import { useFormState } from 'react-dom'
import { User, Lock, LogIn } from 'lucide-react'
import { login } from './actions'

const initialState = {
  error: null as string | null,
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-sm border border-brand-300">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-900 mb-2">Selamat Datang</h1>
          <p className="text-brand-700 text-sm">Masuk untuk melanjutkan ke portal</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-900 block" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-brand-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-brand-900 bg-white"
                placeholder="Masukkan email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-900 block" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-brand-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-brand-900 bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm text-center">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-500 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

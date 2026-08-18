'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export interface AuthState {
  error: string | null
  success?: string | null
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi.' }
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email atau kata sandi yang Anda masukkan salah.' }
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Email Anda belum dikonfirmasi. Silakan periksa kotak masuk email Anda.' }
    }
    return { error: error.message }
  }

  const user = data.user

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    if (role === 'siswa') {
      redirect('/siswa')
    } else if (role === 'guru_bk' || role === 'superadmin') {
      redirect('/guru')
    }
  }

  redirect('/')
}

export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const role = (formData.get('role') as string) || 'siswa'

  if (!fullName || !email || !password) {
    return { error: 'Semua bidang wajib diisi.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi kata sandi tidak cocok.' }
  }

  if (password.length < 6) {
    return { error: 'Kata sandi minimal harus 6 karakter.' }
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        role,
      },
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email ini sudah terdaftar. Silakan gunakan menu Masuk.' }
    }
    return { error: error.message }
  }

  if (data.user) {
    // Upsert profile into public.profiles
    await supabase.from('profiles').upsert({
      id: data.user.id,
      full_name: fullName.trim(),
      role,
    })

    // If session is immediately active (e.g. email confirm disabled)
    if (data.session) {
      if (role === 'siswa') {
        redirect('/siswa')
      } else {
        redirect('/guru')
      }
    }

    return {
      error: null,
      success: 'Pendaftaran akun berhasil! Silakan masuk menggunakan akun baru Anda.',
    }
  }

  return {
    error: null,
    success: 'Pendaftaran berhasil. Silakan beralih ke tab Masuk untuk login.',
  }
}

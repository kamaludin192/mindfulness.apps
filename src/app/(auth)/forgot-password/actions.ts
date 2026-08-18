'use server'

import { createClient } from '@/lib/supabase/server'

export interface ResetState {
  step: 'email' | 'otp' | 'success'
  email: string
  error: string | null
  message: string | null
}

export async function requestPasswordReset(
  prevState: ResetState,
  formData: FormData
): Promise<ResetState> {
  const email = (formData.get('email') as string)?.trim()

  if (!email) {
    return {
      ...prevState,
      error: 'Silakan masukkan alamat email Anda.',
      message: null,
    }
  }

  const supabase = createClient()

  // Request password reset email from Supabase
  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    if (error.message.includes('rate limit')) {
      return {
        ...prevState,
        error: 'Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.',
        message: null,
      }
    }
    return {
      ...prevState,
      error: error.message,
      message: null,
    }
  }

  return {
    step: 'otp',
    email,
    error: null,
    message: `Kode verifikasi OTP telah dikirimkan ke email ${email}. Silakan periksa kotak masuk atau spam Anda.`,
  }
}

export async function verifyOtpAndChangePassword(
  prevState: ResetState,
  formData: FormData
): Promise<ResetState> {
  const email = (formData.get('email') as string)?.trim() || prevState.email
  const otp = (formData.get('otp') as string)?.trim()
  const newPassword = formData.get('newPassword') as string
  const confirmNewPassword = formData.get('confirmNewPassword') as string

  if (!otp) {
    return {
      ...prevState,
      error: 'Kode OTP 6-digit wajib diisi.',
      message: null,
    }
  }

  if (!newPassword || newPassword.length < 6) {
    return {
      ...prevState,
      error: 'Kata sandi baru minimal harus 6 karakter.',
      message: null,
    }
  }

  if (newPassword !== confirmNewPassword) {
    return {
      ...prevState,
      error: 'Konfirmasi kata sandi baru tidak cocok.',
      message: null,
    }
  }

  const supabase = createClient()

  // 1. Verify the recovery OTP token
  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'recovery',
  })

  if (verifyError) {
    // If recovery type fails, attempt with email type as fallback
    const { error: fallbackError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })

    if (fallbackError) {
      return {
        ...prevState,
        error: 'Kode OTP tidak valid atau sudah kadaluarsa. Silakan periksa kembali atau kirim ulang.',
        message: null,
      }
    }
  }

  // 2. Update user's password with the active session
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return {
      ...prevState,
      error: `Gagal memperbarui kata sandi: ${updateError.message}`,
      message: null,
    }
  }

  // 3. Sign out to ensure clean login with new credentials
  await supabase.auth.signOut()

  return {
    step: 'success',
    email,
    error: null,
    message: 'Kata sandi Anda berhasil diperbarui! Anda dapat masuk menggunakan kata sandi baru sekarang.',
  }
}

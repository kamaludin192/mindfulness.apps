'use server'

import {
  sendPasswordResetOtp,
  verifyPasswordResetOtp,
} from '@/services/auth.service'

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

  try {
    await sendPasswordResetOtp(email)
    return {
      step: 'otp',
      email,
      error: null,
      message: `Kode verifikasi OTP 6-digit telah dikirimkan ke email ${email}. Silakan periksa kotak masuk atau folder spam Anda.`,
    }
  } catch (err) {
    return {
      ...prevState,
      error: err instanceof Error ? err.message : 'Gagal mengirim kode verifikasi OTP.',
      message: null,
    }
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

  try {
    await verifyPasswordResetOtp(email, otp, newPassword)
    return {
      step: 'success',
      email,
      error: null,
      message:
        'Kata sandi Anda berhasil diperbarui! Anda dapat masuk menggunakan kata sandi baru sekarang.',
    }
  } catch (err) {
    return {
      ...prevState,
      error: err instanceof Error ? err.message : 'Gagal memverifikasi OTP atau mengubah kata sandi.',
      message: null,
    }
  }
}


'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface ProfileActionState {
  error: string | null
  success: string | null
}

export async function logoutAction() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function updateProfile(
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const fullName = (formData.get('fullName') as string)?.trim()
  const newPassword = (formData.get('newPassword') as string)?.trim()
  const confirmNewPassword = (formData.get('confirmNewPassword') as string)?.trim()

  if (!fullName) {
    return { error: 'Nama lengkap tidak boleh kosong.', success: null }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi Anda telah berakhir. Silakan login kembali.', success: null }
  }

  // 1. Update full_name in public.profiles and auth user metadata
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  if (profileError) {
    return { error: `Gagal memperbarui profil: ${profileError.message}`, success: null }
  }

  await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  // 2. If password change is requested
  if (newPassword) {
    if (newPassword.length < 6) {
      return {
        error: 'Nama berhasil diubah, namun kata sandi baru minimal harus 6 karakter.',
        success: null,
      }
    }

    if (newPassword !== confirmNewPassword) {
      return {
        error: 'Nama berhasil diubah, namun konfirmasi kata sandi tidak cocok.',
        success: null,
      }
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (passwordError) {
      return {
        error: `Nama berhasil diubah, namun gagal memperbarui kata sandi: ${passwordError.message}`,
        success: null,
      }
    }

    revalidatePath('/siswa/profil')
    revalidatePath('/siswa')
    return {
      error: null,
      success: 'Profil dan kata sandi baru Anda berhasil diperbarui!',
    }
  }

  revalidatePath('/siswa/profil')
  revalidatePath('/siswa')
  return {
    error: null,
    success: 'Profil Anda berhasil diperbarui!',
  }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface ProfileActionState {
  error: string | null
  success: string | null
  updatedName?: string | null
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

  // 1. Upsert into public.profiles (guarantees update even if row was created via OAuth/raw auth)
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name: fullName,
      role: user.user_metadata?.role || 'siswa',
    })

  if (profileError) {
    console.error('Error updating profile:', profileError)
    return { error: `Gagal memperbarui profil: ${profileError.message}`, success: null }
  }

  // 2. Also update user metadata in GoTrue Auth
  await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  // 3. If password change is requested
  if (newPassword) {
    if (newPassword.length < 6) {
      return {
        error: 'Nama berhasil diubah, namun kata sandi baru minimal harus 6 karakter.',
        success: null,
        updatedName: fullName,
      }
    }

    if (newPassword !== confirmNewPassword) {
      return {
        error: 'Nama berhasil diubah, namun konfirmasi kata sandi tidak cocok.',
        success: null,
        updatedName: fullName,
      }
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (passwordError) {
      return {
        error: `Nama berhasil diubah, namun gagal memperbarui kata sandi: ${passwordError.message}`,
        success: null,
        updatedName: fullName,
      }
    }

    revalidatePath('/siswa/profil')
    revalidatePath('/siswa')
    return {
      error: null,
      success: 'Profil dan kata sandi baru Anda berhasil diperbarui!',
      updatedName: fullName,
    }
  }

  revalidatePath('/siswa/profil')
  revalidatePath('/siswa')
  return {
    error: null,
    success: 'Profil Anda berhasil diperbarui!',
    updatedName: fullName,
  }
}

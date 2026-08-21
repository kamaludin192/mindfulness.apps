'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface GuruProfileActionState {
  error: string | null
  success: string | null
  updatedName?: string | null
  updatedNip?: string | null
}

export async function logoutAction() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function updateGuruProfile(
  prevState: GuruProfileActionState,
  formData: FormData
): Promise<GuruProfileActionState> {
  const fullName = (formData.get('fullName') as string)?.trim()
  const nip = (formData.get('nip') as string)?.trim() || ''
  const newPassword = (formData.get('newPassword') as string)?.trim()
  const confirmNewPassword = (formData.get('confirmNewPassword') as string)?.trim()

  if (!fullName) {
    return { error: 'Nama lengkap dan gelar tidak boleh kosong.', success: null }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi Anda telah berakhir. Silakan login kembali.', success: null }
  }

  // 1. Update public.profiles
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
    })
    .eq('id', user.id)

  if (profileError) {
    console.error('Error updating guru profile:', profileError)
    return { error: `Gagal memperbarui profil: ${profileError.message}`, success: null }
  }

  // 2. Update user metadata in GoTrue Auth (includes NIP)
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      nip: nip,
    },
  })

  if (metadataError) {
    console.error('Error updating auth metadata:', metadataError)
  }

  // 3. If password change is requested
  if (newPassword) {
    if (newPassword.length < 6) {
      return {
        error: 'Nama berhasil diperbarui, namun kata sandi baru minimal 6 karakter.',
        success: null,
        updatedName: fullName,
        updatedNip: nip,
      }
    }

    if (newPassword !== confirmNewPassword) {
      return {
        error: 'Nama berhasil diperbarui, namun konfirmasi kata sandi tidak cocok.',
        success: null,
        updatedName: fullName,
        updatedNip: nip,
      }
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (passwordError) {
      return {
        error: `Nama berhasil diperbarui, namun gagal mengubah kata sandi: ${passwordError.message}`,
        success: null,
        updatedName: fullName,
        updatedNip: nip,
      }
    }

    revalidatePath('/guru/profil')
    revalidatePath('/guru')
    revalidatePath('/siswa/chat')
    return {
      error: null,
      success: 'Profil (Nama, Gelar, NIP) dan kata sandi baru berhasil diperbarui!',
      updatedName: fullName,
      updatedNip: nip,
    }
  }

  revalidatePath('/guru/profil')
  revalidatePath('/guru')
  revalidatePath('/siswa/chat')

  return {
    error: null,
    success: 'Profil Guru BK (Nama, Gelar, dan NIP) berhasil diperbarui!',
    updatedName: fullName,
    updatedNip: nip,
  }
}

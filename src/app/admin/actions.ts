'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function ensureSuperadmin() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Autentikasi diperlukan.')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'superadmin') {
    throw new Error('Akses ditolak: Hanya Superadmin yang memiliki wewenang ini.')
  }

  return { supabase, user }
}

export async function updateUserRole(userId: string, newRole: 'siswa' | 'guru_bk' | 'superadmin') {
  const { supabase } = await ensureSuperadmin()

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    throw new Error(`Gagal mengubah role user: ${error.message}`)
  }

  revalidatePath('/admin')
  revalidatePath('/admin/users')
  revalidatePath('/guru/dashboard')
  return { success: true }
}

export async function updateCmsSession(
  sessionNumber: number,
  payload: { title: string; videoUrl?: string; description?: string }
) {
  const { supabase } = await ensureSuperadmin()

  // Find or upsert cms_contents for session_number
  const { data: existing } = await supabase
    .from('cms_contents')
    .select('id')
    .eq('session_number', sessionNumber)
    .single()

  if (existing?.id) {
    const { error } = await supabase
      .from('cms_contents')
      .update({
        title: payload.title,
        video_url: payload.videoUrl,
      })
      .eq('id', existing.id)

    if (error) {
      throw new Error(`Gagal memperbarui materi: ${error.message}`)
    }
  } else {
    const { error } = await supabase.from('cms_contents').insert({
      session_number: sessionNumber,
      title: payload.title,
      video_url: payload.videoUrl,
    })

    if (error) {
      throw new Error(`Gagal membuat materi: ${error.message}`)
    }
  }

  revalidatePath('/admin/materi')
  revalidatePath('/siswa')
  revalidatePath('/siswa/worksheet')
  return { success: true }
}

export async function deleteUserProfile(userId: string) {
  const { supabase } = await ensureSuperadmin()

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    throw new Error(`Gagal menghapus user: ${error.message}`)
  }

  revalidatePath('/admin/users')
  return { success: true }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
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

export async function registerGuruBk(payload: {
  fullName: string
  email: string
  password: string
}) {
  const { supabase } = await ensureSuperadmin()

  if (!payload.fullName?.trim() || !payload.email?.trim() || !payload.password) {
    throw new Error('Nama Lengkap, Email, dan Password wajib diisi.')
  }

  if (payload.password.length < 6) {
    throw new Error('Password minimal 6 karakter.')
  }

  // Create isolated client to prevent interfering with superadmin session
  const helperClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )

  const { data: authData, error: authError } = await helperClient.auth.signUp({
    email: payload.email.trim(),
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName.trim(),
        role: 'guru_bk',
      },
    },
  })

  if (authError) {
    throw new Error(`Gagal mendaftarkan Guru BK di auth: ${authError.message}`)
  }

  const newUserId = authData.user?.id
  if (newUserId) {
    // 1. Ensure profile is created / updated with guru_bk role
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: newUserId,
        full_name: payload.fullName.trim(),
        role: 'guru_bk',
      })

    if (profileError) {
      console.warn('Profile upsert warning:', profileError.message)
    }

    // 2. Initialize default availability settings for this Guru BK
    await supabase.from('counselor_availability_settings').upsert({
      guru_id: newUserId,
      active_days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
      time_slots: [
        { id: '1', timeRange: '09:00 - 09:45', startTime: '09:00', isActive: true },
        { id: '2', timeRange: '10:00 - 10:45', startTime: '10:00', isActive: true },
        { id: '3', timeRange: '13:00 - 13:45', startTime: '13:00', isActive: true },
        { id: '4', timeRange: '14:00 - 14:45', startTime: '14:00', isActive: true },
      ],
      disabled_dates: [],
      custom_notes: 'Sesi konseling diadakan di Ruang BK. Harap hadir tepat waktu.',
    })
  }

  revalidatePath('/admin')
  revalidatePath('/admin/users')
  return {
    success: true,
    user: {
      id: newUserId || '',
      full_name: payload.fullName.trim(),
      role: 'guru_bk' as const,
      created_at: new Date().toISOString(),
    },
  }
}

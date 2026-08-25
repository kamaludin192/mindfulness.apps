import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { AdminKpiMetrics } from '@/types/admin'
import type { UserRole } from '@/types/auth'

export async function ensureSuperadmin() {
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

export async function getAdminKpiMetrics(): Promise<AdminKpiMetrics> {
  const supabase = createClient()

  // 1. Fetch total user counts by role
  const { data: allProfiles } = await supabase
    .from('profiles')
    .select('id, role')

  const siswaCount = allProfiles?.filter((p) => p.role === 'siswa').length ?? 0
  const guruCount = allProfiles?.filter((p) => p.role === 'guru_bk').length ?? 0
  const adminCount = allProfiles?.filter((p) => p.role === 'superadmin').length ?? 0
  const totalUsers = allProfiles?.length ?? 0

  // 2. Fetch completed exercises count
  const { count: completedExercises } = await supabase
    .from('exercise_progress')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  // 3. Fetch counseling booking counts
  const { data: allBookings } = await supabase
    .from('counseling_bookings')
    .select('id, status')

  const totalBookings = allBookings?.length ?? 0
  const pendingBookings = allBookings?.filter((b) => b.status === 'pending').length ?? 0
  const approvedBookings = allBookings?.filter((b) => b.status === 'approved').length ?? 0

  return {
    siswaCount,
    guruCount,
    adminCount,
    totalUsers,
    completedExercises: completedExercises ?? 0,
    totalBookings,
    pendingBookings,
    approvedBookings,
  }
}

export async function updateUserRoleByAdmin(
  userId: string,
  newRole: UserRole
): Promise<void> {
  const { supabase } = await ensureSuperadmin()

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    throw new Error(`Gagal mengubah role user: ${error.message}`)
  }
}

export async function deleteUserProfileByAdmin(userId: string): Promise<void> {
  const { supabase } = await ensureSuperadmin()

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    throw new Error(`Gagal menghapus user: ${error.message}`)
  }
}

export async function registerGuruBkByAdmin(payload: {
  fullName: string
  email: string
  password: string
}) {
  await ensureSuperadmin()

  if (!payload.fullName?.trim() || !payload.email?.trim() || !payload.password) {
    throw new Error('Nama Lengkap, Email, dan Password wajib diisi.')
  }

  if (payload.password.length < 6) {
    throw new Error('Password minimal 6 karakter.')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (serviceRoleKey) {
    const adminAuthClient = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: authUser, error: authError } = await adminAuthClient.auth.admin.createUser({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      email_confirm: true,
      user_metadata: {
        full_name: payload.fullName.trim(),
        role: 'guru_bk',
      },
    })

    if (authError) {
      throw new Error(`Gagal membuat akun Auth: ${authError.message}`)
    }

    if (authUser?.user) {
      const newProfile = {
        id: authUser.user.id,
        email: payload.email.trim().toLowerCase(),
        full_name: payload.fullName.trim(),
        role: 'guru_bk' as const,
        school: 'SMA / SMK Bimbingan Konseling',
        created_at: new Date().toISOString(),
      }
      await adminAuthClient.from('profiles').upsert(newProfile)
      return { success: true, user: newProfile }
    }
  } else {
    const fallbackClient = createClient()
    const { data: signUpData, error: signUpError } = await fallbackClient.auth.signUp({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      options: {
        data: {
          full_name: payload.fullName.trim(),
          role: 'guru_bk',
        },
      },
    })

    if (signUpError) {
      throw new Error(`Gagal registrasi akun: ${signUpError.message}`)
    }

    if (signUpData?.user) {
      const newProfile = {
        id: signUpData.user.id,
        full_name: payload.fullName.trim(),
        role: 'guru_bk' as const,
        created_at: new Date().toISOString(),
      }
      // Gunakan UPSERT agar jika baris belum ada, otomatis dibuat
      await fallbackClient
        .from('profiles')
        .upsert({
          id: signUpData.user.id,
          role: 'guru_bk',
          full_name: payload.fullName.trim(),
        })
      return { success: true, user: newProfile }
    }
  }

  return { success: true }
}

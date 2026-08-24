import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { UserProfile, UserRole } from '@/types/auth'

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }
  return user
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role, school, phone, avatar_url, created_at, updated_at')
    .eq('id', user.id)
    .single()

  return profile as UserProfile | null
}

export async function requireAuth(allowedRoles?: UserRole[]): Promise<{
  user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
  profile: UserProfile
}> {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const profile = await getCurrentUserProfile()
  if (!profile) {
    redirect('/login')
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    // Redirect based on actual role
    if (profile.role === 'superadmin') {
      redirect('/admin')
    } else if (profile.role === 'guru_bk') {
      redirect('/guru')
    } else {
      redirect('/siswa')
    }
  }

  return { user, profile }
}

export async function resetPasswordForEmail(email: string, redirectTo: string) {
  const supabase = createClient()
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })
}

export async function sendPasswordResetOtp(email: string, redirectTo?: string) {
  const supabase = createClient()
  const cleanEmail = email.trim().toLowerCase()

  const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo: redirectTo || undefined,
  })

  if (error) {
    if (error.message.toLowerCase().includes('rate limit')) {
      throw new Error('Terlalu banyak permintaan reset kata sandi. Silakan tunggu beberapa saat.')
    }
    throw new Error(error.message || 'Gagal mengirim kode verifikasi OTP.')
  }

  return { success: true }
}

export async function verifyPasswordResetOtp(
  email: string,
  token: string,
  newPassword: string
) {
  const supabase = createClient()
  const cleanEmail = email.trim().toLowerCase()
  const cleanToken = token.trim()

  if (!cleanToken || cleanToken.length < 6) {
    throw new Error('Kode OTP 6-digit wajib diisi dengan benar.')
  }

  if (!newPassword || newPassword.length < 6) {
    throw new Error('Kata sandi baru minimal 6 karakter.')
  }

  // 1. Verify recovery OTP token
  const { error: verifyError } = await supabase.auth.verifyOtp({
    email: cleanEmail,
    token: cleanToken,
    type: 'recovery',
  })

  if (verifyError) {
    // Fallback attempt with 'email' verification type
    const { error: fallbackError } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type: 'email',
    })

    if (fallbackError) {
      throw new Error('Kode OTP tidak valid atau sudah kadaluarsa. Silakan periksa kembali atau kirim ulang kode.')
    }
  }

  // 2. Update password in active authenticated session
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    throw new Error(`Gagal memperbarui kata sandi: ${updateError.message}`)
  }

  // 3. Sign out session to require fresh login with new credentials
  await supabase.auth.signOut()

  return { success: true }
}

export async function provisionOrUpdateOAuthUser(user: {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    name?: string
    avatar_url?: string
    picture?: string
    role?: string
  }
}): Promise<{ role: UserRole }> {
  const supabase = createClient()

  // 1. Check if profile already exists by user ID
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, role, full_name, avatar_url')
    .eq('id', user.id)
    .single()

  if (existingProfile) {
    // Update avatar or full_name if empty
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null
    if (avatarUrl && !existingProfile.avatar_url) {
      await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id)
    }
    return { role: (existingProfile.role as UserRole) || 'siswa' }
  }

  // 2. Check if an account was pre-registered by email (e.g. Guru BK registered by Superadmin)
  if (user.email) {
    const { data: profileByEmail } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('email', user.email.toLowerCase())
      .maybeSingle()

    if (profileByEmail) {
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null
      await supabase
        .from('profiles')
        .update({
          id: user.id,
          avatar_url: avatarUrl || undefined,
        })
        .eq('email', user.email.toLowerCase())

      return { role: (profileByEmail.role as UserRole) || 'siswa' }
    }
  }

  // 3. Brand new user - default provision as 'siswa'
  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Siswa Baru'

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null

  await supabase.from('profiles').insert({
    id: user.id,
    email: user.email?.toLowerCase() || null,
    full_name: fullName,
    role: 'siswa',
    avatar_url: avatarUrl,
  })

  return { role: 'siswa' }
}

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

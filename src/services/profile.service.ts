import { createClient } from '@/lib/supabase/server'
import type { UserProfile, UserRole } from '@/types/auth'

export async function getProfileById(userId: string): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, school, phone, avatar_url, created_at, updated_at')
    .eq('id', userId)
    .single()

  if (error) return null
  return data as UserProfile
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'full_name' | 'school' | 'phone' | 'avatar_url'>>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}

export async function getAllProfiles(): Promise<UserProfile[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, role, school, phone, avatar_url, created_at, updated_at')
    .order('created_at', { ascending: false })

  return (data || []) as UserProfile[]
}

export async function getProfilesByRole(role: UserRole): Promise<UserProfile[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, full_name, role, school, phone, avatar_url, created_at, updated_at')
    .eq('role', role)
    .order('created_at', { ascending: false })

  return (data || []) as UserProfile[]
}

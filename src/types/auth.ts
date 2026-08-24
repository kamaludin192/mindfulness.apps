export type UserRole = 'siswa' | 'guru_bk' | 'superadmin'

export interface UserProfile {
  id: string
  full_name: string
  role: UserRole
  school?: string | null
  phone?: string | null
  avatar_url?: string | null
  created_at?: string
  updated_at?: string
}

export interface AuthState {
  error: string | null
  success: string | null
}

import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const user = data.user

      // Check if user already has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile) {
        // Auto-provision profile as siswa for new Google OAuth sign-in
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'Siswa Baru'

        await supabase.from('profiles').insert({
          id: user.id,
          full_name: fullName,
          role: 'siswa',
        })

        return NextResponse.redirect(new URL('/siswa', request.url))
      }

      // Existing user: redirect according to role
      if (profile.role === 'guru_bk' || profile.role === 'superadmin') {
        return NextResponse.redirect(new URL('/guru', request.url))
      } else {
        return NextResponse.redirect(new URL('/siswa', request.url))
      }
    }
  }

  // If error or no code, return to login with error param
  return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
}

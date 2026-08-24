import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'
import { provisionOrUpdateOAuthUser } from '@/services/auth.service'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next')

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const user = data.user

      // Check if this callback was triggered by a password recovery email
      if (type === 'recovery' || (next && next.includes('forgot-password'))) {
        return NextResponse.redirect(
          new URL(
            `/forgot-password?step=otp&email=${encodeURIComponent(user.email || '')}`,
            request.url
          )
        )
      }

      // Provision or update user profile as siswa for Google OAuth
      await provisionOrUpdateOAuthUser(user)

      // Direct redirection to Portal Siswa for Google Sign-In
      return NextResponse.redirect(new URL('/siswa', request.url))
    }
  }

  // If error or missing code, redirect to login with notification param
  return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
}

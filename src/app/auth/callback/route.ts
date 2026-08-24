import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next')

  if (code) {
    const response = NextResponse.redirect(new URL('/siswa', request.url))

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.delete(name)
            response.cookies.set({ name, value: '', ...options, maxAge: 0 })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const user = data.user

      // Check if this callback was triggered by a password recovery email
      if (type === 'recovery' || (next && next.includes('forgot-password'))) {
        const recoveryResponse = NextResponse.redirect(
          new URL(
            `/forgot-password?step=otp&email=${encodeURIComponent(user.email || '')}`,
            request.url
          )
        )
        response.cookies.getAll().forEach((c) => {
          recoveryResponse.cookies.set(c.name, c.value, c)
        })
        return recoveryResponse
      }

      // Check or provision profile as siswa
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle()

      if (!existingProfile) {
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'Siswa Baru'

        const avatarUrl =
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null

        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: fullName,
          role: 'siswa',
          avatar_url: avatarUrl,
        })
      }

      return response
    }
  }

  // If error or missing code, redirect to login with notification param
  return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
}

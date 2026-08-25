import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isSiswaRoute = request.nextUrl.pathname.startsWith('/siswa')
  const isGuruRoute = request.nextUrl.pathname.startsWith('/guru')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  const redirectWithCookies = (url: URL) => {
    const response = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    return response
  }

  if (!user && (isSiswaRoute || isGuruRoute || isAdminRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return redirectWithCookies(url)
  }

  if (user) {
    // Fetch user profile to check role safely
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    const role = profile?.role || user.user_metadata?.role || 'siswa'

    if (isAuthRoute) {
      const url = request.nextUrl.clone()
      if (role === 'superadmin') {
        url.pathname = '/admin'
      } else if (role === 'guru_bk') {
        url.pathname = '/guru'
      } else if (role === 'siswa') {
        url.pathname = '/siswa'
      } else {
        url.pathname = '/'
      }
      return redirectWithCookies(url)
    }

    if (isAdminRoute && role !== 'superadmin') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'guru_bk' ? '/guru' : role === 'siswa' ? '/siswa' : '/login'
      return redirectWithCookies(url)
    }

    if (isSiswaRoute && role !== 'siswa' && role !== 'superadmin') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'guru_bk' ? '/guru' : '/login'
      return redirectWithCookies(url)
    }

    if (isGuruRoute && role !== 'guru_bk' && role !== 'superadmin') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'siswa' ? '/siswa' : '/login'
      return redirectWithCookies(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

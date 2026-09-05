import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-do-not-use-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

import { locales, defaultLocale } from '@/i18n/config'

function getLocale(request: NextRequest): string {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return ''; // No redirect needed based on pathname alone

  // Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Fallback
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  // 1. Supabase Session Refresh (for any Supabase queries)
  const supabaseResponse = await updateSession(request)

  const { pathname } = request.nextUrl
  
  // 2. JWT Edge Protection for Admin Routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, encodedKey, {
        algorithms: ['HS256'],
      })
      if (payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return supabaseResponse
  }

  // Skip i18n for admin and API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return supabaseResponse;
  }

  // 3. i18n Locale Routing
  const localeToRedirect = getLocale(request);
  if (localeToRedirect) {
    request.nextUrl.pathname = `/${localeToRedirect}${pathname === '/' ? '' : pathname}`
    const response = NextResponse.redirect(request.nextUrl)
    // Copy Supabase cookies if they were updated
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    return response;
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-do-not-use-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  // 1. Supabase Session Refresh (for any Supabase queries)
  const supabaseResponse = await updateSession(request)

  // 2. JWT Edge Protection for Admin Routes
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, encodedKey, {
        algorithms: ['HS256'],
      })
      
      // Basic RBAC Check
      if (payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
    } catch (error) {
      // Token is invalid, expired, or tampered with
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
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

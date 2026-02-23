import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Read Vercel edge geo headers
  const visitorRegion = request.headers.get('x-vercel-ip-country-region')

  if (visitorRegion) {
    // Pass visitor state to pages via response header
    response.headers.set('x-visitor-region', visitorRegion)
    // Also set as a cookie so client components can access it
    response.cookies.set('visitor-region', visitorRegion, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
    })
  }

  return response
}

export const config = {
  // Run on all pages except static assets and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const hostname = request.headers.get('host') ?? ''

  // Pass geo headers (existing behavior)
  const visitorRegion = request.headers.get('x-vercel-ip-country-region')
  if (visitorRegion) {
    response.headers.set('x-visitor-region', visitorRegion)
    response.cookies.set('visitor-region', visitorRegion, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    })
  }

  const { pathname } = request.nextUrl

  // template.loangraphs.com → rewrite to /gallery prefix
  if (hostname === 'template.loangraphs.com' || hostname === 'template.loangraphs.me') {
    // Already on a /gallery route — let it through
    if (pathname.startsWith('/gallery') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
      return response
    }
    // Rewrite root and all gallery routes
    const url = request.nextUrl.clone()
    url.pathname = `/gallery${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

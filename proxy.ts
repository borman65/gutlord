/**
 * Middleware for Next.js 16 using proxy.ts pattern
 * Replaces the old middleware.ts for better performance
 *
 * Note: In Next.js 16, proxy.js/proxy.ts exports a 'proxy' function
 */

import { type NextRequest, NextResponse } from 'next/server'

/**
 * Proxy function for request interception
 * This replaces middleware in Next.js 16+
 */
export async function proxy(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next()

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Enable HSTS (HTTPS Strict Transport Security)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Add Cache-Control for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    )
  }

  return response
}

/**
 * Configuration for which routes to apply middleware to
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|robots.txt|sitemap.xml).*)',
  ],
}

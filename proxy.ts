import { NextRequest, NextResponse } from 'next/server'

// Inlined to keep this file Edge-compatible (no Node.js module imports)
const COOKIE_ACCESS_TOKEN = 'access-token'
const PROTECTED_PREFIXES = ['/dashboard']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )

  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value
  if (token) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/'
  url.searchParams.set('auth', 'signin')
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

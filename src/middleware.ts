import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/admin')
  const isLoginPath = path === '/admin/login'

  // Simple cookie-based auth
  const token = request.cookies.get('admin_token')?.value
  const isAuthenticated = token === 'authenticated'

  // If trying to access admin (but not login page) and not authenticated
  if (isAdminPath && !isLoginPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access login page and already authenticated
  if (isLoginPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

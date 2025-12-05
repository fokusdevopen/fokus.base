export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/articles/:path*',
    '/categories/:path*',
    '/tags/:path*',
    '/admin/:path*',
  ],
}
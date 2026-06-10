import { withAuth } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
}

export default withAuth(
  function middleware(req) {
    // This function is called only after authentication is successful
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        if (req.nextUrl.pathname.startsWith('/account')) {
          return !!token
        }
        return true
      },
    },
  }
)

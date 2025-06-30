import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth((req) => {
  const token = req.nextauth.token
  const path = req.nextUrl.pathname

  console.log(token?.email)

  if (path.startsWith('/dashboard')) {
    if (!token?.email) {
      console.log('not valid')
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }
})

export const config = {
  matcher: ['/dashboard/:path*'],
}

import { PrismaAdapter } from '@auth/prisma-adapter'
import EmailProvider from 'next-auth/providers/email'
import { Resend } from 'resend'
import { prismaClient } from '@/lib/prisma'
import type { NextAuthOptions } from 'next-auth'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    EmailProvider({
      from: 'onboarding@resend.dev',
      async sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Magic Link:', url)
          return
        }

        await resend.emails.send({
          from: 'Your App <onboarding@resend.dev>',
          to: identifier,
          subject: 'Login to Your App',
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
        })
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.email = token.sub
      }

      return session
    },
  },
}

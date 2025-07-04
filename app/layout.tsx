import type { Metadata } from 'next'
import { Geist, Geist_Mono as fontGeistMono } from 'next/font/google'
import { ApolloProvider } from '@/providers/apollo-provider'

import { Theme } from '@/providers/theme-provider'
import { GlobalStyles } from '@/styles/global-styles'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = fontGeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'All about your favorites pokemons',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider>
          <Theme>
            {children}
            <GlobalStyles />
          </Theme>
        </ApolloProvider>
      </body>
    </html>
  )
}

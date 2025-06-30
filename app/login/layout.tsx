'use client'

import { Header } from '@/components/header'
import { Container } from '@/components/login/styles'
import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}

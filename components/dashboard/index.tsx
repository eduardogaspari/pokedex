'use client'

import React from 'react'
import { Container } from './styles'
import { Sidebar } from './sidebar'
import { PokeDetail } from './poke-detail'

export function Page() {
  return (
    <Container>
      <Sidebar />
      <PokeDetail />
    </Container>
  )
}

import React from 'react'
import { Container } from './styles'
import Image from 'next/image'

export function Loading() {
  return (
    <Container>
      <Image
        alt="pokeball loading"
        src={'/pokeball.svg'}
        height={50}
        width={50}
      />
      Ash is on his way with more data!
    </Container>
  )
}

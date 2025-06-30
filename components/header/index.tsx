'use client'

import React from 'react'
import * as S from './styles'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  return (
    <S.Container>
      <S.Button onClick={() => router.push('/')}>
        <Image
          src={'/logo-pokedex.png'}
          alt="Pokedex Logo"
          height={40}
          width={300}
        />
      </S.Button>

      <S.Button>
        <Image
          src={'/settings.svg'}
          alt="Settings icon"
          height={25}
          width={25}
        />
      </S.Button>
    </S.Container>
  )
}

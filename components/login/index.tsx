'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import * as S from './styles'

const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const result = await signIn('email', {
        email: data.email,
        redirect: false,
        callbackUrl: '/dashboard',
      })

      if (result?.error) {
        setErrorMessage('Falha ao enviar o link mágico. Tente novamente.')
        setIsLoading(false)
        return
      }

      setSuccessMessage('Link mágico enviado! Verifique seu e-mail.')
      setIsLoading(false)
    } catch {
      setErrorMessage('Ocorreu um erro inesperado.')
      setIsLoading(false)
    }
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Image src="/pokeball.svg" alt="Pokeball" height={150} width={150} />
      <S.Actions>
        <S.Input
          {...register('email')}
          placeholder="Seu melhor e-mail"
          type="email"
          autoComplete="email"
        />
        {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
        {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
        {successMessage && <S.SuccessText>{successMessage}</S.SuccessText>}
        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Acessar'}
        </S.Button>
      </S.Actions>
    </S.Form>
  )
}

'use client'

import React, { createContext, useContext, useState, useMemo } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { GET_POKEMON_DETAILS } from '@/graphql/queries/get-pokemon-details'

interface Pokemon {
  id: number
  name: string
}

interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  species: { name: string; url: string }
  types: { type: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
  sprites: { front_default: string }
}

interface PokemonContextType {
  selectedPokemon: Pokemon | null
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  pokemonDetails: PokemonDetails | null
  loadingDetails: boolean
  errorDetails: ApolloError | undefined
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  const {
    data: detailsData,
    loading: loadingDetails,
    error: errorDetails,
  } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name: selectedPokemon?.name },
    skip: !selectedPokemon,
  })

  const pokemonDetails: PokemonDetails | null = useMemo(() => {
    return detailsData?.pokemon ?? null
  }, [detailsData])

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        pokemonDetails,
        loadingDetails,
        errorDetails,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export function usePokemon() {
  const context = useContext(PokemonContext)
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider')
  }
  return context
}

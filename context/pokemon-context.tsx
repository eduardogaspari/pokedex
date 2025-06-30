'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { ApolloError, useQuery, useLazyQuery } from '@apollo/client'
import { GET_POKEMON_SPRITE } from '@/graphql/queries/get-pokemon-sprite'
import { GET_POKEMON_DETAILS } from '@/graphql/queries/get-pokemon-details'
import { GET_EVOLUTION_CHAIN } from '@/graphql/queries/get-evolution-chain'

interface Pokemon {
  id: number
  name: string
}

interface EvolutionSprite {
  name: string
  sprite: string
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
  evolutionChain: EvolutionSprite[]
}

export interface Species {
  name: string
  url: string
}

export interface EvolutionNode {
  evolves_to: EvolutionNode[]
  is_baby: boolean
  species: Species
}

export interface EvolutionChain {
  chain: EvolutionNode
  id: number
}

interface PokemonContextType {
  selectedPokemon: Pokemon | null
  setSelectedPokemon: (pokemon: Pokemon | null) => void
  pokemonDetails: PokemonDetails | null
  loadingDetails: boolean
  errorDetails: ApolloError | undefined
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined)

const extractEvolutionNames = (chain: EvolutionNode): string[] => {
  const names: string[] = []
  const traverse = (node: EvolutionNode) => {
    if (node?.species?.name) names.push(node.species.name)
    node?.evolves_to?.forEach(traverse)
  }

  traverse(chain)
  return names
}

function useEvolutionSprites(names: string[]) {
  const [sprites, setSprites] = useState<EvolutionSprite[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchSprite] = useLazyQuery(GET_POKEMON_SPRITE)

  useEffect(() => {
    if (!names.length) return setSprites([])

    const loadSprites = async () => {
      setLoading(true)
      const results: EvolutionSprite[] = []

      for (const name of names) {
        try {
          const { data } = await fetchSprite({ variables: { name } })
          const sprite =
            data?.pokemon?.sprites?.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`

          results.push({ name, sprite })
        } catch {
          results.push({
            name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`,
          })
        }
      }

      setSprites(results)
      setLoading(false)
    }

    loadSprites()
  }, [names, fetchSprite])

  return { sprites, loading }
}

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

  const { data: evolutionData, loading: loadingEvolution } = useQuery(
    GET_EVOLUTION_CHAIN,
    {
      variables: { id: selectedPokemon?.id?.toString() },
      skip: !selectedPokemon,
    },
  )

  console.log(evolutionData)

  const evolutionNames = useMemo(() => {
    return (
      extractEvolutionNames(evolutionData?.evolutionChain?.response?.chain) ||
      []
    )
  }, [evolutionData])

  const { sprites: evolutionSprites, loading: loadingSprites } =
    useEvolutionSprites(evolutionNames)

  const pokemonDetails: PokemonDetails | null = useMemo(() => {
    if (!detailsData?.pokemon) return null
    return { ...detailsData.pokemon, evolutionChain: evolutionSprites }
  }, [detailsData, evolutionSprites])

  const isLoading = loadingDetails || loadingEvolution || loadingSprites

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        pokemonDetails,
        loadingDetails: isLoading,
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

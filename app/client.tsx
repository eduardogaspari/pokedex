'use client'

import { GET_POKEMONS } from '@/graphql/queries/get-pokemens'
import { useQuery } from '@apollo/client'

interface Pokemon {
  name: string
  image: string
}

interface PokemonQueryData {
  pokemons: {
    results: Pokemon[]
  }
}

export default function PokemonList() {
  const { loading, error, data } = useQuery<PokemonQueryData>(GET_POKEMONS, {
    variables: {
      limit: 2,
    },
  })

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error.message}</p>

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {data?.pokemons.results.map((pokemon) => (
        <div key={pokemon.name} className="text-center">
          <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  )
}

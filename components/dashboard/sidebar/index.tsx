'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import * as S from './styles'
import { GET_POKEMONS } from '@/graphql/queries/get-pokemens'
import { useDebounce } from '@/hooks/use-debouce'
import { usePokemon } from '@/context/pokemon-context'
import { Loading } from '@/components/loading'

interface Pokemon {
  id: number
  name: string
}

interface PokemonsData {
  pokemons: {
    count: number
    next: string | null
    previous: string | null
    status: boolean
    message: string
    results: Pokemon[]
  }
}

const ITEMS_PER_PAGE = 40

export function Sidebar() {
  const [offset, setOffset] = useState(0)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { selectedPokemon, setSelectedPokemon } = usePokemon()

  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingTriggerRef = useRef<HTMLLIElement | null>(null)

  const { data, error, loading, fetchMore } = useQuery<PokemonsData>(
    GET_POKEMONS,
    {
      variables: { limit: ITEMS_PER_PAGE, offset },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
    },
  )

  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore) return

    const newOffset = offset + ITEMS_PER_PAGE

    try {
      const { data: newData } = await fetchMore({
        variables: { limit: ITEMS_PER_PAGE, offset: newOffset },
      })

      const newPokemons = newData?.pokemons?.results ?? []
      const newHasMore = Boolean(newData?.pokemons?.next)

      setPokemons((prev) => [
        ...prev,
        ...newPokemons.filter(
          (p) => !prev.some((existing) => existing.id === p.id),
        ),
      ])

      setOffset(newOffset)
      setHasMore(newHasMore)
    } catch (err) {
      console.error('Error loading more pokemons:', err)
      setHasMore(false)
    }
  }, [fetchMore, loading, hasMore, offset])

  useEffect(() => {
    if (!data?.pokemons?.results) return

    setPokemons((prev) => [
      ...prev,
      ...data.pokemons.results.filter(
        (p) => !prev.some((existing) => existing.id === p.id),
      ),
    ])
    setHasMore(Boolean(data.pokemons.next))
  }, [data])

  useEffect(() => {
    const currentTrigger = loadingTriggerRef.current
    if (!currentTrigger) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMorePokemons()
        }
      },
      { root: null, rootMargin: '100px', threshold: 0.1 },
    )

    observerRef.current.observe(currentTrigger)

    return () => {
      observerRef.current?.unobserve(currentTrigger)
    }
  }, [hasMore, loading, loadMorePokemons])

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  const filteredPokemons = useMemo(() => {
    if (!debouncedSearch.trim()) return pokemons

    const query = debouncedSearch.trim().toLowerCase()

    return pokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(query) || p.id.toString().includes(query),
    )
  }, [debouncedSearch, pokemons])

  useEffect(() => {
    if (filteredPokemons.length > 0 && !selectedPokemon) {
      setSelectedPokemon(filteredPokemons[0])
    }
  }, [filteredPokemons, selectedPokemon, setSelectedPokemon])

  if (error) {
    return <S.Container>error</S.Container>
  }

  return (
    <S.Container>
      <div className="heading">
        <div>
          <Image
            src="/pokeball.svg"
            alt="Pokeball"
            height={50}
            width={50}
            priority
          />
          <h1>Pokedex</h1>
        </div>

        <h3>
          Everything you wanted to know about your favorite pocket monsters!
        </h3>
      </div>

      <div>
        <S.Input
          placeholder="Search by name or number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <S.Separator />
      </div>

      <S.PokemonList>
        {filteredPokemons.map((pokemon) => (
          <S.PokemonItem
            key={pokemon.id}
            selected={selectedPokemon?.id === pokemon.id}
            onClick={() => setSelectedPokemon(pokemon)}
          >
            #{pokemon.id.toString().padStart(3, '0')} -{' '}
            {pokemon.name.charAt(0).toUpperCase() +
              pokemon.name.slice(1).toLowerCase()}
          </S.PokemonItem>
        ))}

        {/* TODO => Loading component with a cool animation. */}

        {hasMore && !loading && (
          <li ref={loadingTriggerRef} style={{ height: '1px' }} />
        )}
        {loading && <Loading />}
        {hasMore && !loading && <Loading />}
        {!hasMore && filteredPokemons.length > 0 && (
          <S.PokemonItem>You&apos;ve caught them all! 🎉</S.PokemonItem>
        )}
      </S.PokemonList>
    </S.Container>
  )
}

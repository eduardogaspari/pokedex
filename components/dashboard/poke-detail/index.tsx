/* eslint-disable camelcase */
'use client'

import React, { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { Accent, Badge, Container, Heading, Wrapper } from './styles'
import { usePokemon } from '@/context/pokemon-context'
import { useChat } from '@ai-sdk/react'
import { Loading } from '@/components/loading'
import { ThemeSwitcher } from '@/components/theme-switcher'

interface EvolutionData {
  name: string
  sprite: string
}

interface EvolutionDetail {
  min_level: number | null
  trigger: {
    name: string
    url: string
  }
}

interface EvolutionChainNode {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionChainNode[]
  evolution_details: EvolutionDetail[]
  is_baby: boolean
}

export interface BadgeProps {
  variant:
    | 'hp'
    | 'special-attack'
    | 'attack'
    | 'special-defense'
    | 'defense'
    | 'speed'
    | 'grass'
    | 'poison'
}

interface EvolutionChain {
  chain: EvolutionChainNode
  id: number
}

const STAT_NAME_ABBREVIATIONS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  'special-attack': 'SP. ATK.',
  defense: 'DEF',
  'special-defense': 'SP. DEF.',
  speed: 'SPEED',
}

export function PokeDetail() {
  const { loadingDetails, selectedPokemon, pokemonDetails } = usePokemon()
  const [evolutionChain, setEvolutionChain] = useState<EvolutionData[]>([])

  const { messages, append, setMessages, isLoading } = useChat({
    api: '/api/chat',
    id: `pokemon-${selectedPokemon?.name || 'default'}`,
  })

  const formatPokemonName = useCallback((name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }, [])

  const formatPokemonId = useCallback((id: number): string => {
    return `#${id.toString().padStart(3, '0')}`
  }, [])

  const getIdFromSpeciesUrl = useCallback((url: string): string => {
    const parts = url.split('/')
    return parts[parts.length - 2]
  }, [])

  const formatHeight = useCallback((height: number): string => {
    const meters = height / 10
    const feetTotal = height * 0.328084

    const feet = Math.floor(feetTotal)
    const inches = Math.round((feetTotal - feet) * 12)

    return `${feet}'${inches.toString().padStart(2, '0')}" / ${meters.toFixed(1)}m`
  }, [])

  const formatWeight = useCallback((weight: number): string => {
    const kg = weight / 10
    const lbs = (weight * 0.220462).toFixed(1)

    return `${lbs}lbs. / ${kg.toFixed(1)}kg`
  }, [])

  const extractChain = useCallback(
    (chain: EvolutionChainNode): EvolutionData[] => {
      const result: EvolutionData[] = []

      const traverse = (node: EvolutionChainNode) => {
        if (!node) return
        result.push({
          name: node.species.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromSpeciesUrl(node.species.url)}.png`,
        })
        if (node.evolves_to?.[0]) {
          traverse(node.evolves_to[0])
        }
      }

      traverse(chain)
      return result
    },
    [getIdFromSpeciesUrl],
  )

  const fetchEvolutionChain = useCallback(
    async (speciesUrl: string) => {
      try {
        const speciesRes = await fetch(speciesUrl)
        const speciesData = await speciesRes.json()
        const evoUrl = speciesData?.evolution_chain?.url

        if (!evoUrl) return

        const evoRes = await fetch(evoUrl)
        const evoData: EvolutionChain = await evoRes.json()
        setEvolutionChain(extractChain(evoData.chain))
      } catch (err) {
        console.error('Failed to fetch evolution chain:', err)
      }
    },
    [extractChain],
  )

  const fetchPokemonInfo = useCallback(
    async (pokemonName: string) => {
      try {
        setMessages([])
        await append({
          role: 'user',
          content: pokemonName,
        })
      } catch (err) {
        console.error('Failed to fetch Pokémon info:', err)
      }
    },
    [append, setMessages],
  )

  useEffect(() => {
    if (selectedPokemon?.name) {
      fetchPokemonInfo(selectedPokemon.name)
    }
  }, [selectedPokemon?.name, fetchPokemonInfo])

  useEffect(() => {
    if (pokemonDetails?.species?.url) {
      fetchEvolutionChain(pokemonDetails.species.url)
    }
  }, [pokemonDetails?.species?.url, fetchEvolutionChain])

  const VALID_STAT_VARIANTS: BadgeProps['variant'][] = [
    'hp',
    'attack',
    'special-attack',
    'defense',
    'special-defense',
    'speed',
  ]

  if (loadingDetails) {
    return (
      <Container>
        <Wrapper>
          <Heading>
            <Loading />
          </Heading>
        </Wrapper>
      </Container>
    )
  }

  if (!selectedPokemon || !pokemonDetails) {
    return (
      <Container>
        <Wrapper>
          <Heading>No Pokémon selected</Heading>
        </Wrapper>
      </Container>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Heading>
          <div aria-label="Pokémon details">
            <h1>
              {formatPokemonId(selectedPokemon.id)} -{' '}
              {formatPokemonName(selectedPokemon.name)}
            </h1>
            {pokemonDetails.sprites.front_default && (
              <Image
                src={pokemonDetails.sprites.front_default}
                height={80}
                width={80}
                alt={`${formatPokemonName(selectedPokemon.name)} sprite`}
                priority
                className="object-contain"
              />
            )}
          </div>
          <ThemeSwitcher />
        </Heading>

        <main>
          <section>
            <Accent>
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
              />
            </Accent>

            <Accent>
              <h2>Type</h2>
              {pokemonDetails.types.map(({ type: { name } }) => (
                <Badge variant={name as BadgeProps['variant']} key={name}>
                  {name}
                </Badge>
              ))}
            </Accent>

            <div className="row">
              <Accent>
                <h2>Height:</h2> {formatHeight(pokemonDetails.height)}
              </Accent>
              <Accent>
                <h2>Weight: </h2>
                {formatWeight(pokemonDetails.weight)}
              </Accent>
            </div>

            <Accent>
              <div className="stats">
                <h2>Attributes</h2>
                <div className="grid">
                  {pokemonDetails.stats.map(({ stat, base_stat }) => {
                    if (
                      VALID_STAT_VARIANTS.includes(
                        stat.name as BadgeProps['variant'],
                      )
                    ) {
                      return (
                        <Badge
                          variant={stat.name as BadgeProps['variant']}
                          key={stat.name}
                        >
                          {base_stat}{' '}
                          {STAT_NAME_ABBREVIATIONS[stat.name] || stat.name}
                        </Badge>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </Accent>
          </section>

          <section>
            <Accent>
              <div className="evoloution-chain">
                <h2>Evolution Chain</h2>
                <div>
                  {evolutionChain.map((evo) => (
                    <div key={evo.name} className="evolution">
                      <img src={evo.sprite} alt={formatPokemonName(evo.name)} />
                      <p>{formatPokemonName(evo.name)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Accent>

            <Accent>
              <div className="about-pokemon">
                {isLoading ? (
                  <p>Ash is on his way with more data...</p>
                ) : (
                  messages
                    .flatMap((msg) =>
                      msg.parts
                        .filter((part) => part.type === 'text')
                        .map((part) => part.text),
                    )
                    .join(' ')
                    .split(/\n{2,}/)
                    .map((paragraph, idx) => (
                      <div key={idx}>
                        <p>{paragraph.trim()}</p>
                      </div>
                    ))
                )}
              </div>
            </Accent>
          </section>
        </main>
      </Wrapper>
    </Container>
  )
}

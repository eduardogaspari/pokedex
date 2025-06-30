import { gql } from '@apollo/client'

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      types {
        type {
          name
        }
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      species {
        name
        url
      }
      sprites {
        front_default
      }
    }
  }
`

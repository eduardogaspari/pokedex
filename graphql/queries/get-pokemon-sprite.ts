import { gql } from '@apollo/client'

export const GET_POKEMON_SPRITE = gql`
  query GetPokemonSprite($name: String!) {
    pokemon(name: $name) {
      sprites {
        front_default
      }
    }
  }
`

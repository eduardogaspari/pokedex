import { gql } from '@apollo/client'

export const GET_EVOLUTION_CHAIN = gql`
  query GetEvolutionChain($id: String!) {
    evolutionChain(id: $id) {
      response
    }
  }
`

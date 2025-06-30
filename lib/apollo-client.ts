import { HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const httpLink = new HttpLink({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
})

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  })
})

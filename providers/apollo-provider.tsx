'use client'

import { HttpLink, from } from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://graphql-pokeapi.graphcdn.app/',
  })

  return new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  })
}

type ApolloProviderProps = {
  children: React.ReactNode
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}

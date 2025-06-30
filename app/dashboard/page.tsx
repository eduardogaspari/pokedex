import { Page } from '@/components/dashboard'
import { PokemonProvider } from '@/context/pokemon-context'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    return <p>You are not logged in.</p>
  }

  return (
    <PokemonProvider>
      <Page />
    </PokemonProvider>
  )
}

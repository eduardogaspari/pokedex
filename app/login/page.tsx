import { Login } from '@/components/login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getServerSession()

  if (session) {
    redirect('/')
  }

  return <Login />
}

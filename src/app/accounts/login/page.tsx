import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/constants'
import { LoginForm } from '@/components/pages/accounts/login'

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return <LoginForm />
}

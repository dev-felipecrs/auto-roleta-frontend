import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/pages/accounts/login'
import { getSession } from '@/actions'

export default async function Login() {
  const { session } = await getSession()

  if (session) redirect('/dashboard')

  return <LoginForm />
}

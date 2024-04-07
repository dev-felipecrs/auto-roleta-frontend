import { redirect } from 'next/navigation'

import { RegisterForm } from '@/components/pages/accounts/register'
import { getSession } from '@/actions'

export default async function Register() {
  const { session } = await getSession()

  if (session) redirect('/dashboard')

  return <RegisterForm />
}

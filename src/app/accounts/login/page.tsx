import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { LoginForm } from '@/components/pages/accounts/login'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return <LoginForm />
}

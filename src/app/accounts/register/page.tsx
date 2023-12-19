import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { RegisterForm } from '@/components/pages/accounts/register'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Register() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return <RegisterForm />
}

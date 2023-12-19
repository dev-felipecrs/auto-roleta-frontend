import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/constants'
import { ForgotPasswordForm } from '@/components/pages/accounts/forgot-password'

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return <ForgotPasswordForm />
}

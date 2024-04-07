import { redirect } from 'next/navigation'

import { ForgotPasswordForm } from '@/components/pages/accounts/forgot-password'
import { getSession } from '@/actions'

export default async function ForgotPassword() {
  const { session } = await getSession()

  if (session) redirect('/dashboard')

  return <ForgotPasswordForm />
}

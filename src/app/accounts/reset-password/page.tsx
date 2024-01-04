import { notFound, redirect } from 'next/navigation'

import { ResetPasswordForm } from '@/components/pages/accounts/reset-password'
import { getSession } from '@/actions'

interface ResetPasswordProps {
  searchParams: {
    token: string
  }
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const { session, user } = await getSession()

  if (session) redirect('/dashboard')

  if (!user) {
    notFound()
  }

  return <ResetPasswordForm email={user.email} token={searchParams.token} />
}

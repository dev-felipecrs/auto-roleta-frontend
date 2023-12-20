import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/prisma'
import { authOptions } from '@/constants'
import { ResetPasswordForm } from '@/components/pages/accounts/reset-password'

interface ResetPasswordProps {
  searchParams: {
    token: string
  }
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  const user = await prisma.user.findUnique({
    where: {
      password_reset_token: searchParams.token,
    },
  })

  if (!user) {
    notFound()
  }

  return <ResetPasswordForm email={user.email} token={searchParams.token} />
}

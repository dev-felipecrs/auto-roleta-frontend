import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/constants'

export default async function NotFound() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  redirect('/accounts/login')
}

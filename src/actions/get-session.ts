'use server'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { isPast } from 'date-fns'

import { authOptions } from '@/constants'
import { getUserByEmail } from '@/actions'

export async function getSession() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return {
      session: null,
    }
  }

  const user = await getUserByEmail(session.user.email!)

  if (!user.licensedUntil || isPast(user.licensedUntil)) {
    redirect('/accounts/logout')
  }

  return { session, user }
}

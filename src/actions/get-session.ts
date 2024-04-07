'use server'
import { getServerSession, Session } from 'next-auth'

import { User } from '@/types'
import { authOptions } from '@/constants'
import { getUserByEmail } from '@/actions'

type Output = {
  session: Session | null
  user: User | null
}

export async function getSession(): Promise<Output> {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return {
      session: null,
      user: null,
    }
  }

  const user = await getUserByEmail(session.user.email!)

  return { session, user }
}

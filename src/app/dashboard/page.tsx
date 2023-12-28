import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { authOptions } from '@/constants'
import { prisma } from '@/config/prisma'
import { Layout } from '@/components/shared'
import { Grid } from '@/components/pages/dashboard'

const getUserByEmail = async (email: string) => {
  'use server'
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      balanceTracks: true,
      bets: true,
      config: true,
      credentials: true,
    },
  })

  return user
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    notFound()
  }

  const user = await getUserByEmail(session.user.email!)

  return (
    <Layout user={user}>
      <Grid user={user!} />
    </Layout>
  )
}

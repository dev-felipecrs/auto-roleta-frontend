import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { authOptions } from '@/constants'
import { Layout } from '@/components/shared'
import { Grid } from '@/components/pages/dashboard'
import { getUserByEmail } from '@/actions'

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

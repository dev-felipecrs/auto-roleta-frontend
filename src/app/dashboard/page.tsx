import { notFound } from 'next/navigation'

import { Layout } from '@/components/shared'
import { Grid } from '@/components/pages/dashboard'
import { getSession } from '@/actions'

export default async function Dashboard() {
  const { user } = await getSession()

  if (!user) {
    notFound()
  }

  return (
    <Layout user={user}>
      <Grid user={user!} />
    </Layout>
  )
}

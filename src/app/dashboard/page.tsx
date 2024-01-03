import { Layout } from '@/components/shared'
import { Grid } from '@/components/pages/dashboard'
import { getSession } from '@/actions'

export default async function Dashboard() {
  const { user } = await getSession()

  return (
    <Layout user={user}>
      <Grid user={user!} />
    </Layout>
  )
}

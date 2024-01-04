import { Layout } from '@/components/shared/Layout'
import { Grid } from '@/components/pages/dashboard'

export default function DashboardLoading() {
  return (
    <Layout user={{} as any}>
      <Grid user={{} as any} isLoading />
    </Layout>
  )
}

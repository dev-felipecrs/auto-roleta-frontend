import { pricing } from '@/constants/pricing'
import { Layout } from '@/components/shared'
import { Plan } from '@/components/pages/plans'
import { getSession } from '@/actions'

export default async function Plans() {
  const { user } = await getSession()

  return (
    <Layout user={user}>
      <div className="mb-4 mt-10 flex flex-wrap items-center justify-center gap-[3.25rem] px-12">
        {Object.entries(pricing).map(([, plan], index) => (
          <Plan key={index} plan={plan} />
        ))}
      </div>
    </Layout>
  )
}

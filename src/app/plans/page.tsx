import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

import { authOptions } from '@/constants'
import { Layout } from '@/components/shared'
import { Plan } from '@/components/pages/plans'
import { getUserByEmail } from '@/actions'

export default async function Plans() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    notFound()
  }

  const user = await getUserByEmail(session.user.email!)

  return (
    <Layout user={user}>
      <div className="mb-4 mt-10 flex flex-wrap items-center justify-center gap-[3.25rem] px-12">
        <Plan
          name="Trial"
          price={0}
          period="mês"
          benefitsIncluded={[
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
          ]}
          benefitsNotIncluded={[
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
          ]}
        />

        <Plan
          name="Mensal"
          price={9.9}
          period="mês"
          benefitsIncluded={[
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
          ]}
          benefitsNotIncluded={['Lorem ipsum dolor']}
          isPopular
        />

        <Plan
          name="Anual"
          price={108.9}
          period="ano"
          benefitsIncluded={[
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
            'Lorem ipsum dolor',
          ]}
          benefitsNotIncluded={[]}
        />
      </div>
    </Layout>
  )
}

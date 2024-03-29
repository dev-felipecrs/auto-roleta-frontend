import { Layout } from '@/components/shared'
import { Plan } from '@/components/pages/plans'
import { getSession } from '@/actions'

export default async function Plans() {
  const { user } = await getSession()

  return (
    <Layout user={user}>
      <div className="mb-4 mt-10 flex flex-wrap items-center justify-center gap-[3.25rem] px-12">
        <Plan
          name="Mensal"
          price={3699}
          period="mês"
          benefitsIncluded={[
            '100% em nuvem',
            'Análises em tempo real',
            'Utilização ilimitada',
            'Histórico de apostas',
            'Suporte',
            'Crie sua Estratégia (em breve)',
            'Validador de Estratégias (em breve)',
          ]}
          benefitsNotIncluded={['Suporte individual']}
          isPopular
        />

        <Plan
          name="Trimestral"
          price={69.99}
          period="trimestre"
          benefitsIncluded={[
            '100% em nuvem',
            'Análises em tempo real',
            'Utilização ilimitada',
            'Histórico de apostas',
            'Suporte Individual',
            'Crie sua Estratégia (em breve)',
            'Validador de Estratégias (em breve)',
          ]}
          benefitsNotIncluded={[]}
        />

        <Plan
          name="Anual"
          price={299.99}
          period="ano"
          benefitsIncluded={[
            '100% em nuvem',
            'Análises em tempo real',
            'Utilização ilimitada',
            'Histórico de apostas',
            'Suporte Individual',
            'Crie sua Estratégia (em breve)',
            'Validador de Estratégias (em breve)',
          ]}
          benefitsNotIncluded={[]}
        />
      </div>
    </Layout>
  )
}

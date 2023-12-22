import { Layout } from '@/components/shared'
import { Card, CurrentBalance, Score } from '@/components/pages/dashboard'

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 px-8 pb-10 pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Card title="Placar">
              <Score />
            </Card>

            <div className="flex gap-4">
              <Card title="Saldo atual">
                <CurrentBalance />
              </Card>

              <Card title="BOT">
                <div></div>
              </Card>
            </div>
          </div>

          <Card title="Rendimento">
            <div></div>
          </Card>
        </div>

        <div className="flex flex-col-reverse gap-4">
          <Card title="Apostas">
            <div></div>
          </Card>

          <Card title="Configurações">
            <div></div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

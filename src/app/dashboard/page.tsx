import { Layout } from '@/components/shared'
import {
  Bets,
  Bot,
  Card,
  CurrentBalance,
  Score,
} from '@/components/pages/dashboard'

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 px-8 pb-10 pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Card title="Placar">
              <Score wins={14} losses={14} assertiveness={50} />
            </Card>

            <div className="flex gap-4">
              <Card title="Saldo atual">
                <CurrentBalance balance={1234.24} />
              </Card>

              <Card title="BOT">
                <Bot status="offline" />
              </Card>
            </div>
          </div>

          <Card title="Rendimento">
            <div></div>
          </Card>
        </div>

        <div className="flex flex-col-reverse gap-4">
          <Card title="Apostas">
            <Bets
              bets={[
                {
                  color: 'red',
                  entry: 100,
                  gains: 100,
                  result: false,
                  time: new Date(),
                },
                {
                  color: 'red',
                  entry: 100,
                  gains: 100,
                  result: false,
                  time: new Date(),
                },
                {
                  color: 'black',
                  entry: 100,
                  gains: 80,
                  result: true,
                  time: new Date(),
                },
              ]}
            />
          </Card>

          <Card title="Configurações">
            <div></div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

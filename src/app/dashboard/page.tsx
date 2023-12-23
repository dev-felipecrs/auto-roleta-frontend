import { Layout } from '@/components/shared'
import {
  Bets,
  Bot,
  Card,
  Configurations,
  CurrentBalance,
  Score,
} from '@/components/pages/dashboard'

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 px-8 pb-10 pt-6 lg:grid-cols-[1fr_20.5rem]">
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

        <div className="flex flex-col gap-4 lg:flex-col-reverse">
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

          <Configurations />
        </div>
      </div>
    </Layout>
  )
}

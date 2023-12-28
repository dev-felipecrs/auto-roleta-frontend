'use client'
import { Layout } from '@/components/shared'
import {
  Bets,
  Bot,
  Card,
  Configurations,
  CurrentBalance,
  Performance,
  Score,
} from '@/components/pages/dashboard'

import { mockUser } from '../user-mock'

export default function Dashboard() {
  const { wins, losses } = mockUser.bets.reduce(
    (acc, bet) => {
      const field = bet.result ? 'wins' : 'losses'

      return {
        ...acc,
        [field]: acc[field] + 1,
      }
    },
    {
      wins: 0,
      losses: 0,
    },
  )
  const assertiveness = ((wins / (wins + losses)) * 100).toFixed(0)

  const isLoading = true

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 px-8 pb-10 pt-6 lg:grid-cols-[1fr,minmax(308px,1fr)] xl:grid-cols-[minmax(39rem,1fr),1fr]">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card title="Placar">
              <Score
                wins={wins}
                losses={losses}
                assertiveness={assertiveness}
                isLoading={isLoading}
              />
            </Card>

            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
              <Card title="Ganhos">
                <CurrentBalance
                  balance={mockUser.balance}
                  isLoading={isLoading}
                />
              </Card>

              <Card title="BOT">
                <Bot status="online" isLoading={isLoading} />
              </Card>
            </div>
          </div>

          <Card title="Rendimento">
            <Performance />
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:flex-col-reverse">
          <Card title="Apostas">
            <Bets bets={mockUser.bets} isLoading={isLoading} />
          </Card>

          <Configurations />
        </div>
      </div>
    </Layout>
  )
}

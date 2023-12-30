'use client'
import { useEffect, useState } from 'react'

import { User } from '@/types'
import {
  Bets,
  Bot,
  Card,
  Configurations,
  CurrentBalance,
  Performance,
  Score,
} from '@/components/pages/dashboard'

interface GridProps {
  user: User | null
  isLoading?: boolean
}

const REQUEST_INTERVAL_IN_MILLISECONDS = 1000 * 5 // 5 seconds

export function Grid({ user: initialUser, isLoading = false }: GridProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isFetching, setIsFetching] = useState(isLoading)

  const { wins, losses } = (user?.bets || []).reduce(
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

  useEffect(() => {
    if (initialUser) {
      const pooling = setInterval(async () => {
        const response = await fetch(`/api/users/${initialUser.userId}`, {
          next: {
            revalidate: 5,
          },
        })
        const data = await response.json()

        setUser(data)
      }, REQUEST_INTERVAL_IN_MILLISECONDS)

      return () => clearInterval(pooling)
    }
  }, [user])

  useEffect(() => {
    if (user?.credentials === null) {
      setIsFetching(true)
    }

    if (user?.credentials?.email && user.credentials.password) {
      setIsFetching(false)
    }
  }, [user?.credentials])

  return (
    <div className="grid grid-cols-1 gap-4 px-8 pb-10 pt-6 lg:grid-cols-[1fr,minmax(308px,1fr)] xl:grid-cols-[minmax(39rem,1fr),1fr]">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card title="Placar">
            <Score
              wins={wins}
              losses={losses}
              assertiveness={assertiveness}
              isLoading={isFetching}
            />
          </Card>

          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
            <Card title="Ganhos">
              <CurrentBalance
                balance={
                  user
                    ? (user.balance || 0) -
                      (user.balanceTracks?.[0]?.value || user.balance || 0)
                    : 0
                }
                isLoading={isFetching}
              />
            </Card>

            <Card title="BOT">
              <Bot status={user?.status || 'offline'} isLoading={isFetching} />
            </Card>
          </div>
        </div>

        <Card title="Rendimento">
          <Performance user={user} />
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:flex-col-reverse">
        {isFetching && (
          <Card title="Apostas">
            <Bets bets={[]} isLoading />
          </Card>
        )}

        {!isFetching && user?.bets && (
          <Card title="Apostas">
            <Bets bets={user.bets || []} isLoading={false} />
          </Card>
        )}

        <Configurations
          user={user}
          setUser={setUser}
          isFetching={isFetching}
          setIsFetching={setIsFetching}
        />
      </div>
    </div>
  )
}

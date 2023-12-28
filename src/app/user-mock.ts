import { add } from 'date-fns'

type User = {
  isActive: boolean
  credentials: {
    email: string
    password: string
  } | null
  config: {
    strategy: 'stragegy-1' | 'stragegy-2'
    entry: number
    gales: number
    stopWin: number
    stopLoss: number
  } | null
  balance: number
  status: string
  bets: Array<{
    color: 'red' | 'black'
    time: Date
    entry: number
    gains: number
    result: boolean
  }>
  balanceTrack: Array<{
    value: number
    time: Date
  }>
  plan: 'trial' | 'basic' | 'premium'
}

export const mockUser: User = {
  isActive: true,
  credentials: {
    email: 'felipecrs32@gmail.com',
    password: 'JohnDoe#123',
  },
  config: {
    strategy: 'stragegy-1',
    entry: 100,
    gales: 100,
    stopWin: 100,
    stopLoss: 100,
  },
  balance: 100,
  status: 'offline',
  bets: [
    {
      color: 'red',
      entry: 100,
      gains: 100,
      result: true,
      time: add(new Date(), {
        minutes: -1,
      }),
    },
    {
      color: 'red',
      entry: 100,
      gains: 100,
      result: true,
      time: add(new Date(), {
        minutes: -3,
      }),
    },
    {
      color: 'black',
      entry: 100,
      gains: 100,
      result: true,
      time: add(new Date(), {
        minutes: -4,
      }),
    },
  ],
  balanceTrack: [{ time: new Date(), value: 100 }],
  plan: 'premium',
}

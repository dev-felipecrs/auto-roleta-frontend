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
  ],
  balanceTrack: [{ time: new Date(), value: 100 }],
  plan: 'premium',
}

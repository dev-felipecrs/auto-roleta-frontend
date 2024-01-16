import { NextResponse } from 'next/server'
import axios from 'axios'

import { prisma } from '@/config/prisma'

// import { API } from '@/server/entities'

// import { faker } from '@faker-js/faker'

// import { STRATEGIES, STRATEGIES_NAMES } from '@/constants'

// const CREDENTIALS = {
//   email: 'felipeteste@gmail.com',
//   password: '123456',
// } as const

export const maxDuration = 120

export async function GET() {
  // const api = new API()

  // const authentication = await api.authenticate(CREDENTIALS)

  // if (!authentication.success) {
  //   return NextResponse.json({ ok: false })
  // }

  // const connected = await api.connect()

  // if (!connected) {
  //   return NextResponse.json({ ok: false })
  // }

  // const strategy = faker.helpers.arrayElement(STRATEGIES_NAMES)
  // const strategy = 'Estratégia Rei Roleta'

  const users = await prisma.user.findMany({
    include: {
      credentials: true,
      config: true,
      bets: true,
      balanceTracks: true,
    },
    where: {
      isActive: true,
      // config: {
      //   strategy,
      // },
    },
  })

  // await api.waitForBetsToOpen()

  // api.disconnect()

  const bets = users.map((user) => {
    return fetch('https://www.autoroleta.com/api/bet', {
      method: 'POST',
      body: JSON.stringify({
        user,
        bet: 'red',
      }),
    })
  })

  await Promise.all(bets)

  console.log({ cron: `operations sent to ${users.length} many users` })

  return NextResponse.json({ ok: true })
}
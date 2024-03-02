import { NextResponse } from 'next/server'

import { Color, User } from '@/types'
import { Bot } from '@/server/entities'
import { prisma } from '@/config/prisma'
import { decrypt } from '@/actions'

async function bet(user: User, bet: Color) {
  console.log({ ref: '/bet', user: user.email })

  user.credentials!.password = await decrypt(user.credentials!.password)

  console.log({ ref: '/ref', decrypted: user.credentials!.password })

  const bot = new Bot(user)

  const connected = await bot.init()

  console.log({ ref: '/ref', connected })

  if (!connected) {
    return false
  }

  await bot.operate({
    color: bet,
  })

  return true
}

export const maxDuration = 300

export async function GET() {
  console.log('cron called')

  const users = await prisma.user.findMany({
    include: {
      credentials: true,
      config: true,
      bets: true,
      balanceTracks: true,
    },
    where: {
      isActive: true,
    },
  })

  console.log('users quantity: ', users.length)

  const bets = users.map((user) => bet(user as User, Color.RED))

  console.log('bets quantity: ', bets.length)

  await Promise.all(bets)

  console.log({ cron: `operations sent to ${users.length} many users` })

  return NextResponse.json({ ok: true })
}

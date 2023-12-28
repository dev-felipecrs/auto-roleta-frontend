import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<{
  include: {
    balanceTracks: true
    bets: true
    config: true
    credentials: true
  }
}>

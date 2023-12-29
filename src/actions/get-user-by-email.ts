'use server'
import { prisma } from '@/config/prisma'

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      balanceTracks: true,
      bets: true,
      config: true,
      credentials: true,
    },
  })

  return user
}

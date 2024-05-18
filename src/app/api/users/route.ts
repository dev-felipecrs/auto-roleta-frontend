import { hash } from 'bcrypt'
import { add } from 'date-fns'

import { prisma } from '@/config/prisma'

export async function POST(request: Request) {
  const data = await request.json()

  const [userFindedByEmail] = await Promise.all([
    prisma.user.findUnique({
      where: {
        email: data.email,
      },
    }),
  ])

  if (userFindedByEmail) {
    return Response.json('E-mail está em uso', {
      status: 409,
    })
  }

  if (data.affilateId) {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        affiliateId: data.affilateId,
      },
    })

    if (!affiliate) {
      await prisma.affiliate.create({
        data: {
          affiliateId: data.affilateId,
          balance: 0,
        },
      })
    }
  }

  const user = await prisma.user.create({
    data: {
      ...data,
      password: await hash(data.password, 8),
      license: 'trial',
      licensedUntil: add(new Date(), {
        days: 1 * 30,
      }),
      betsMade: 0,
    },
  })

  return Response.json(user)
}

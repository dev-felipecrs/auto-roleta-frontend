import { hash } from 'bcrypt'
import { add } from 'date-fns'

import { prisma } from '@/config/prisma'

type RequestData = {
  name: string
  email: string
  password: string
  affiliateId?: string
}

export async function POST(request: Request) {
  const data = (await request.json()) as RequestData

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

  if (data.affiliateId) {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        affiliateId: data.affiliateId,
      },
    })

    if (!affiliate) {
      await prisma.affiliate.create({
        data: {
          affiliateId: data.affiliateId,
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

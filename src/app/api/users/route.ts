import { add } from 'date-fns'
import { hash } from 'bcrypt'

import { prisma } from '@/config/prisma'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  const [userFindedByEmail] = await Promise.all([
    prisma.user.findUnique({
      where: {
        email,
      },
    }),
  ])

  if (userFindedByEmail) {
    return Response.json('E-mail está em uso', {
      status: 409,
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await hash(password, 8),
      license: 'trial',
      licensedUntil: add(new Date(), {
        days: 7,
      }),
    },
  })

  return Response.json(user)
}

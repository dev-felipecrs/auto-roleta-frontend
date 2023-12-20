import { hash } from 'bcrypt'

import { prisma } from '@/prisma'

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
    },
  })

  return Response.json(user)
}

import { hash } from 'bcrypt'

import { prisma } from '@/prisma'

export async function POST(request: Request) {
  const { email, token, password } = await request.json()

  const user = await prisma.user.findUnique({
    where: {
      email,
      password_reset_token: token,
    },
  })

  if (!user) {
    return Response.json('Usuário não encontrado', {
      status: 404,
    })
  }

  const encryptedPassword = await hash(password, 8)

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: encryptedPassword,
      password_reset_token: null,
    },
  })

  return Response.json('', {
    status: 200,
  })
}

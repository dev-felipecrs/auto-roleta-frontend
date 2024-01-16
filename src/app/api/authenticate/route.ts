import { z } from 'zod'

import { API } from '@/server/entities'
import { prisma } from '@/config/prisma'
import { encrypt, getSession } from '@/actions'

const AuthenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  try {
    const { session } = await getSession()

    if (!session?.user?.email) {
      return Response.json('Usuário não tem permissão!', {
        status: 401,
      })
    }

    const api = new API()

    const data = AuthenticateSchema.safeParse(await request.json())

    if (!data.success) {
      return Response.json(data.error, {
        status: 400,
      })
    }

    const [userFoundByBrokerEmail] = await Promise.all([
      prisma.credential.findUnique({
        where: {
          email: data.data.email,
        },
      }),
    ])

    if (userFoundByBrokerEmail) {
      return Response.json('Este e-mail já está em uso!', {
        status: 400,
      })
    }

    const { success, balance } = await api.authenticate({
      email: data.data.email,
      password: data.data.password,
    })

    if (!success) {
      return Response.json(
        'Não foi possível autenticar! Verifique as suas credenciais e tente novamente',
        {
          status: 400,
        },
      )
    }

    const encryptedPassword = await encrypt(data.data.password)

    await prisma.$transaction([
      prisma.credential.deleteMany({
        where: {
          user: {
            email: session.user.email,
          },
        },
      }),
      prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          balance,
          credentials: {
            create: {
              email: data.data.email,
              password: encryptedPassword,
            },
          },
        },
      }),
    ])

    return Response.json(
      {
        balance,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return Response.json(
      'Um erro inesperado ocorreu, tente novamente mais tarde!',
      {
        status: 500,
      },
    )
  }
}

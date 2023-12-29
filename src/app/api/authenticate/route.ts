import { z } from 'zod'
import { getServerSession } from 'next-auth'

import { API } from '@/server/entities'
import { authOptions } from '@/constants'

const AuthenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
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

  console.log({ balance })

  return {
    balance,
  }
}

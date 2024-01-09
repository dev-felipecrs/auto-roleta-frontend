import { z } from 'zod'
import { add } from 'date-fns'

import { prisma } from '@/config/prisma'

const SubscribeSchema = z.object({
  data: z.object({
    customer: z.object({
      name: z.string(),
      email: z.string().email(),
      document: z.object({
        type: z.enum(['cpf']),
        number: z.string(),
      }),
    }),
  }),
})

export async function POST(request: Request) {
  const data = SubscribeSchema.safeParse(await request.json())

  if (!data.success) {
    return Response.json(data.error, {
      status: 400,
    })
  }

  const { customer } = data.data.data

  const user = await prisma.user.findUnique({
    where: {
      email: customer.email,
    },
  })

  if (!user) {
    return Response.json('User not found', {
      status: 404,
    })
  }

  await prisma.user.update({
    where: {
      email: customer.email,
    },
    data: {
      license: 'premium',
      licensedUntil: add(new Date(), {
        months: 1,
      }),
    },
  })

  return Response.json(data, {
    status: 200,
  })
}

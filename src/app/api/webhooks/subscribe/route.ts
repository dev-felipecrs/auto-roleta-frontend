import { z } from 'zod'
import { add } from 'date-fns'

import { pricing } from '@/constants/pricing'
import { prisma } from '@/config/prisma'

// update on oficial version
const SubscribeSchema = z.object({
  data: z.object({
    amount: z.union([z.literal(9700), z.literal(19700), z.literal(49700)]),
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
  const body = await request.json()

  console.log(JSON.stringify(body))

  const data = SubscribeSchema.safeParse(body)

  if (!data.success) {
    return Response.json(data.error, {
      status: 400,
    })
  }

  const { customer, amount } = data.data.data

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

  const price = pricing[amount]

  const months = {
    monthly: 1,
    quarterly: 3,
    annually: 12,
  }[price.recurrency!]

  await prisma.user.update({
    where: {
      email: customer.email,
    },
    data: {
      recurrency: price.recurrency,
      license: price.license,
      licensedUntil: add(new Date(), {
        months,
      }),
    },
  })

  return Response.json(data, {
    status: 200,
  })
}

import { add } from 'date-fns'

import { prisma } from '@/config/prisma'

export async function POST(request: Request) {
  const data = await request.json()

  const customer = await fetch(
    `https://api-sandbox.ezypay.com/v2/billing/customers/${data.data.customerId}`,
  ).then(async (data) => await data.json())

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

  return Response.json('', {
    status: 200,
  })
}

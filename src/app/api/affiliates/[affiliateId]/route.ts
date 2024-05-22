import { z } from 'zod'

import { prisma } from '@/config/prisma'

interface Params {
  params: {
    affiliateId: string
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        affiliateId: params.affiliateId,
      },
      include: {
        users: {
          select: {
            userId: true,
            name: true,
            email: true,
            license: true,
            recurrency: true,
          },
        },
      },
    })

    if (!affiliate) {
      return Response.json('Não existe nenhum afilado com este ID', {
        status: 200,
      })
    }

    return Response.json(affiliate, {
      status: 200,
    })
  } catch (error) {
    return Response.json(
      'Um erro inesperado ocorreu, tente novamente mais tarde!',
      {
        status: 500,
      },
    )
  }
}

const patchSchema = z.object({
  amount: z.coerce.number(),
})

export async function PATCH(request: Request, { params }: Params) {
  try {
    const data = await request.json()

    const payload = patchSchema.safeParse(data)

    if (!payload.success) {
      return Response.json('Os parametros não foram passados corretamentes', {
        status: 400,
      })
    }

    const findAffiliate = await prisma.affiliate.findFirst({
      where: {
        affiliateId: params.affiliateId,
      },
    })

    if (!findAffiliate) {
      return Response.json('Não existe nenhum afilado com este ID', {
        status: 200,
      })
    }

    const { amount } = payload.data

    const updateAffiliate = await prisma.affiliate.update({
      where: {
        affiliateId: params.affiliateId,
      },
      data: {
        balance: Number(findAffiliate.balance - amount),
      },
    })

    return Response.json(updateAffiliate, {
      status: 204,
    })
  } catch (error) {
    return Response.json(
      'Um erro inesperado ocorreu, tente novamente mais tarde!',
      {
        status: 500,
      },
    )
  }
}

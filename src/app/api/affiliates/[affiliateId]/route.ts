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
        users: true,
      },
    })

    if (!affiliate) {
      return Response.json('Não existe nenhum afilado com este ID', {
        status: 404,
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

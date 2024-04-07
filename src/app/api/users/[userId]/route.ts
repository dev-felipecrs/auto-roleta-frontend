import { z } from 'zod'
import { Prisma } from '@prisma/client'

import { STRATEGIES_NAMES } from '@/constants'
import { prisma } from '@/config/prisma'
import { getSession } from '@/actions'

interface Params {
  params: {
    userId: string
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    // const { session } = await getSession()

    // if (!session) {
    //   return Response.json('Usuário não tem permissão!', {
    //     status: 401,
    //   })
    // }

    const user = await prisma.user.findUnique({
      where: {
        userId: params.userId,
      },
      include: {
        balanceTracks: true,
        bets: true,
        config: true,
        credentials: true,
      },
    })

    if (!user) {
      return Response.json('Usuário não encontrado!', {
        status: 404,
      })
    }

    return Response.json(user, {
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

const UpdateUserSchema = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  credentials: z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .nullable()
    .optional(),
  config: z
    .object({
      strategy: z.enum(STRATEGIES_NAMES),
      entry: z.number(),
      gales: z.number(),
      stopWin: z.number(),
      stopLoss: z.number(),
    })
    .nullable()
    .optional(),
  balance: z.number().nullable().optional(),
  status: z.enum(['online', 'offline']).nullable().optional(),
  bets: z
    .array(
      z.object({
        color: z.enum(['red', 'black']),
        time: z.string().transform((value) => new Date(value)),
        entry: z.number(),
        gains: z.number(),
        result: z.boolean(),
      }),
    )
    .nullable()
    .optional(),
  balanceTracks: z
    .array(
      z.object({
        value: z.number(),
        time: z.string().transform((value) => new Date(value)),
      }),
    )
    .nullable()
    .optional(),
})

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { session } = await getSession()

    if (!session) {
      return Response.json('Usuário não tem permissão!', {
        status: 401,
      })
    }

    const userExists = await prisma.user.findUnique({
      where: {
        userId: params.userId,
      },
    })

    if (!userExists) {
      return Response.json('Usuário não encontrado!', {
        status: 404,
      })
    }

    const data = UpdateUserSchema.safeParse(await request.json())

    if (!data.success) {
      return Response.json(data.error, {
        status: 400,
      })
    }

    let dataToUpdate: Prisma.UserUpdateInput = {
      name: data.data.name,
      isActive: data.data.isActive,
      balance: data.data.balance,
      status: data.data.status,
    }

    if (data.data.credentials || data.data.credentials === null) {
      if (data.data.credentials === null) {
        await prisma.credential.delete({
          where: {
            userId: params.userId,
          },
        })
      } else {
        dataToUpdate = {
          ...dataToUpdate,
          credentials: {
            upsert: {
              where: { userId: params.userId },
              create: {
                email: data.data.credentials.email,
                password: data.data.credentials.email,
              },
              update: {
                email: data.data.credentials.email,
                password: data.data.credentials.email,
              },
            },
          },
        }
      }
    }

    if (data.data.config || data.data.config === null) {
      if (data.data.config === null) {
        await prisma.config.delete({
          where: {
            userId: params.userId,
          },
        })
      } else {
        dataToUpdate = {
          ...dataToUpdate,
          config: {
            upsert: {
              where: { userId: params.userId },
              create: {
                strategy: data.data.config.strategy,
                entry: data.data.config.entry,
                gales: data.data.config.gales,
                stopWin: data.data.config.stopWin,
                stopLoss: data.data.config.stopLoss,
              },
              update: {
                strategy: data.data.config.strategy,
                entry: data.data.config.entry,
                gales: data.data.config.gales,
                stopWin: data.data.config.stopWin,
                stopLoss: data.data.config.stopLoss,
              },
            },
          },
        }
      }
    }

    if (data.data.bets || data.data.bets === null) {
      if (data.data.bets === null) {
        await prisma.bet.deleteMany({
          where: {
            userId: params.userId,
          },
        })
      } else {
        await prisma.$transaction([
          prisma.bet.deleteMany(),
          prisma.bet.createMany({
            data: data.data.bets.map((bet) => ({
              userId: params.userId,
              color: bet.color,
              time: new Date(bet.time),
              entry: bet.entry,
              gains: bet.gains,
              result: bet.result,
            })),
          }),
        ])
      }
    }

    if (data.data.balanceTracks || data.data.balanceTracks === null) {
      if (data.data.balanceTracks === null) {
        await prisma.balanceTrack.deleteMany({
          where: {
            userId: params.userId,
          },
        })
      } else {
        await prisma.$transaction([
          prisma.balanceTrack.deleteMany(),
          prisma.balanceTrack.createMany({
            data: data.data.balanceTracks.map((balanceTrack) => ({
              userId: params.userId,
              value: balanceTrack.value,
              time: new Date(balanceTrack.time),
            })),
          }),
        ])
      }
    }

    const user = await prisma.user.update({
      where: {
        userId: params.userId,
      },
      data: dataToUpdate,
      include: {
        balanceTracks: true,
        bets: true,
        config: true,
        credentials: true,
      },
    })

    return Response.json(user, {
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

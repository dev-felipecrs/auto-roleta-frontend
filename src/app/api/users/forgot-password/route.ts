import { Resend } from 'resend'
import crypto from 'node:crypto'

import { prisma } from '@/prisma'
import { ForgotPasswordTemplate } from '@/components/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return Response.json('Usuário não encontrado', {
        status: 404,
      })
    }

    const password_reset_token = crypto.randomUUID()

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password_reset_token,
      },
    })

    const link = `${process.env.APP_URL}/accounts/reset-password?token=${password_reset_token}`

    const result = await resend.emails.send({
      from: 'dev@kepler-digital.dev',
      to: email,
      subject: 'Redefinir senha',
      react: ForgotPasswordTemplate({ link }),
    })

    console.log({ result })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return Response.json('', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return Response.json('Internal Server Error', {
      status: 500,
    })
  }
}

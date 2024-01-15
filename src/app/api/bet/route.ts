import { Bot } from '@/server/entities'
import { decrypt } from '@/actions'

export const maxDuration = 180

export async function POST(request: Request) {
  const data = await request.json()

  const user = data.user

  console.log({ ref: '/bet', user: user.email })

  user.credentials.password = await decrypt(user.credentials.password)

  console.log({ ref: '/ref', decrypted: user.credentials.password })

  const bot = new Bot(data.user)

  const connected = await bot.init()

  console.log({ ref: '/ref', connected })

  if (!connected) {
    return Response.json('invalid credentials', { status: 200 })
  }

  await bot.operate({
    color: data.bet,
  })

  return Response.json('bet performed successfully', {
    status: 200,
  })
}

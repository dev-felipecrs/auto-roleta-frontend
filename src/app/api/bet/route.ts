import { Bot } from '@/server/entities'
import { decrypt } from '@/actions'

export async function POST(request: Request) {
  const data = await request.json()

  const user = data.user

  user.credentials.password = await decrypt(user.credentials.password)

  const bot = new Bot(data.user)

  const connected = await bot.init()

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

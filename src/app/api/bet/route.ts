import { API, Bot } from '@/server/entities'

export async function POST(request: Request) {
  const data = await request.json()

  const api = new API()
  const bot = new Bot(data.user)

  await api.authenticate({
    email: data.user.credentials.email,
    password: data.user.credentials.password,
  })

  await bot.init()

  await bot.operate({
    color: data.bet,
  })

  return Response.json('', {
    status: 200,
  })
}

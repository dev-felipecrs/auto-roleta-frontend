export async function POST(request: Request) {
  const user = await request.json()

  console.log({ user })

  return Response.json(user, {
    status: 200,
  })
}

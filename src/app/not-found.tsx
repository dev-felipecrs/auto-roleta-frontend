import { redirect } from 'next/navigation'

import { getSession } from '@/actions'

export default async function NotFound() {
  const { session } = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  redirect('/accounts/login')
}

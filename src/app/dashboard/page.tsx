import { notFound } from 'next/navigation'

import { getSession } from '@/actions'

import { Helper } from './helper'

export default async function Dashboard() {
  const { user } = await getSession()

  if (!user) {
    notFound()
  }

  return <Helper initialUser={user} />
}

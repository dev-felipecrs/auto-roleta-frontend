'use client'

import { useEffect, useState } from 'react'

import { isPast } from 'date-fns/isPast'

import { User } from '@/types'
import { Layout } from '@/components/shared'
import { Grid } from '@/components/pages/dashboard'

const REQUEST_INTERVAL_IN_MILLISECONDS = 1000 * 5 // 5 seconds

interface HelperProps {
  initialUser: User | null
}

export function Helper({ initialUser }: HelperProps) {
  const isLicenseExpired = initialUser
    ? !initialUser.licensedUntil || isPast(new Date(initialUser.licensedUntil))
    : false

  const [user, setUser] = useState<User | null>(initialUser)
  const [isFetching, setIsFetching] = useState(isLicenseExpired)

  useEffect(() => {
    if (initialUser) {
      const pooling = setInterval(async () => {
        if (isFetching) {
          return
        }

        const response = await fetch(`/api/users/${initialUser.userId}`, {
          next: {
            revalidate: 5,
          },
        })
        const data = await response.json()

        setUser(data)
      }, REQUEST_INTERVAL_IN_MILLISECONDS)

      return () => clearInterval(pooling)
    }
  }, [user, isFetching])

  useEffect(() => {
    if (user?.credentials === null) {
      setIsFetching(true)
    }

    if (user?.credentials?.email && user.credentials.password) {
      setIsFetching(false)
    }
  }, [user?.credentials])

  return (
    <Layout user={user}>
      <Grid
        user={user}
        setUser={setUser}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
      />
    </Layout>
  )
}

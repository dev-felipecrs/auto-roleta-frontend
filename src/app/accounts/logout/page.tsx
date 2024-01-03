'use client'
import { useEffect } from 'react'

import { logout } from '@/actions'

export default function Logout() {
  useEffect(() => {
    const main = async () => {
      await logout()
    }

    main()
  }, [])

  return <></>
}

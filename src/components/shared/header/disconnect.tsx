'use client'

import { useState } from 'react'

import { User } from '@/types'
import { toast } from '@/config/toast'
import { Button } from '@/components/shared'

interface DisconnectProps {
  user: User | null
}

export function Disconnect({ user }: DisconnectProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      if (user) {
        await fetch(`/api/users/${user.userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            credentials: null,
          }),
        })
      }
    } catch (error) {
      toast.error('Algum erro inesperado ocorreu! Tente novamente mais tarde!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      className="h-10 w-[102px] text-xs"
      onClick={handleDisconnect}
      isLoading={isLoading}
    >
      Desconectar
    </Button>
  )
}

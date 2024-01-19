'use client'
import { useEffect } from 'react'

import { Crisp } from 'crisp-sdk-web'

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure(String(process.env.CRISP_CHAT_SECRET))
  })

  return null
}

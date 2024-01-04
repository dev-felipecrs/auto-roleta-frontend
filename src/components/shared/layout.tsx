'use client'
import { useState } from 'react'

import { User } from '@/types'
import { Sidebar } from '@/components/shared/Sidebar'
import { Header } from '@/components/shared/Header'

interface LayoutProps {
  user: User | null
  children: React.ReactNode
}

export function Layout({ user, children }: LayoutProps) {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false)

  const handleSidebarVisibilityToggle = () => {
    setSidebarIsVisible(!sidebarIsVisible)
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header
        user={user}
        sidebarIsVisible={sidebarIsVisible}
        handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden overflow-y-auto sm:block">
          <Sidebar user={user} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

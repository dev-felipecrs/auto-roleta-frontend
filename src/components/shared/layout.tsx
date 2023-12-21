'use client'
import { useState } from 'react'

import { Header, Sidebar } from '@/components/shared'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false)

  const handleSidebarVisibilityToggle = () => {
    setSidebarIsVisible(!sidebarIsVisible)
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header
        sidebarIsVisible={sidebarIsVisible}
        handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden overflow-y-auto sm:block">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

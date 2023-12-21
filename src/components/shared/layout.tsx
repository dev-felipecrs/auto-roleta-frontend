'use client'
import { useState } from 'react'

import { Header, Sidebar } from '@/components/shared'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false)

  const handleSidebarVisibilityToggle = () => {
    setSidebarIsVisible((visibility) => !visibility)
  }

  return (
    <>
      <Header
        sidebarIsVisible={sidebarIsVisible}
        handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
      />
      <main className="grid grid-cols-[auto,1fr]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="h-screen">{children}</div>
      </main>
    </>
  )
}

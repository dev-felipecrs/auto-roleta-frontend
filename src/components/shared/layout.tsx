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
    <>
      <main className="flex h-full min-h-screen w-full flex-col">
        <Header
          sidebarIsVisible={sidebarIsVisible}
          handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
        />
        <div className="grid h-full w-full grid-cols-[auto_1fr]">
          <div className="top-0 hidden h-full sm:block">
            <Sidebar />
          </div>
          <div className="max-h-device-height-without-header overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

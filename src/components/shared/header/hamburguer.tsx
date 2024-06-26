'use client'
import Image from 'next/image'

import { User } from '@/types'
import { Sidebar } from '@/components/shared'

interface HamburguerProps {
  user: User | null
  sidebarIsVisible?: boolean
  handleSidebarVisibilityToggle?(): void
}

export function Hamburguer({
  user,
  sidebarIsVisible,
  handleSidebarVisibilityToggle,
}: HamburguerProps) {
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center transition-all hover:opacity-75 sm:hidden"
        onClick={handleSidebarVisibilityToggle}
      >
        <Image
          src="/icons/list.svg"
          alt="Abrir sidebar"
          width={24}
          height={24}
        />
      </button>

      {sidebarIsVisible && (
        <div
          className=" fixed left-0 top-0 z-20 h-screen w-screen bg-black bg-opacity-70 sm:hidden"
          onClick={handleSidebarVisibilityToggle}
        >
          <Sidebar
            user={user}
            handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
          />
        </div>
      )}
    </>
  )
}

import Image from 'next/image'

import { Hamburguer } from './hamburguer'

interface HeaderProps {
  sidebarIsVisible?: boolean
  handleSidebarVisibilityToggle?(): void
}

export function Header({
  sidebarIsVisible,
  handleSidebarVisibilityToggle,
}: HeaderProps) {
  return (
    <header className="flex h-20 w-full items-center border-b-[1px] border-[#ffffff26] bg-[#1c1d21] px-8 py-4">
      <div className="flex items-center gap-4 lg:gap-0">
        <Hamburguer
          sidebarIsVisible={sidebarIsVisible}
          handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
        />

        <div className="relative h-6 w-32 lg:h-12 lg:w-40">
          <Image src="/images/shared/logo.svg" alt="Auto Roleta" fill />
        </div>
      </div>
    </header>
  )
}

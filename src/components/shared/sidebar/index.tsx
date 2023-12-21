'use client'
import { Category, Chart, Discount, Logout } from 'react-iconly'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

import { Button } from '@/components/shared'

import { ActiveLink } from './active-link'

interface SidebarProps {
  handleSidebarVisibilityToggle?(): void
}

export function Sidebar({ handleSidebarVisibilityToggle }: SidebarProps) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <aside className="grid h-full w-56 grid-rows-[auto_1fr_auto] border-r-[1px] border-r-[#ffffff26] bg-[#17181d] pt-6">
      <header className="mx-auto mb-12 flex items-center gap-4 sm:hidden">
        <button
          type="button"
          className="flex items-center justify-center transition-all hover:opacity-75"
          onClick={handleSidebarVisibilityToggle}
        >
          <Image
            src="/icons/list.svg"
            alt="Abrir sidebar"
            width={24}
            height={24}
          />
        </button>

        <div className="relative h-6 w-32">
          <Image src="/images/shared/logo.svg" alt="Auto Roleta" fill />
        </div>
      </header>

      <div className="mb-[38px] px-8">
        <Button className="text-xs">Contatar Suporte</Button>
      </div>

      <nav className="h-full">
        <ActiveLink
          href="/dashboard"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
        >
          <Category set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Dashboard</span>
        </ActiveLink>

        <ActiveLink
          href="/analysis"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
          disabled
        >
          <Chart set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Análises</span>
        </ActiveLink>

        <ActiveLink
          href="/plans"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
        >
          <Discount set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Planos</span>
        </ActiveLink>
      </nav>

      <footer className="mb-5">
        <button
          type="button"
          className="flex h-10 items-center gap-4 pl-[26px] transition-all hover:opacity-75 active:brightness-90"
          onClick={handleLogout}
        >
          <Logout set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Logout</span>
        </button>
      </footer>
    </aside>
  )
}

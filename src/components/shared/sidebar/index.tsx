'use client'
import { Category, Chart, Discount, Logout } from 'react-iconly'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/shared'

import { ActiveLink } from './active-link'

export function Sidebar() {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <aside className="grid h-full w-56 grid-rows-[auto_1fr_auto] border-r-[1px] border-r-[#ffffff26] bg-[#17181d] pt-6">
      <header className="mb-[38px] px-8">
        <Button className="text-xs">Contatar Suporte</Button>
      </header>

      <nav className="h-full">
        <ActiveLink
          href="/dashboard"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
        >
          <Category set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Dashboard</span>
        </ActiveLink>

        <ActiveLink
          href="/dashboard/analysis"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
          disabled
        >
          <Chart set="bold" primaryColor="#383c48" />
          <span className="text-sm font-medium text-[#c6c6c7]">Análises</span>
        </ActiveLink>

        <ActiveLink
          href="/dashboard/plans"
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

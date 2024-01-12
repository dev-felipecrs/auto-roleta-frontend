'use client'
import { Category, Chart, Discount, Logout } from 'react-iconly'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

import { User } from '@/types'
import { Balance, Button } from '@/components/shared'

import { ActiveLink } from './active-link'

interface SidebarProps {
  user: User | null
  handleSidebarVisibilityToggle?(): void
}

export function Sidebar({ user, handleSidebarVisibilityToggle }: SidebarProps) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <aside className="grid h-full w-56 animate-fade-in-left grid-rows-[5rem_auto_auto_1fr_auto] border-r-[1px] border-r-[#ffffff26] bg-[#17181d] pt-6 sm:animate-none sm:grid-rows-[auto_1fr_auto]">
      <header className="mb-12 flex items-center gap-4 pl-8 sm:hidden">
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

      {user && (
        <Balance
          balance={user.balance || 0}
          containerClassname="mb-6 justify-center sm:hidden"
        />
      )}

      <div className="mb-[38px] px-8">
        <Link href="#">
          <Button className="text-xs">Contatar Suporte</Button>
        </Link>
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
          href="/ranking"
          className="flex h-[52px] items-center gap-4 pl-[26px]"
          disabled
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.7336 9.59631C16.4419 10.8758 15.7719 11.9931 14.8538 12.8219L15.8445 16.9583C16.3429 19.0391 14.2652 20.6389 12.5194 19.7481L10.6533 18.7959C10.2423 18.5862 9.75768 18.5862 9.34671 18.7959L7.48056 19.7481C5.73478 20.6389 3.65709 19.0391 4.15548 16.9583L5.14624 12.8219C4.22814 11.9931 3.5581 10.8758 3.26642 9.59631C2.91119 8.03807 2.91119 6.41607 3.26642 4.85783C3.7878 2.57069 5.51808 0.802107 7.71306 0.272315C9.21736 -0.0907714 10.7826 -0.0907717 12.2869 0.272315C14.4819 0.802108 16.2122 2.5707 16.7336 4.85784C17.0888 6.41607 17.0888 8.03807 16.7336 9.59631ZM12.2869 14.1818C12.3555 14.1653 12.4237 14.1475 12.4913 14.1286C12.8674 14.0232 13.2286 13.8813 13.5712 13.7065L14.441 17.3378C14.6075 18.0331 13.8901 18.7405 13.1464 18.3611L11.2803 17.4089C10.473 16.997 9.52702 16.997 8.71973 17.4089L6.85358 18.3611C6.10994 18.7405 5.39248 18.0331 5.55903 17.3378L6.4288 13.7065C6.75116 13.871 7.09005 14.0064 7.44228 14.1095C7.5317 14.1357 7.62198 14.1598 7.71306 14.1818C9.21736 14.5449 10.7826 14.5449 12.2869 14.1818Z"
              fill="#383C48"
            />
          </svg>
          <span className="text-sm font-medium text-[#c6c6c7]">Ranking</span>
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
          <span className="text-sm font-medium text-[#c6c6c7]">Sair</span>
        </button>
      </footer>
    </aside>
  )
}

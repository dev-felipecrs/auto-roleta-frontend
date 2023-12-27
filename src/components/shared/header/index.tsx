import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'

import { formatNumber } from '@/utils'
import { mockUser } from '@/app/user-mock'

import { Plan } from './plan'
import { Hamburguer } from './hamburguer'
import { ConnectWithBroker } from './connect-with-broker'

interface HeaderProps {
  simpleVersion?: boolean
  sidebarIsVisible?: boolean
  handleSidebarVisibilityToggle?(): void
}

export function Header({
  simpleVersion = false,
  sidebarIsVisible,
  handleSidebarVisibilityToggle,
}: HeaderProps) {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b-[1px] border-[#ffffff26] bg-[#1c1d21] px-7 py-4">
      <div
        className={cn('flex items-center gap-[4.25rem]', {
          'flex-1 justify-center sm:flex-none sm:justify-normal': simpleVersion,
        })}
      >
        <div className="flex items-center gap-4 sm:gap-0">
          {!simpleVersion && (
            <Hamburguer
              sidebarIsVisible={sidebarIsVisible}
              handleSidebarVisibilityToggle={handleSidebarVisibilityToggle}
            />
          )}

          <Link
            href="/dashboard"
            className="relative block h-6 w-32 sm:h-12 sm:w-40"
          >
            <Image src="/images/shared/logo.svg" alt="Auto Roleta" fill />
          </Link>
        </div>

        {!simpleVersion && (
          <div className="hidden items-center gap-2 sm:flex">
            <Image
              src="/icons/currency.svg"
              alt="Saldo"
              width={20}
              height={20}
            />
            <span className="text-sm font-light text-white">
              R${' '}
              <span className="font-semibold">
                {formatNumber(mockUser.balance)}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-7">
        <Plan plan={mockUser.plan} />
        <ConnectWithBroker />
      </div>
    </header>
  )
}

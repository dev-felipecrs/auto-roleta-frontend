import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import { formatNumber } from '@/utils'

interface BalanceProps {
  balance: number
  containerClassname?: string
}

export function Balance({ balance, containerClassname = '' }: BalanceProps) {
  return (
    <div className={twMerge('flex items-center gap-2', containerClassname)}>
      <Image src="/icons/currency.svg" alt="Saldo" width={20} height={20} />
      <span className="text-sm font-light text-white">
        R$ <span className="font-semibold">{formatNumber(balance)}</span>
      </span>
    </div>
  )
}

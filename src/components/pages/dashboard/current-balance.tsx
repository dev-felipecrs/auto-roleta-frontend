import cn from 'classnames'

import { formatNumber } from '@/utils'
import { Skeleton } from '@/components/shared/Skeleton'

interface CurrentBalanceProps {
  balance: number
  isLoading: boolean
}

export function CurrentBalance({ balance, isLoading }: CurrentBalanceProps) {
  return (
    <div className="flex flex-col gap-1">
      {isLoading && (
        <>
          <Skeleton width="64px" height="14px" />
          <Skeleton width="88px" height="12px" />
        </>
      )}

      {!isLoading && (
        <>
          <strong
            className={cn('whitespace-nowrap text-base font-medium', {
              'text-white': balance === 0,
              'text-[#04D47C]': balance > 0,
              'text-[#E51E3E]': balance < 0,
            })}
          >
            {balance > 0 && '+ '}
            {balance < 0 && '- '}
            R${' '}
            {formatNumber(balance >= 0 ? balance : balance + balance * -1 * 2)}
          </strong>
          <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
            Total
          </span>
        </>
      )}
    </div>
  )
}

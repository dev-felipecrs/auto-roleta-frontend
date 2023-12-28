import { formatNumber } from '@/utils'
import { Skeleton } from '@/components/shared'

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
          <strong className="whitespace-nowrap text-base font-medium text-[#04D47C]">
            + R$ {formatNumber(balance)}
          </strong>
          <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
            Total
          </span>
        </>
      )}
    </div>
  )
}

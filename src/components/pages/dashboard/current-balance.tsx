import { formatNumber } from '@/utils'

interface CurrentBalanceProps {
  balance: number
}

export function CurrentBalance({ balance }: CurrentBalanceProps) {
  return (
    <div className="flex flex-col gap-1">
      <strong className="whitespace-nowrap text-base font-medium text-[#04D47C]">
        + R$ {formatNumber(balance)}
      </strong>
      <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
        Total
      </span>
    </div>
  )
}

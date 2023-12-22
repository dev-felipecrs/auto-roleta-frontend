import { formatNumber } from '@/utils'

export function CurrentBalance() {
  return (
    <div className="flex flex-col gap-1">
      <strong className="whitespace-nowrap text-base font-medium text-[#04D47C]">
        + R$ {formatNumber(1234.24)}
      </strong>
      <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
        Total
      </span>
    </div>
  )
}

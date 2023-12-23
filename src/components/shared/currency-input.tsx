import { twMerge } from 'tailwind-merge'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CurrencyInputProps extends NumericFormatProps {
  label: string
  error?: string
  containerClassname?: string
}

export function CurrencyInput({
  label,
  error,
  containerClassname = '',
  ...rest
}: CurrencyInputProps) {
  return (
    <label className={twMerge('flex flex-col gap-2', containerClassname)}>
      <span className="text-[10px] font-medium text-white">{label}</span>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        placeholder="R$ 00,00"
        className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        {...rest}
      />
      {error && <span className="mt-2 text-xs text-[#e51e3e]">{error}</span>}
    </label>
  )
}

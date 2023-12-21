import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftElement: JSX.Element
  rightElement?: JSX.Element
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftElement, rightElement, error, type = 'text', ...rest }, ref) => {
    return (
      <label className="w-full">
        <div className="relative w-full">
          <div className="absolute left-4 top-1/2 z-10 flex h-6 w-6 translate-y-[-50%] items-center justify-center">
            {leftElement}
          </div>
          <input
            type={type}
            className="h-[3.25rem] w-full rounded-lg border-0 bg-[#1e1e1e] py-2 pl-14 pr-12 text-white transition-all placeholder:text-[#abafB1] hover:opacity-75 focus:ring-[#e51e3e]"
            ref={ref}
            {...rest}
          />
          <div className="absolute right-4 top-1/2 z-10 flex h-6 w-6 translate-y-[-50%] items-center justify-center">
            {rightElement}
          </div>
        </div>
        {error && <span className="mt-2 text-xs text-[#e51e3e]">{error}</span>}
      </label>
    )
  },
)

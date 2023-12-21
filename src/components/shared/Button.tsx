import { ButtonHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
}

export function Button({
  children,
  isLoading = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={rest.disabled || isLoading}
      className={twMerge(
        'flex h-[50px] w-full items-center justify-center rounded-md bg-[#e51e3e] text-base font-semibold text-white transition-all hover:opacity-75 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50',
        rest.className,
      )}
    >
      {isLoading && (
        <svg
          className="h-5 w-5 animate-[spin_500ms_linear_infinite] text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && children}
    </button>
  )
}

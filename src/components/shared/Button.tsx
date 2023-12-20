import { ButtonHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={twMerge(
        'flex h-[50px] w-full items-center justify-center rounded-md bg-[#e51e3e] text-base font-semibold text-white transition-all hover:opacity-75 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50',
        rest.className,
      )}
    >
      {children}
    </button>
  )
}

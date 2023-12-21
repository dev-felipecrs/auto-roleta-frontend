'use client'
import { useMemo } from 'react'

import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import cn from 'classnames'

interface ActiveLinkProps extends LinkProps {
  href: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export function ActiveLink({
  href,
  disabled = false,
  children,
  className = '',
  ...rest
}: ActiveLinkProps) {
  const pathname = usePathname()

  const isActive = useMemo(() => {
    const hasSlash = href[href.length - 1] === '/'
    const newHref = !hasSlash ? href + '/' : href

    return pathname + '/' === newHref
  }, [href, pathname])

  console.log({ disabled })

  return (
    <Link
      href={href}
      className={
        isActive
          ? twMerge(
              className,
              'relative bg-[#1c1d21] after:absolute after:right-0 after:top-0 after:h-full after:w-[3px] after:rounded-sm after:bg-[#e51e3e] disabled:cursor-not-allowed disabled:opacity-50',
            )
          : cn(className, { 'cursor-not-allowed opacity-50': disabled })
      }
      {...rest}
    >
      {children}
    </Link>
  )
}

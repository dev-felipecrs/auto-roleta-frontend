'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import cn from 'classnames'
import * as RadixSelect from '@radix-ui/react-select'

import { SelectItemProps } from '@/models'

interface SelectProps extends RadixSelect.SelectProps {
  label: string
  placeholder: string
  items: SelectItemProps[]
  contentWidth?: string
  containerClassname?: string
  error?: string
}

export function Select({
  label,
  placeholder,
  items,
  containerClassname = '',
  error = '',
  ...rest
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [contentWidth, setContentWidth] = useState(
    triggerRef.current?.clientWidth,
  )

  const isDisabled = rest.disabled || false

  const getContentWidth = useCallback(() => {
    const width = triggerRef.current?.clientWidth

    if (!width) {
      return getContentWidth()
    }

    if (contentWidth !== width) {
      setContentWidth(width)
    }
  }, [contentWidth])

  useEffect(() => {
    getContentWidth()
    window.addEventListener('resize', getContentWidth)
  }, [getContentWidth])

  return (
    <label className={twMerge('flex flex-col gap-2', containerClassname)}>
      <span className="text-[10px] font-medium text-white">{label}</span>

      <RadixSelect.Root {...rest}>
        <RadixSelect.Trigger
          className={cn(
            'flex h-[3.25rem] w-full items-center justify-between rounded-lg bg-[#1e1e1e] px-4 py-2 text-sm text-[#A6A8B1] focus-visible:outline-none [&:not([data-placeholder])]:text-white',
            {
              'opacity-50': isDisabled,
            },
          )}
          ref={triggerRef}
        >
          <RadixSelect.Value placeholder={placeholder} />

          <RadixSelect.Icon className="flex items-center justify-center">
            <Image
              src="/icons/chevron-down.svg"
              alt="Escolher"
              width={24}
              height={24}
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className="rounded-md bg-[#1e1e1e] shadow-md shadow-zinc-900"
            position="popper"
            sideOffset={8}
            style={{ width: contentWidth }}
          >
            <RadixSelect.Group>
              {items.map((item, index) => (
                <RadixSelect.Item
                  key={index}
                  value={item.value}
                  className="cursor-pointer px-6 py-4 text-white focus-visible:outline-none"
                >
                  <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {error && <span className="mt-2 text-xs text-[#e51e3e]">{error}</span>}
    </label>
  )
}

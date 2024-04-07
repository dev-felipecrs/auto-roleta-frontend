'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '.'

export function TrialLicenseExpiredDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(true)
  const router = useRouter()

  const onOpenChange = (value: boolean, shouldClose?: boolean) => {
    shouldClose && setDialogIsOpen(value)
  }

  const handleClick = () => {
    onOpenChange(false, true)
    router.push('/#plans')
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          <header className="flex w-80 flex-col items-center">
            <strong className="mt-6 text-center text-xl font-medium text-white">
              Licença gratuita expirada
            </strong>
            <span className="mt-2 text-center text-sm text-[#8B8D97] sm:max-w-[24rem]">
              Você recebeu um desconto exclusivo, clique no botão abaixo
            </span>
          </header>

          <Button className="mt-10 text-xs" onClick={handleClick}>
            Ver planos
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

'use client'
import * as Dialog from '@radix-ui/react-dialog'

import { toast } from '@/config/toast'
import { Button } from '@/components/shared'

export function PlanSubscribe() {
  const handleCopyPIXCode = async () => {
    await navigator.clipboard.writeText('pix code')
    toast.success('Código copiado com sucesso')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="w-56">Assinar</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          <div className="px-6">
            <div className="mx-auto flex h-64 w-64 items-center justify-center bg-red-500"></div>

            <div className="mt-10 flex items-center gap-6">
              <input
                type="text"
                value="pix copia e cola, código vai aqui"
                disabled
                className="w-64 border-0 border-b border-white bg-transparent px-0 text-white"
              />
              <Button onClick={handleCopyPIXCode} className="w-36">
                Copiar
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

'use client'
import { useRef, useState } from 'react'

import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'

import { toast } from '@/config/toast'
import { Button } from '@/components/shared'

export function PlanSubscribe() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pixIsExperired = useRef(false)

  const handleCopyPIXCode = async () => {
    await navigator.clipboard.writeText('pix code')
    toast.success('Código copiado com sucesso')
  }

  const handleOpen = (isOpen: boolean) => {
    const createTransaction = async () => {
      setIsLoading(true)
      try {
        const transaction = await axios.post(
          'https://api.pay2m.com.br/v1/transactions',
          {
            customer: {
              name: 'name',
              email: 'email@example.com',
            },
            amount: 50,
            paymentMethod: 'pix',
            items: [
              {
                tangible: false,
                title: 'Plano',
                unitPrice: 500,
                quantity: 1,
              },
            ],
            postbackUrl: 'https://www.autoroleta.com/api/address',
          },
          {
            headers: {
              accept: 'application/json',
              authorization: 'Basic ZmVsaXBlOjEyMw==',
              'content-type': 'application/json',
            },
          },
        )
        pixIsExperired.current = false
        console.log({ transaction })
      } catch (error) {
        toast.error('Algo deu errado, tente novamente mais tarde')
        setModalIsOpen(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (!modalIsOpen && !pixIsExperired.current) {
      createTransaction()
    }

    setModalIsOpen(isOpen)
  }

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-56">Assinar</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          {isLoading && (
            <div className="mx-auto flex aspect-square w-9/12 items-center justify-center sm:h-64 sm:w-64">
              <svg
                className="h-20 w-20 animate-[spin_500ms_linear_infinite] text-white"
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
            </div>
          )}

          {!isLoading && (
            <div className="w-full">
              <div className="mx-auto flex aspect-square w-9/12 items-center justify-center bg-red-500 sm:h-64 sm:w-64"></div>

              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
                <input
                  type="text"
                  value="pix copia e cola, código vai aqui"
                  disabled
                  className="w-full border-0 border-b border-white bg-transparent px-0 text-white sm:w-64"
                />
                <Button onClick={handleCopyPIXCode} className="w-36">
                  Copiar
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

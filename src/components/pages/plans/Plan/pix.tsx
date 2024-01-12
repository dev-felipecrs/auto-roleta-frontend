import { useEffect, useRef, useState } from 'react'

import { QRCodeSVG } from 'qrcode.react'
import axios from 'axios'

import { User } from '@/types'
import { toast } from '@/config/toast'
import { Button } from '@/components/shared'

interface PlanPixStepProps {
  user: User
  priceInCents: number
  cpf: string
  handleOpenModal(isOpen: boolean): void
}

export function PlanPixStep({
  user,
  priceInCents,
  cpf,
  handleOpenModal,
}: PlanPixStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [pixCode, setPixCode] = useState('')

  const pixIsExpired = useRef(false)

  const handleCopyPIXCode = async () => {
    await navigator.clipboard.writeText(pixCode)
    toast.success('Código copiado com sucesso')
  }

  useEffect(() => {
    const createTransaction = async () => {
      setIsLoading(true)
      try {
        const transaction = await axios.post(
          'https://api.pay2m.com.br/v1/transactions',
          {
            customer: {
              name: user.name,
              email: user.email,
              document: {
                number: cpf,
                type: 'cpf',
              },
            },
            amount: priceInCents,
            paymentMethod: 'pix',
            items: [
              {
                tangible: false,
                title: 'Plano',
                unitPrice: priceInCents,
                quantity: 1,
              },
            ],
            postbackUrl: 'https://autoroleta.com/api/webhooks/subscribe',
          },
          {
            headers: {
              authorization:
                'Basic ' +
                Buffer.from(
                  String(process.env.NEXT_PUBLIC_PAY2M_SECRET_KEY),
                ).toString('base64'),
            },
          },
        )

        const code = transaction.data.pix.qrcode

        if (!code) {
          throw new Error('PIX code is missing')
        }

        pixIsExpired.current = false
        setPixCode(code)
      } catch (error) {
        toast.error('Algo deu errado, tente novamente mais tarde')
        handleOpenModal(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (!pixIsExpired.current) {
      createTransaction()
    }
  }, [])

  if (isLoading) {
    return (
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
    )
  }

  return (
    <div className="w-full">
      <div className="mx-auto flex aspect-square w-9/12 items-center justify-center sm:h-64 sm:w-64">
        <QRCodeSVG value={pixCode} className="h-full w-full" />
      </div>

      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
        <input
          type="text"
          value={pixCode}
          disabled
          className="w-full border-0 border-b border-white bg-transparent px-0 text-white sm:w-64"
        />
        <Button onClick={handleCopyPIXCode} className="w-36">
          Copiar
        </Button>
      </div>
    </div>
  )
}

'use client'
import { useMemo, useRef, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { User } from '@/types'
import { pricing } from '@/constants/pricing'
import { Button } from '@/components/shared'

import { PlanPixStep } from './pix'
import { PlanCpfStep } from './cpf'

type Step = 'cpf' | 'pix'

interface PlanSubscribeProps {
  user: User
  priceInCents: keyof typeof pricing
}

export function PlanSubscribe({ user, priceInCents }: PlanSubscribeProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('cpf')

  const cpfRef = useRef('')

  const handleCpfStepSubmit = (cpf: string) => {
    cpfRef.current = cpf
    setStep('pix')
  }

  const price = pricing[Number(priceInCents.toFixed(0)) as keyof typeof pricing]

  console.log({ priceInCents, price })

  const trigger = useMemo(() => {
    if (price.license === 'trial') {
      return 'Assinar'
    }

    if (price.recurrency !== user.recurrency) {
      return 'Mudar plano'
    }

    return 'Renovar'
  }, [])

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-56" disabled={price.license === 'trial'}>
          {trigger}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          {step === 'cpf' && <PlanCpfStep callback={handleCpfStepSubmit} />}

          {step === 'pix' && (
            <PlanPixStep
              user={user}
              priceInCents={priceInCents}
              cpf={cpfRef.current}
              handleOpenModal={setModalIsOpen}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

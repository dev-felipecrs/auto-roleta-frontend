'use client'
import { useRef, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '@/components/shared'

import { PlanPixStep } from './pix'
import { PlanCpfStep } from './cpf'

type Step = 'cpf' | 'pix'

export function PlanSubscribe() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('cpf')

  const cpfRef = useRef('')

  const handleCpfStepSubmit = (cpf: string) => {
    cpfRef.current = cpf
    setStep('pix')
  }

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-56">Assinar</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          {step === 'cpf' && <PlanCpfStep callback={handleCpfStepSubmit} />}

          {step === 'pix' && (
            <PlanPixStep
              handleOpenModal={setModalIsOpen}
              cpf={cpfRef.current}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

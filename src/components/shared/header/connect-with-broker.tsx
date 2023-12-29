'use client'
import { useState } from 'react'

import { z } from 'zod'
import { Lock, Message } from 'react-iconly'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/config/toast'
import { Button, Input } from '@/components/shared'
import { revalidatePage } from '@/actions'

const ConnectWithBrokerSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, 'Campo obrigatório'),
})

export function ConnectWithBroker() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof ConnectWithBrokerSchema>
  >({
    resolver: zodResolver(ConnectWithBrokerSchema),
  })

  const handlePasswordVisibilityChange = () => {
    setPasswordIsVisible((visibility) => !visibility)
  }

  const onSubmit = async (data: z.infer<typeof ConnectWithBrokerSchema>) => {
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    const result = await response.json()

    if (response.status !== 200) {
      toast.error(result)
      return
    }

    await revalidatePage('/dashboard')
    setDialogIsOpen(false)
  }

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger asChild>
        <Button type="button" className="h-10 w-[102px] text-xs">
          Conectar
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
          <header className="flex flex-col items-center">
            <Image
              src="/images/shared/pix-strike.png"
              alt="Pix strike"
              width={220}
              height={42}
            />

            <strong className="mt-6 text-center text-xl font-medium text-white">
              Vincular conta
            </strong>
            <span className="mt-2 text-center text-sm text-[#8B8D97] sm:max-w-[24rem]">
              Para realizar apostas, vincule sua conta da Pixstrike.com com suas
              credenciais.
            </span>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-10 flex flex-1 flex-col gap-6 sm:w-96"
          >
            <Input
              type="email"
              placeholder="E-mail"
              leftElement={
                <Message set="light" primaryColor="#6E7079" size={24} />
              }
              error={formState.errors.email?.message}
              {...register('email')}
            />
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Senha"
              leftElement={
                <Lock set="light" primaryColor="#6E7079" size={24} />
              }
              rightElement={
                <button
                  type="button"
                  className="transition-all hover:opacity-75 active:brightness-90"
                  onClick={handlePasswordVisibilityChange}
                >
                  <Image
                    src="/icons/eye-off.svg"
                    alt="Trocar visibilidade da senha"
                    width={16}
                    height={16}
                  />
                </button>
              }
              error={formState.errors.password?.message}
              {...register('password')}
            />

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="mt-6"
                isLoading={formState.isSubmitting}
              >
                Conectar
              </Button>

              <Link
                href="#"
                className="flex h-[50px] w-full items-center justify-center rounded-md border border-white text-base font-semibold text-white transition-all hover:opacity-75 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Criar conta na Pixstrike
              </Link>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

'use client'
import { useState } from 'react'

import { z } from 'zod'
import { Lock, Message } from 'react-iconly'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/components/shared'

const ConnectWithBrokerSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'A senha precisa ter, no mínimo, 6 caracteres'),
})

export function ConnectWithBroker() {
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
    console.log({ data })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button type="button" className="w-[102px] text-xs">
          Conectar-se
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="animate-show fixed inset-0 bg-black bg-opacity-50" />

        <Dialog.Content className="animate-show-with-moviment fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#27282D] px-8 py-11">
          <header className="flex flex-col items-center">
            <Image
              src="/images/shared/logo-simple.svg"
              alt="Auto roleta"
              width={50}
              height={50}
            />

            <strong className="mt-6 text-center text-xl font-medium text-white">
              Conectar
            </strong>
            <span className="mt-2 text-center text-sm text-[#8B8D97]">
              Lorem ipsum
            </span>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 flex flex-col gap-6"
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

            <Button type="submit" className="mt-6 w-96">
              Conectar
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

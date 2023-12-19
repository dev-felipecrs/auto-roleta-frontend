'use client'
import { z } from 'zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export function ForgotPasswordForm() {
  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof ForgotPasswordSchema>
  >({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      const payload = {
        email: data.email,
      }

      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const message = await response.json()
        toast.error(message)
        return
      }

      toast.success('E-mail enviado! Verifique a sua caixa de entrada e spam')
    } catch (error) {
      toast.error('Algo deu errado! Tente novamente mais tarde')
    }
  }

  return (
    <form
      className="flex w-[317px] flex-col items-center rounded-xl bg-[#27282d] px-5 py-11 sm:w-[443px] sm:px-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative h-[3.125rem] w-[3.125rem]">
        <Image src="/images/shared/logo.svg" alt="Logo" fill />
      </div>

      <strong className="mt-6 text-xl font-medium text-white">
        Bem-vindo de volta!
      </strong>
      <span className="mt-2 text-sm text-[#8b8d97]">Entre com sua conta</span>

      <div className="mb-8 mt-10 flex w-full flex-col gap-6">
        <Input
          type="email"
          placeholder="E-mail"
          leftElement={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9026 8.85115L13.4593 12.4642C12.6198 13.1302 11.4387 13.1302 10.5992 12.4642L6.11841 8.85115"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          error={formState.errors.email?.message}
          {...register('email')}
        />
      </div>

      <button
        type="submit"
        className="flex h-[50px] w-full items-center justify-center rounded-md bg-[#e51e3e] text-base font-semibold text-white transition-all hover:opacity-75 active:brightness-90"
      >
        Enviar
      </button>
    </form>
  )
}

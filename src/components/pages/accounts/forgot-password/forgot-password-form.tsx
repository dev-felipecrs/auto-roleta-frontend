'use client'
import { z } from 'zod'
import { Message } from 'react-iconly'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/config/toast'
import { Button, Input } from '@/components/shared'

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
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
        <Image src="/images/shared/logo-simple.svg" alt="Logo" fill />
      </div>

      <strong className="mt-6 text-center text-xl font-medium text-white">
        Esqueceu sua senha?
      </strong>
      <span className="mt-2 text-center text-sm text-[#8b8d97]">
        Insira o seu e-mail abaixo e receberá um link para redefini-lá
      </span>

      <div className="mb-8 mt-10 flex w-full flex-col gap-6">
        <Input
          type="email"
          placeholder="E-mail"
          leftElement={<Message set="light" primaryColor="#6E7079" size={24} />}
          error={formState.errors.email?.message}
          {...register('email')}
        />
      </div>

      <Button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  )
}

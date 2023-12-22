'use client'
import { useState } from 'react'

import { z } from 'zod'
import { Lock, Message } from 'react-iconly'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from '@/config/toast'
import { Button, Input } from '@/components/shared'

const LoginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'A senha precisa ter, no mínimo, 6 caracteres'),
})

export function LoginForm() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const router = useRouter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  })

  const handlePasswordVisibilityChange = () => {
    setPasswordIsVisible((visibility) => !visibility)
  }

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (!response?.ok || response?.error) {
      toast.error('Verifique as suas credenciais e tente novamente')
      return
    }

    router.replace('/dashboard')
  }

  return (
    <form
      className="flex flex-col items-center rounded-xl bg-[#27282d] px-5 py-11 sm:px-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative h-[3.125rem] w-[3.125rem]">
        <Image src="/images/shared/logo-simple.svg" alt="Logo" fill />
      </div>

      <strong className="mt-6 text-center text-xl font-medium text-white">
        Bem-vindo de volta!
      </strong>
      <span className="mt-2 text-center text-sm text-[#8b8d97]">
        Entre com sua conta
      </span>

      <div className="mt-10 flex w-full flex-col gap-6">
        <Input
          type="email"
          placeholder="E-mail"
          leftElement={<Message set="light" primaryColor="#6E7079" size={24} />}
          error={formState.errors.email?.message}
          {...register('email')}
        />
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder="Senha"
          leftElement={<Lock set="light" primaryColor="#6E7079" size={24} />}
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

        <div className="flex items-center justify-end">
          <Link
            href="/accounts/forgot-password"
            className="text-sm text-[#e51e3e] transition-all hover:underline hover:opacity-75"
          >
            Esqueci a senha
          </Link>
        </div>
      </div>

      <span className="my-8 text-center text-sm text-[#abafb1]">
        Ainda não tem uma conta?{' '}
        <Link
          href="/accounts/register"
          className="text-[#e51e3e] transition-all hover:underline hover:opacity-75"
        >
          Criar conta
        </Link>
      </span>

      <Button type="submit" isLoading={formState.isSubmitting}>
        Entrar
      </Button>
    </form>
  )
}

'use client'
import { useState } from 'react'
import { z } from 'zod'
import Image from 'next/image'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/components/shared'

interface ResetPasswordFormProps {
  email: string
  token: string
}

const ResetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const router = useRouter()

  const { handleSubmit, register, formState } = useForm<
    z.infer<typeof ResetPasswordSchema>
  >({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const handlePasswordVisibilityChange = () => {
    setPasswordIsVisible((visibility) => !visibility)
  }

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const payload = {
        email,
        token,
        password: data.confirmPassword,
      }

      const response = await fetch('/api/users/reset-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const message = await response.json()
        toast.error(message)
        return
      }

      toast.success(
        'Senha alterada com sucesso! Você será redirecionado daqui 5 segundos',
      )

      setTimeout(() => {
        router.push('/accounts/login')
      }, 5 * 1000) // 5 seconds
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

      <strong className="mt-6 text-xl font-medium text-white">Bem-vindo</strong>
      <span className="mt-2 text-sm text-[#8b8d97]">Crie sua conta</span>

      <div className="mb-8 mt-10 flex w-full flex-col gap-6">
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder="Senha"
          leftElement={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4235 9.4478V7.3008C16.4235 4.7878 14.3855 2.7498 11.8725 2.7498C9.35949 2.7388 7.31349 4.7668 7.30249 7.2808V7.3008V9.4478"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6832 21.2496H8.04224C5.94824 21.2496 4.25024 19.5526 4.25024 17.4576V13.1686C4.25024 11.0736 5.94824 9.37659 8.04224 9.37659H15.6832C17.7772 9.37659 19.4752 11.0736 19.4752 13.1686V17.4576C19.4752 19.5526 17.7772 21.2496 15.6832 21.2496Z"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.8629 14.2027V16.4237"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          rightElement={
            <button
              type="button"
              className="transition-all hover:opacity-75 active:brightness-90"
              onClick={handlePasswordVisibilityChange}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_864_359)">
                  <path
                    d="M6.59996 2.82667C7.05885 2.71925 7.52867 2.66556 7.99996 2.66667C12.6666 2.66667 15.3333 8 15.3333 8C14.9286 8.75707 14.446 9.46982 13.8933 10.1267M9.41329 9.41333C9.23019 9.60983 9.00939 9.76744 8.76406 9.87675C8.51873 9.98606 8.25389 10.0448 7.98535 10.0496C7.71681 10.0543 7.45007 10.0049 7.20103 9.90433C6.952 9.80374 6.72577 9.65402 6.53586 9.4641C6.34594 9.27418 6.19622 9.04796 6.09563 8.79893C5.99504 8.54989 5.94564 8.28315 5.95038 8.01461C5.95512 7.74606 6.0139 7.48123 6.12321 7.2359C6.23252 6.99057 6.39013 6.76976 6.58663 6.58667M11.96 11.96C10.8204 12.8287 9.4327 13.3099 7.99996 13.3333C3.33329 13.3333 0.666626 8 0.666626 8C1.49589 6.4546 2.64605 5.1044 4.03996 4.04L11.96 11.96Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.666626 0.666664L15.3333 15.3333"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_864_359">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          }
          error={formState.errors.password?.message}
          {...register('password')}
        />
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder="Confirme sua senha"
          leftElement={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4235 9.4478V7.3008C16.4235 4.7878 14.3855 2.7498 11.8725 2.7498C9.35949 2.7388 7.31349 4.7668 7.30249 7.2808V7.3008V9.4478"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6832 21.2496H8.04224C5.94824 21.2496 4.25024 19.5526 4.25024 17.4576V13.1686C4.25024 11.0736 5.94824 9.37659 8.04224 9.37659H15.6832C17.7772 9.37659 19.4752 11.0736 19.4752 13.1686V17.4576C19.4752 19.5526 17.7772 21.2496 15.6832 21.2496Z"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.8629 14.2027V16.4237"
                stroke="#6E7079"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          rightElement={
            <button
              type="button"
              className="transition-all hover:opacity-75 active:brightness-90"
              onClick={handlePasswordVisibilityChange}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_864_359)">
                  <path
                    d="M6.59996 2.82667C7.05885 2.71925 7.52867 2.66556 7.99996 2.66667C12.6666 2.66667 15.3333 8 15.3333 8C14.9286 8.75707 14.446 9.46982 13.8933 10.1267M9.41329 9.41333C9.23019 9.60983 9.00939 9.76744 8.76406 9.87675C8.51873 9.98606 8.25389 10.0448 7.98535 10.0496C7.71681 10.0543 7.45007 10.0049 7.20103 9.90433C6.952 9.80374 6.72577 9.65402 6.53586 9.4641C6.34594 9.27418 6.19622 9.04796 6.09563 8.79893C5.99504 8.54989 5.94564 8.28315 5.95038 8.01461C5.95512 7.74606 6.0139 7.48123 6.12321 7.2359C6.23252 6.99057 6.39013 6.76976 6.58663 6.58667M11.96 11.96C10.8204 12.8287 9.4327 13.3099 7.99996 13.3333C3.33329 13.3333 0.666626 8 0.666626 8C1.49589 6.4546 2.64605 5.1044 4.03996 4.04L11.96 11.96Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.666626 0.666664L15.3333 15.3333"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_864_359">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          }
          error={formState.errors.password?.message}
          {...register('confirmPassword')}
        />
      </div>

      <Button type="submit">Enviar</Button>
    </form>
  )
}

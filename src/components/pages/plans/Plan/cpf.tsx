import { z } from 'zod'
import ReactInputMask from 'react-input-mask'
import { Document } from 'react-iconly'
import { useForm } from 'react-hook-form'
import { cpf } from 'cpf-cnpj-validator'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Input } from '@/components/shared'

interface PlanCpfStepProps {
  callback(cpf: string): void
}

const CpfSchema = z.object({
  cpf: z
    .string()
    .refine((value) => cpf.isValid(value), { message: 'CPF inválido' })
    .transform((value) => value.replace(/[^\d]/g, '')),
})

const MyInput = (error: string | undefined) => {
  return (inputProps: any) => (
    <Input
      placeholder="Digite o seu CPF"
      leftElement={<Document set="light" primaryColor="#6E7079" size={24} />}
      error={error}
      {...inputProps}
    />
  )
}

export function PlanCpfStep({ callback }: PlanCpfStepProps) {
  const { formState, handleSubmit, register } = useForm<
    z.infer<typeof CpfSchema>
  >({
    resolver: zodResolver(CpfSchema),
  })

  const onSubmit = (data: z.infer<typeof CpfSchema>) => {
    callback(data.cpf)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-64 w-full flex-col items-center justify-center gap-4"
    >
      <div className="mb-4 flex flex-col items-center gap-1">
        <strong className="text-center text-xl font-medium text-white">
          Assinatura Premium
        </strong>
        <p className="text-center text-sm text-[#8B8D97] sm:max-w-[24rem]">
          Para prosseguir com a sua assinatura, preencha o número do seu CPF
          abaixo
        </p>
      </div>

      <ReactInputMask mask="999.999.999-99" {...register('cpf')}>
        {MyInput(formState.errors.cpf?.message) as any}
      </ReactInputMask>

      <Button type="submit" className="w-full">
        Continuar
      </Button>
    </form>
  )
}

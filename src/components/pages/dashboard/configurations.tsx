'use client'
import { ChangeEvent, useRef, useState } from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CurrencyInput, Select, Switch } from '@/components/shared'
import { Card } from '@/components/pages/dashboard'

const ConfigurationsSchema = z.object({
  strategy: z.string({ required_error: 'Campo obrigatório' }),
  entry: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
  gales: z.string({ required_error: 'Campo obrigatório' }),
  stopWin: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
  stopLoss: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
})

export function Configurations() {
  const [botIsActivated, setBotIsActivated] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { control, handleSubmit } = useForm<
    z.infer<typeof ConfigurationsSchema>
  >({
    resolver: zodResolver(ConfigurationsSchema),
    disabled: botIsActivated,
  })

  const handleBotActivation = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    if (isChecked) return formRef.current?.requestSubmit()

    setBotIsActivated(false)
  }

  const onSubmit = (data: z.infer<typeof ConfigurationsSchema>) => {
    setBotIsActivated(true)
    console.log({ data })
  }

  return (
    <Card
      title="Configurações"
      headerLeftElement={
        <Switch checked={botIsActivated} onChange={handleBotActivation}>
          Ativar BOT
        </Switch>
      }
    >
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Controller
          control={control}
          name="strategy"
          render={({ field, formState }) => (
            <Select
              label="Estratégia"
              placeholder="Escolher"
              items={[
                { label: 'Item 1', value: 'item-1' },
                { label: 'Item 2', value: 'item-2' },
              ]}
              containerClassname="col-span-2"
              error={formState.errors.strategy?.message}
              onValueChange={field.onChange}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="entry"
          render={({ field: { ref, ...rest }, formState }) => (
            <CurrencyInput
              label="Valor de entrada"
              getInputRef={ref}
              error={formState.errors.entry?.message}
              {...rest}
            />
          )}
        />

        <Controller
          control={control}
          name="gales"
          render={({ field, formState }) => (
            <Select
              label="Gales"
              placeholder="Escolher"
              items={[
                { label: 'Item 1', value: 'item-1' },
                { label: 'Item 2', value: 'item-2' },
              ]}
              error={formState.errors.gales?.message}
              onValueChange={field.onChange}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="stopWin"
          render={({ field: { ref, ...rest }, formState }) => (
            <CurrencyInput
              label="Stop Win"
              getInputRef={ref}
              error={formState.errors.stopWin?.message}
              {...rest}
            />
          )}
        />

        <Controller
          control={control}
          name="stopLoss"
          render={({ field: { ref, ...rest }, formState }) => (
            <CurrencyInput
              label="Stop Loss"
              getInputRef={ref}
              error={formState.errors.stopLoss?.message}
              {...rest}
            />
          )}
        />
      </form>
    </Card>
  )
}

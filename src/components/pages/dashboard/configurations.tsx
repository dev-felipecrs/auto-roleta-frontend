'use client'
import { ChangeEvent, useRef, useState } from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { Strategy } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from '@/types'
import { CurrencyInput, Select, Switch } from '@/components/shared'
import { Card } from '@/components/pages/dashboard'

interface ConfigurationsProps {
  user: User | null
  setUser(user: User): void
}

const ConfigurationsSchema = z.object({
  strategy: z.enum(
    ['black-red-black', 'red-black-red', 'black-black-black', 'red-red-red'],
    {
      required_error: 'Campo obrigatório',
    },
  ),
  entry: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    )
    .refine((value) => value > 0, { message: 'Valor inválido' }),
  gales: z.string({ required_error: 'Campo obrigatório' }),
  stopWin: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    )
    .refine((value) => value > 0, { message: 'Valor inválido' }),
  stopLoss: z
    .string({ required_error: 'Campo obrigatório' })
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    )
    .refine((value) => value > 0, { message: 'Valor inválido' }),
})

const STRATEGY: Record<
  Strategy,
  'black-red-black' | 'red-black-red' | 'black-black-black' | 'red-red-red'
> = {
  blackBlackBlack: 'black-black-black',
  blackRedBlack: 'black-red-black',
  redBlackRed: 'red-black-red',
  redRedRed: 'red-red-red',
}

export function Configurations({ user, setUser }: ConfigurationsProps) {
  const [botIsActivated, setBotIsActivated] = useState(user?.isActive || false)
  const formRef = useRef<HTMLFormElement>(null)

  const { control, handleSubmit } = useForm<
    z.infer<typeof ConfigurationsSchema>
  >({
    defaultValues: {
      strategy: user?.config?.strategy
        ? STRATEGY[user.config.strategy]
        : undefined,
      entry: user?.config?.entry
        ? (String(user.config.entry) as unknown as number)
        : undefined,
      gales:
        typeof user?.config?.gales === 'number'
          ? String(user.config.gales)
          : undefined,
      stopWin: user?.config?.stopWin
        ? (String(user.config.stopWin) as unknown as number)
        : undefined,
      stopLoss: user?.config?.stopLoss
        ? (String(user.config.stopLoss) as unknown as number)
        : undefined,
    },
    disabled: botIsActivated,
    resolver: zodResolver(ConfigurationsSchema),
  })

  const handleBotActivation = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    if (isChecked) return formRef.current?.requestSubmit()

    setBotIsActivated(false)
  }

  const onSubmit = async (data: z.infer<typeof ConfigurationsSchema>) => {
    setBotIsActivated(true)
    if (user) {
      const response = await fetch(`/api/users/${user.userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isActive: true,
          status: 'online',
          balanceTracks: null,
          bets: null,
          config: {
            strategy: data.strategy,
            entry: data.entry,
            gales: Number(data.gales),
            stopWin: data.stopWin,
            stopLoss: data.stopLoss,
          },
        }),
      })
      const updatedUser = await response.json()
      setUser(updatedUser)
    }
  }

  return (
    <Card
      title="Configurações"
      headerLeftElement={
        <Switch checked={botIsActivated} onChange={handleBotActivation}>
          {botIsActivated ? 'Desativar BOT' : 'Ativar BOT'}
        </Switch>
      }
    >
      <form
        className="grid grid-cols-1 gap-4 xs:grid-cols-2"
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
                { label: '⚫🔴⚫ -> 🔴', value: 'black-red-black' },
                { label: '🔴⚫🔴 -> ⚫', value: 'red-black-red' },
                { label: '⚫⚫⚫ -> 🔴', value: 'black-black-black' },
                { label: '🔴🔴🔴 -> ⚫', value: 'red-red-red' },
              ]}
              containerClassname="xs:col-span-2"
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
              label="Proteções"
              placeholder="Escolher"
              items={[
                { label: 'Nenhuma', value: '0' },
                { label: '1 proteção', value: '1' },
                { label: '2 proteções', value: '2' },
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

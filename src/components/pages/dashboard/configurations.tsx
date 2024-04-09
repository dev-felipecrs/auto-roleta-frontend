'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from '@/types'
import { STRATEGIES, STRATEGIES_NAMES } from '@/constants/strategies'
import { toast } from '@/config/toast'
import { TrialLicenseExpiredDialog } from '@/components/shared/trial-license-expired-dialog'
import { CurrencyInput, Select, Switch } from '@/components/shared'
import { Card } from '@/components/pages/dashboard'
import { decrypt } from '@/actions'

interface ConfigurationsProps {
  user: User | null
  setUser(user: User): void
  isFetching: boolean
  setIsFetching(isFetching: boolean): void
}

const getStrategies = (user: User | null) =>
  STRATEGIES_NAMES.map((strategy) => {
    const isDisabled = !STRATEGIES[strategy].licenses.includes(
      user?.license as any,
    )

    return {
      label: (
        <div className="flex items-center justify-between">
          <span>{strategy}</span>

          {STRATEGIES[strategy].licenses[0] === 'premium' && (
            <Image
              src="/icons/plans/premium.svg"
              alt="Plano Premium"
              width={20}
              height={20}
            />
          )}

          {STRATEGIES[strategy].licenses[0] === 'vip' && (
            <Image
              src="/icons/plans/vip.svg"
              alt="Plano VIP"
              width={20}
              height={20}
            />
          )}

          {STRATEGIES[strategy].licenses[0] === 'trial' && (
            <Image
              src="/icons/plans/trial.svg"
              alt="Plano Trial"
              width={20}
              height={20}
            />
          )}
        </div>
      ),
      value: strategy,
      disabled: isDisabled,
    }
  })

const ConfigurationsSchema = z
  .object({
    strategy: z.enum(STRATEGIES_NAMES, {
      errorMap: (issue) => {
        const issues: Partial<Record<typeof issue.code, { message: string }>> =
          {
            invalid_type: { message: 'Campo inválido' },
            invalid_enum_value: { message: 'Campo inválido' },
          }

        return issues[issue.code] || { message: 'Campo inválido' }
      },
    }),
    entry: z
      .string({ required_error: 'Campo obrigatório' })
      .transform((value) =>
        Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
      )
      .refine((value) => value > 0, { message: 'Valor inválido' }),
    gales: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório'),
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
  .refine(
    (data) => {
      const isStrategyMaster = (data.strategy as any).includes('Master')

      if (isStrategyMaster) {
        return data.entry >= 20
      }

      return true
    },
    {
      message: 'Entrada de no mínimo R$ 20',
      path: ['entry'], // path of error
    },
  )

export function Configurations({
  user,
  setUser,
  isFetching,
  setIsFetching,
}: ConfigurationsProps) {
  const [botIsActivated, setBotIsActivated] = useState(user?.isActive || false)
  const [showDialog, setShowDialog] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { control, getValues, handleSubmit, setError, setValue } = useForm<
    z.infer<typeof ConfigurationsSchema>
  >({
    defaultValues: {
      strategy: user?.config?.strategy,
      entry: user?.config?.entry
        ? (String(user.config.entry) as unknown as number)
        : undefined,
      gales:
        typeof user?.config?.gales === 'number'
          ? String(user.config.gales)
          : undefined,
      stopWin:
        user?.config?.stopWin && user.balanceTracks[0]
          ? (String(
              user.config.stopWin - user.balanceTracks[0].value,
            ) as unknown as number)
          : undefined,
      stopLoss:
        user?.config?.stopLoss && user.balanceTracks[0]
          ? (String(
              user.balanceTracks[0].value - user.config.stopLoss,
            ) as unknown as number)
          : undefined,
    },
    disabled: botIsActivated,
    resolver: zodResolver(ConfigurationsSchema),
  })

  const handleBotActivation = async (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    if (isChecked) return formRef.current?.requestSubmit()

    setIsFetching(true)

    if (user) {
      const response = await fetch(`/api/users/${user.userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isActive: false,
          status: 'offline',
          config: null,
        }),
      })
      const updatedUser = await response.json()
      setBotIsActivated(false)
      setUser(updatedUser)
    }

    setIsFetching(false)
  }

  const onSubmit = async (data: z.infer<typeof ConfigurationsSchema>) => {
    setIsFetching(true)

    if (user && user.credentials) {
      const decryptedPassword = await decrypt(user.credentials.password)

      const authenticateResponse = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          email: user.credentials?.email,
          password: decryptedPassword,
        }),
      })

      const result = await authenticateResponse.json()

      if (authenticateResponse.status !== 200) {
        return toast.error(result)
      }

      if (user.license === 'trial' && user.betsMade >= 3) {
        setShowDialog(true)
        return toast.error('Limite de apostas atingido! Assine já!')
      }

      const { balance } = result

      let ok = true

      if (data.stopLoss > balance) {
        ok = false
        setError('stopLoss', {
          message: 'O stop loss deve ser menor que seu saldo.',
        })
      }

      if (data.entry > balance) {
        ok = false
        setError('entry', {
          message: 'O valor de entrada deve ser menor que seu saldo.',
        })
      }

      if (data.entry * (2 ** (Number(data.gales) + 1) - 1) > balance) {
        ok = false
        setError('gales', {
          message: 'Essa quantidade de gales não atende ao seu saldo.',
        })
      }

      if (user.license === 'trial' && data.entry > 5) {
        ok = false
        setError('entry', {
          message: 'Esse valor de aposta não atende ao seu saldo.',
        })
      }

      if (!ok) {
        setBotIsActivated(false)
        setIsFetching(false)
        return
      }

      const userResponse = await fetch(`/api/users/${user.userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          isActive: true,
          status: 'online',
          balanceTracks: [
            {
              userId: user.userId,
              value: balance,
              time: new Date(),
            },
          ],
          bets: null,
          config: {
            strategy: data.strategy,
            entry: data.entry,
            gales: Number(data.gales),
            stopWin: balance + data.stopWin,
            stopLoss: balance - data.stopLoss,
          },
        }),
      })
      const updatedUser = await userResponse.json()
      setBotIsActivated(true)

      setUser(updatedUser)
    }

    setIsFetching(false)
  }

  useEffect(() => {
    if (!user?.config) {
      setBotIsActivated(false)
      const fields = Object.entries(getValues()).map(
        ([name]) => name,
      ) as unknown as Array<keyof z.infer<typeof ConfigurationsSchema>>
      fields.forEach((field) => setValue(field, ''))
    }
  }, [user?.config])

  return (
    <Card
      title="Configurações"
      headerLeftElement={
        <Switch
          checked={botIsActivated}
          onChange={handleBotActivation}
          disabled={isFetching || !user?.credentials}
        >
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
              items={getStrategies(user)}
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
              items={
                user!.license === 'trial'
                  ? [{ label: 'Nenhuma', value: '0' }]
                  : [
                      { label: 'Nenhuma', value: '0' },
                      { label: '1 proteção', value: '1' },
                      { label: '2 proteções', value: '2' },
                    ]
              }
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

      {showDialog && <TrialLicenseExpiredDialog />}
    </Card>
  )
}

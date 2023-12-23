'use client'
import { z } from 'zod'
import { NumericFormat } from 'react-number-format'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Switch } from '@/components/shared'
import { Card } from '@/components/pages/dashboard'

const ConfigurationsSchema = z.object({
  strategy: z.string(),
  entry: z
    .string()
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
  gales: z.string(),
  stopWin: z
    .string()
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
  stopLoss: z
    .string()
    .transform((value) =>
      Number(value.replace('R$ ', '').replace('.', '').replace(',', '.')),
    ),
})

export function Configurations() {
  const { control, handleSubmit } = useForm<
    z.infer<typeof ConfigurationsSchema>
  >({
    resolver: zodResolver(ConfigurationsSchema),
  })

  const onSubmit = (data: z.infer<typeof ConfigurationsSchema>) => {
    console.log({ data })
  }

  return (
    <Card title="Configurações" headerLeftElement={<Switch>Ativar BOT</Switch>}>
      <div className="grid grid-cols-2 gap-4">
        <label className="col-span-2 flex flex-col gap-2">
          <span className="text-[10px] font-medium text-white">Estratégia</span>
          <Controller
            control={control}
            name="strategy"
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                placeholder="R$ 00,00"
                className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 sm:text-sm"
                {...rest}
              />
            )}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-white">
            Valor de entrada
          </span>
          <Controller
            control={control}
            name="entry"
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                placeholder="R$ 00,00"
                className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 sm:text-sm"
                {...rest}
              />
            )}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-white">Gales</span>
          <Controller
            control={control}
            name="gales"
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                placeholder="R$ 00,00"
                className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 sm:text-sm"
                {...rest}
              />
            )}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-white">Stop Win</span>
          <Controller
            control={control}
            name="stopWin"
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                placeholder="R$ 00,00"
                className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 sm:text-sm"
                {...rest}
              />
            )}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-medium text-white">Stop Loss</span>
          <Controller
            control={control}
            name="stopLoss"
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                placeholder="R$ 00,00"
                className="h-[3.25rem] w-full rounded-lg border-2 border-[#1e1e1e] bg-[#1e1e1e] p-4 text-xs text-white transition-opacity placeholder:text-[#abafb1] hover:opacity-75 focus:border-[#e51e3e] focus:ring-0 sm:text-sm"
                {...rest}
              />
            )}
          />
        </label>
      </div>

      <button type="button" onClick={handleSubmit(onSubmit)}>
        Enviar
      </button>
    </Card>
  )
}

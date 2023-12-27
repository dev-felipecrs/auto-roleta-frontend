'use client'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { format } from 'date-fns'

import { formatNumber } from '@/utils'
import { UserBalanceTrack } from '@/models'
import { mockUser } from '@/app/user-mock'

const shadowData: UserBalanceTrack[] = Array.from({ length: 50 }).map(() => {
  const generateRandomNumber = (limit: number): string => {
    return String(Math.floor(Math.random() * limit) + 1).padStart(2, '0')
  }

  const month = generateRandomNumber(12)
  const day = generateRandomNumber(28)
  const hour = generateRandomNumber(23)
  const second = generateRandomNumber(59)

  return {
    time: new Date(`2023-${month}-${day}T${hour}:${second}`),
    value: Math.floor(Math.random() * (2000 - 1000)) + 1000,
  }
})

export type CustomTooltipItemProps = UserBalanceTrack & {
  time: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: CustomTooltipItemProps }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { time, value } = payload[0].payload

    return (
      <div className="flex flex-col gap-2 rounded-md bg-[#1c1d21] p-2 text-sm shadow-md">
        <span className="text-xs text-white">
          Horário:{' '}
          <span className="text-xs font-medium text-white">{time}</span>
        </span>
        <span className="text-xs text-white">
          Saldo:{' '}
          <span className="text-xs font-medium text-white">
            R$ {formatNumber(value)}
          </span>
        </span>
      </div>
    )
  }

  return <></>
}

export function Performance() {
  const graphicColor: Record<typeof mockUser.plan, string> = {
    basic: '#FFCE50',
    premium: '#0775C7',
    trial: '#848484',
  }

  const data = shadowData.map((item) => ({
    ...item,
    time: format(item.time, 'HH:mm'),
    balance: item.value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="20rem">
      <AreaChart data={data} margin={{ left: -20 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={graphicColor[mockUser.plan]} />
            <stop
              offset="1"
              stopColor={graphicColor[mockUser.plan]}
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="balance"
          stroke={graphicColor[mockUser.plan]}
          fill="url(#color)"
        />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickMargin={10}
          fontSize="12"
          fontWeight="600"
          color="#A6A8B1"
        />
        <YAxis
          dataKey="balance"
          axisLine={false}
          tickLine={false}
          tickCount={5}
          fontSize="12"
          color="#A6A8B1"
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false} color="#191A1F" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

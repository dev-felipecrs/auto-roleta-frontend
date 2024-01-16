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
import { BalanceTrack, License } from '@prisma/client'

import { formatNumber } from '@/utils'
import { User } from '@/types'

const shadowData: Array<Omit<BalanceTrack, 'balanceTrackId' | 'userId'>> = [
  {
    time: new Date(new Date().setHours(0, 0, 0, 0)),
    value: 0,
  },
]

export type CustomTooltipItemProps = Omit<
  BalanceTrack,
  'balanceTrackId' | 'userId'
> & {
  time: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: CustomTooltipItemProps }>
}

interface PerformanceProps {
  user: User | null
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

export function Performance({ user }: PerformanceProps) {
  const graphicColor: Record<License, string> = {
    vip: '#FFCE50',
    premium: '#0775C7',
    trial: '#848484',
  }

  const balanceTracksIsEmpty = (user?.balanceTracks || []).length === 0

  const data = (
    !balanceTracksIsEmpty ? user?.balanceTracks || [] : shadowData
  ).map((track) => ({
    time: format(track.time, 'HH:mm'),
    value: track.value,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="20rem">
      <AreaChart data={data} margin={{ left: -20 }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={graphicColor[user?.license || 'trial']} />
            <stop
              offset="1"
              stopColor={graphicColor[user?.license || 'trial']}
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="value"
          stroke={graphicColor[user?.license || 'trial']}
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
          dataKey="value"
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

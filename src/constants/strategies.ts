import { License } from '@prisma/client'

import { Color } from '@/types/strategy'
import { Strategy, StrategyName } from '@/types'

export type StrategyProps = {
  strategy: Strategy
  licenses: License[]
}

export const STRATEGIES_NAMES = [
  'Estratégia Rei Roleta',
  'Estratégia Órfãos',
  'Estratégia Polêmica',
  'Estratégia TicTac',
  'Estrátegia Vênus',
  'Estrátegia Master',
] as const

export const STRATEGIES: Record<StrategyName, StrategyProps> = {
  'Estratégia Rei Roleta': {
    strategy: [[Color.RED, Color.BLACK, Color.BLACK], Color.RED],
    licenses: ['trial', 'vip', 'premium'],
  },
  'Estratégia Órfãos': {
    strategy: [[Color.BLACK, Color.RED, Color.BLACK], Color.BLACK],
    licenses: ['trial', 'vip', 'premium'],
  },
  'Estratégia Polêmica': {
    strategy: [[Color.BLACK, Color.BLACK, Color.RED], Color.RED],
    licenses: ['vip', 'premium'],
  },
  'Estratégia TicTac': {
    strategy: [[Color.RED, Color.RED, Color.BLACK], Color.BLACK],
    licenses: ['vip', 'premium'],
  },
  'Estrátegia Vênus': {
    strategy: [[Color.RED, Color.BLACK, Color.BLACK], Color.RED],
    licenses: ['vip', 'premium'],
  },
  'Estrátegia Master': {
    strategy: [
      [
        Color.BLACK,
        Color.BLACK,
        Color.BLACK,
        Color.BLACK,
        Color.BLACK,
        Color.BLACK,
      ],
      Color.BLACK,
    ],
    licenses: ['premium'],
  },
} as const

import { Color } from '@/types/strategy'
import { Strategy, StrategyName } from '@/types'

export const STRATEGIES_NAMES = [
  'Estratégia Rei Roleta',
  'Estratégia Órfãos',
  'Estratégia Polêmica',
  'Estratégia TicTac',
  'Estrátegia Vênus',
] as const

export const STRATEGIES: Record<StrategyName, Strategy> = {
  'Estratégia Rei Roleta': [[Color.RED, Color.BLACK, Color.BLACK], Color.RED],
  'Estratégia Órfãos': [[Color.BLACK, Color.RED, Color.BLACK], Color.BLACK],
  'Estratégia Polêmica': [[Color.BLACK, Color.BLACK, Color.RED], Color.RED],
  'Estratégia TicTac': [[Color.RED, Color.RED, Color.BLACK], Color.BLACK],
  'Estrátegia Vênus': [[Color.RED, Color.BLACK, Color.BLACK], Color.RED],
} as const

import { format } from 'date-fns'
import cn from 'classnames'

import { formatNumber } from '@/utils'

type Bet = {
  color: 'red' | 'black'
  entry: number
  gains: number
  result: boolean
  time: Date
}

interface BetProps {
  bet: Bet
}

interface BetsProps {
  bets: Bet[]
}

function Bet({ bet }: BetProps) {
  return (
    <li className="flex items-center justify-between border-b-[1px] border-[#282A33] py-3 last:border-0">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111115]">
          <div
            className={cn('h-4 w-4 rounded-full', {
              'bg-[#E51E3E]': bet.color === 'red',
              'bg-black': bet.color === 'black',
            })}
          />
        </div>

        <div className="flex flex-col gap-[2px]">
          <strong className="text-xs font-medium text-white">
            {bet.color === 'black' && 'Preto'}
            {bet.color === 'red' && 'Vermelho'}
          </strong>
          <span className="text-[10px] text-[#A6A8B1]">
            {format(bet.time, 'HH:mm')}
          </span>
        </div>
      </div>

      <div className="flex flex-col text-right">
        <strong
          className={cn('text-xs font-medium', {
            'text-[#0ECD8D]': bet.result,
            'text-[#C63434]': !bet.result,
          })}
        >
          {!bet.result && '-'} R$ {formatNumber(bet.gains)}
        </strong>
        <span className="text-[10px] text-[#A6A8B1]">
          R$ {formatNumber(bet.entry)}
        </span>
      </div>
    </li>
  )
}

export function Bets({ bets }: BetsProps) {
  return (
    <ul>
      {bets.map((bet, index) => (
        <Bet key={index} bet={bet} />
      ))}
    </ul>
  )
}

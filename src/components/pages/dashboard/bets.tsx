import { format } from 'date-fns'
import cn from 'classnames'
import { Bet } from '@prisma/client'

import { formatNumber } from '@/utils'
import { Skeleton } from '@/components/shared'

interface BetProps {
  bet: Bet
  isLoading?: boolean
}

interface BetsProps {
  bets: Bet[]
  isLoading: boolean
}

function Bet({ bet, isLoading = false }: BetProps) {
  return (
    <li className="flex items-center justify-between border-b-[1px] border-[#282A33] py-3 last:border-0">
      <div className="flex items-center gap-4">
        {isLoading && <Skeleton width="2.25rem" height="2.25rem" />}

        {!isLoading && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111115]">
            <div
              className={cn('h-4 w-4 rounded-full', {
                'bg-[#E51E3E]': bet.color === 'red',
                'bg-black': bet.color === 'black',
              })}
            />
          </div>
        )}

        <div
          className={cn('flex flex-col gap-[2px]', {
            'gap-[6px]': isLoading,
          })}
        >
          {isLoading && (
            <>
              <Skeleton width="100px" height="12px" />
              <Skeleton width="76px" height="12px" />
            </>
          )}

          {!isLoading && (
            <>
              <strong className="text-xs font-medium text-white">
                {bet.color === 'black' && 'Preto'}
                {bet.color === 'red' && 'Vermelho'}
              </strong>
              <span className="text-[10px] text-[#A6A8B1]">
                {format(bet.time, 'HH:mm')}
              </span>
            </>
          )}
        </div>
      </div>

      <div
        className={cn('flex flex-col text-right', {
          'items-end gap-[6px]': isLoading,
        })}
      >
        {isLoading && (
          <>
            <Skeleton width="88px" height="12px" />
            <Skeleton width="64px" height="12px" />
          </>
        )}

        {!isLoading && (
          <>
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
          </>
        )}
      </div>
    </li>
  )
}

export function Bets({ bets, isLoading }: BetsProps) {
  return (
    <ul>
      {isLoading &&
        Array.from({ length: 3 })
          .map((_, index) => <Bet key={index} bet={{} as any} isLoading />)
          .reverse()}

      {!isLoading && bets.map((bet, index) => <Bet key={index} bet={bet} />)}
    </ul>
  )
}

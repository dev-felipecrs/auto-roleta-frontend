import cn from 'classnames'

import { Skeleton } from '@/components/shared'

interface ScoreContainerProps {
  value: string | number
  text: string
  color: 'green' | 'red' | 'white'
  isLoading: boolean
}

interface ScoreProps {
  wins: number
  losses: number
  assertiveness: string
  isLoading: boolean
}

function ScoreContainer({
  value,
  text,
  color,
  isLoading,
}: ScoreContainerProps) {
  return (
    <div className="flex flex-col gap-1">
      {isLoading && (
        <>
          <Skeleton width="43px" height="14px" />
          <Skeleton width="64px" height="12px" />
        </>
      )}

      {!isLoading && (
        <>
          <strong
            className={cn('text-base font-medium', {
              'text-[#04D47C]': color === 'green',
              'text-[#E51E3E]': color === 'red',
              'text-white': color === 'white',
            })}
          >
            {value}
          </strong>
          <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
            {text}
          </span>
        </>
      )}
    </div>
  )
}

export function Score({ wins, losses, assertiveness, isLoading }: ScoreProps) {
  return (
    <div className="flex items-center justify-between">
      <ScoreContainer
        value={wins}
        text="Wins"
        color="green"
        isLoading={isLoading}
      />

      <ScoreContainer
        value={losses}
        text="Losses"
        color="red"
        isLoading={isLoading}
      />

      <ScoreContainer
        value={`${Number(assertiveness) || 0}%`}
        text="Assertividade"
        color="white"
        isLoading={isLoading}
      />
    </div>
  )
}

import { Skeleton } from '@/components/shared'

interface ScoreContainerProps {
  value: string | number
  text: string
  color: string
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
          <strong className={`text-base font-medium text-[${color}]`}>
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
        color="#04D47C"
        isLoading={isLoading}
      />

      <ScoreContainer
        value={losses}
        text="Losses"
        color="#E51E3E"
        isLoading={isLoading}
      />

      <ScoreContainer
        value={`${assertiveness}%`}
        text="Assertividade"
        color="#FFFFFF"
        isLoading={isLoading}
      />
    </div>
  )
}

interface ScoreProps {
  wins: number
  losses: number
  assertiveness: string
}

export function Score({ wins, losses, assertiveness }: ScoreProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#04D47C]">{wins}</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Wins
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#E51E3E]">
          {losses}
        </strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Losses
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-white">
          {assertiveness}%
        </strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Assertividade
        </span>
      </div>
    </div>
  )
}

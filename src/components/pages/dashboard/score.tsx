interface ScoreProps {
  wins: number
  losses: number
  assertiveness: number
}

export function Score({ wins, losses, assertiveness }: ScoreProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#04D47C]">14</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          {wins}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#E51E3E]">14</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          {losses}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-white">50%</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          {assertiveness}%
        </span>
      </div>
    </div>
  )
}

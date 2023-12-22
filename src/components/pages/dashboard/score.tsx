export function Score() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#04D47C]">14</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Wins
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-[#E51E3E]">14</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Losses
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-base font-medium text-white">50%</strong>
        <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
          Assertividade
        </span>
      </div>
    </div>
  )
}

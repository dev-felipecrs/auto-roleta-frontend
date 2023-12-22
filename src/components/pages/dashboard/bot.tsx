import cn from 'classnames'

interface BotProps {
  status: 'online' | 'offline'
}

export function Bot({ status }: BotProps) {
  return (
    <div className="flex flex-col gap-1">
      <strong
        className={cn('whitespace-nowrap text-base font-medium', {
          'text-[#04D47C]': status === 'online',
          'text-[#E51E3E]': status === 'offline',
        })}
      >
        {status === 'online' && 'Online'}
        {status === 'offline' && 'Offline'}
      </strong>
      <span className="text-xs font-semibold tracking-[1px] text-[#A6A8B1]">
        Status
      </span>
    </div>
  )
}

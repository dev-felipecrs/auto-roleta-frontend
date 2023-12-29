import cn from 'classnames'
import { Status } from '@prisma/client'

import { Skeleton } from '@/components/shared'

interface BotProps {
  status: Status
  isLoading: boolean
}

export function Bot({ status, isLoading }: BotProps) {
  return (
    <div className="flex flex-col gap-1">
      {isLoading && (
        <>
          <Skeleton width="64px" height="14px" />
          <Skeleton width="88px" height="12px" />
        </>
      )}

      {!isLoading && (
        <>
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
        </>
      )}
    </div>
  )
}

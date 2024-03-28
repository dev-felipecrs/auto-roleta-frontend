import Image from 'next/image'
import cn from 'classnames'
import { License } from '@prisma/client'

import { User } from '@/types'

interface PlanProps {
  user: User
}

const DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24

const PLANS: Record<
  License,
  {
    image: string
    text: string
  }
> = {
  trial: {
    image: '/icons/plans/trial.svg',
    text: 'Free',
  },
  vip: {
    image: '/icons/plans/vip.svg',
    text: 'Vip',
  },
  premium: {
    image: '/icons/plans/premium.svg',
    text: 'Premium',
  },
}

const getDaysRemaining = (date: Date | null) => {
  const now = new Date().getTime()
  return Math.ceil(
    Math.abs(now - (date ? date.getTime() : now)) / DAYS_IN_MILLISECONDS,
  )
}

export function Plan({ user }: PlanProps) {
  const plan = user.license || 'trial'
  const daysRemaining = getDaysRemaining(user.licensedUntil)

  if (!PLANS[plan]) return <></>

  return (
    <div className="hidden w-24 flex-col items-center gap-3 sm:flex">
      <div className="flex items-center gap-1">
        <Image
          src={PLANS[plan].image}
          alt={PLANS[plan].text}
          width={28}
          height={16}
        />

        <span
          className={cn('text-xs font-medium', {
            'text-[#848484]': plan === 'trial',
            'text-[#FFCE50]': plan === 'vip',
            'text-[#0775C7]': plan === 'premium',
          })}
        >
          {PLANS[plan].text}
        </span>
      </div>

      <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-[#383C48]">
        <div
          className="h-1 rounded-full bg-[#e51e3e]"
          style={{ width: 100 - daysRemaining + '%' }}
        ></div>
      </div>
    </div>
  )
}

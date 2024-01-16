import Image from 'next/image'
import cn from 'classnames'
import { License } from '@prisma/client'

interface PlanProps {
  plan: License
}

const PLANS: Record<
  License,
  {
    image: string
    text: string
  }
> = {
  trial: {
    image: '/icons/plans/trial.svg',
    text: 'Trial',
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

export function Plan({ plan = 'trial' }: PlanProps) {
  const userPlan = PLANS[plan]

  if (!userPlan) return <></>

  return (
    <div className="hidden items-center gap-1 sm:flex">
      <Image src={userPlan.image} alt={userPlan.text} width={28} height={16} />

      <span
        className={cn('text-xs font-medium', {
          'text-[#848484]': plan === 'trial',
          'text-[#0775C7]': plan === 'premium',
        })}
      >
        {userPlan.text}
      </span>
    </div>
  )
}

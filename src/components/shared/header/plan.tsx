import Image from 'next/image'
import cn from 'classnames'

import { mockUser } from '@/app/user-mock'

interface PlanProps {
  plan: typeof mockUser.plan
}

const PLANS: Record<
  typeof mockUser.plan,
  {
    image: string
    text: string
  }
> = {
  trial: {
    image: '/icons/plans/trial.svg',
    text: 'Trial',
  },
  basic: {
    image: '/icons/plans/basic.svg',
    text: 'Basic',
  },
  premium: {
    image: '/icons/plans/premium.svg',
    text: 'Premium',
  },
}

export function Plan({ plan }: PlanProps) {
  const userPlan = PLANS[plan]

  if (!userPlan) return <></>

  return (
    <div className="hidden items-center gap-1 sm:flex">
      <Image src={userPlan.image} alt={userPlan.text} width={28} height={16} />

      <span
        className={cn('text-xs font-medium', {
          'text-[#848484]': plan === 'trial',
          'text-[#FFCE50]': plan === 'basic',
          'text-[#0775C7]': plan === 'premium',
        })}
      >
        {userPlan.text}
      </span>
    </div>
  )
}

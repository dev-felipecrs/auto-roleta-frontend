import Image from 'next/image'

import { mockUser } from '@/app/user-mock'

interface PlanProps {
  plan: typeof mockUser.plan
}

const PLANS: Record<
  typeof mockUser.plan,
  {
    image: string
    text: string
    color: string
  }
> = {
  trial: {
    image: '/icons/plans/trial.svg',
    text: 'Trial',
    color: '#848484',
  },
  basic: {
    image: '/icons/plans/basic.svg',
    text: 'Basic',
    color: '#FFCE50',
  },
  premium: {
    image: '/icons/plans/premium.svg',
    text: 'Premium',
    color: '#0775C7',
  },
}

export function Plan({ plan }: PlanProps) {
  const userPlan = PLANS[plan]

  if (!userPlan) return <></>

  return (
    <div className="flex items-center gap-1">
      <div className="relative h-4 w-7">
        <Image src={userPlan.image} alt={userPlan.text} fill />
      </div>
      <span className={`text-xs font-medium text-[${userPlan.color}]`}>
        {userPlan.text}
      </span>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'

import { formatNumber } from '@/utils'
import { Plan } from '@/types'
import { Button } from '@/components/shared'
import { getSession } from '@/actions'

import { PlanSubscribe } from './subscribe'

interface PlanProps {
  plan: Plan
}

export async function Plan({ plan }: PlanProps) {
  const { user } = await getSession()

  return (
    <section
      className={cn('flex flex-col rounded-xl bg-[#17181d] px-8 py-11', {
        'relative border border-[#e51e3e]': plan.isPopular,
      })}
    >
      {plan.isPopular && (
        <span className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-full items-center justify-center rounded-t bg-[#e51e3e] px-[10px] py-1 text-xs font-bold uppercase text-white">
          Popular
        </span>
      )}

      <header>
        <span className="block text-center text-sm text-[#8b8d97]">Plano</span>
        <strong className="mt-1 block text-center text-[1.75rem] font-medium text-white">
          {plan.name}
        </strong>
        <strong className="mt-2 block text-center text-lg font-medium text-white">
          R${' '}
          <span className="text-[1.75rem]">
            {formatNumber(plan.price / 100)}
          </span>
          {plan.period ? `/ ${plan.period}` : ''}
        </strong>
      </header>

      <ul className="mt-10 flex flex-col gap-6">
        {plan.benefitsIncluded.map((text, index) => (
          <li key={index} className="flex items-center gap-3">
            <Image
              src="/icons/check.svg"
              alt="Este plano inclui este benefício"
              width={20}
              height={20}
            />

            <span className="text-sm font-medium leading-5 text-white">
              {text}
            </span>
          </li>
        ))}

        {plan.benefitsNotIncluded.map((text, index) => (
          <li key={index} className="flex items-center gap-3">
            <Image
              src="/icons/uncheck.svg"
              alt="Este plano não inclui este benefício"
              width={20}
              height={20}
            />

            <span className="font-medium leading-5 text-[#777a85] line-through">
              {text}
            </span>
          </li>
        ))}
      </ul>

      <footer className="mt-6 flex flex-col items-center gap-4">
        {user && <PlanSubscribe user={user} plan={plan} />}

        {!user && (
          <Link href="/accounts/register">
            <Button className="w-56">Assinar</Button>
          </Link>
        )}
      </footer>
    </section>
  )
}

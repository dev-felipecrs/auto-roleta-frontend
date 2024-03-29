import { License, Recurrency } from '@prisma/client'

// 0 | 1990 | 3990 | 9700,

export const pricing: Record<
  0 | 3699 | 6999 | 29999,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  3699: {
    license: 'vip',
    recurrency: 'monthly',
  },
  6999: {
    license: 'vip',
    recurrency: 'quarterly',
  },
  29999: {
    license: 'vip',
    recurrency: 'annually',
  },
} as const

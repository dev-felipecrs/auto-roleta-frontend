import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  0 | 7790 | 47790 | 97700,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  7790: {
    license: 'vip',
    recurrency: 'monthly',
  },
  47790: {
    license: 'vip',
    recurrency: 'annually',
  },
  97700: {
    license: 'vip',
    recurrency: 'lifetime',
  },
} as const

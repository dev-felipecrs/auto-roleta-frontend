import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  0 | 3700 | 33700 | 49700,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  3700: {
    license: 'vip',
    recurrency: 'monthly',
  },
  33700: {
    license: 'vip',
    recurrency: 'annually',
  },
  49700: {
    license: 'vip',
    recurrency: 'lifetime',
  },
} as const

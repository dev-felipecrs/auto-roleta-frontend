import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  0 | 1990 | 3990 | 9700,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  1990: {
    license: 'vip',
    recurrency: 'monthly',
  },
  3990: {
    license: 'vip',
    recurrency: 'quarterly',
  },
  9700: {
    license: 'vip',
    recurrency: 'annually',
  },
} as const

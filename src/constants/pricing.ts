import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  0 | 9700 | 19700 | 49700,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  9700: {
    license: 'vip',
    recurrency: 'monthly',
  },
  19700: {
    license: 'vip',
    recurrency: 'quarterly',
  },
  49700: {
    license: 'vip',
    recurrency: 'annually',
  },
} as const

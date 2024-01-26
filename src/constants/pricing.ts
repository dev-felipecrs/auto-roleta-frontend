import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  0 | 4400 | 37500 | 49900,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  4400: {
    license: 'vip',
    recurrency: 'monthly',
  },
  37500: {
    license: 'vip',
    recurrency: 'annually',
  },
  49900: {
    license: 'vip',
    recurrency: 'lifetime',
  },
} as const

import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  number,
  { license: License; recurrency: Recurrency | undefined }
> = {
  0: {
    license: 'trial',
    recurrency: undefined,
  },
  990: {
    license: 'vip',
    recurrency: 'monthly',
  },
  10890: {
    license: 'vip',
    recurrency: 'annually',
  },
}

import { License, Recurrency } from '@prisma/client'

export const pricing: Record<
  number,
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
}

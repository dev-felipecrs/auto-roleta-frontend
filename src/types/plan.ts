import { License, Recurrency } from '@prisma/client'

export type Price = 3699 | 6999 | 14900 | 24900

export type Plan = {
  name: string
  price: Price
  period?: string
  benefitsIncluded: string[]
  benefitsNotIncluded: string[]
  isPopular?: boolean
  license: License
  recurrency: Recurrency | undefined
}

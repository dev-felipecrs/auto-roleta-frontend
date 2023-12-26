type User = {
  balance: number
  plan: 'trial' | 'basic' | 'premium'
}

export const mockUser: User = {
  balance: 1000,
  plan: 'premium',
}

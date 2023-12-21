import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { compare } from 'bcrypt'

import { prisma } from '@/config/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'text' },
      },

      async authorize(credentials) {
        const { email, password } = credentials!

        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })

          if (!user) {
            return null
          }

          const passwordsMatch = await compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return {
            id: user.userId,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/accounts/login',
  },
} satisfies AuthOptions

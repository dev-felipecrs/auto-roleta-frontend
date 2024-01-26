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

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          throw new Error('Verifique as suas credenciais e tente novamente')
        }

        const passwordsMatch = await compare(password, user.password)

        if (!passwordsMatch) {
          throw new Error('Verifique as suas credenciais e tente novamente')
        }

        return {
          id: user.userId,
          name: user.name,
          email: user.email,
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

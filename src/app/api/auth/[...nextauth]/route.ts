import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { AuthOptions } from 'next-auth'
import { prisma } from '@/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as Record<string, string>

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
          console.log('Error: ', error)
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
    signIn: '/login',
  },
} satisfies AuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

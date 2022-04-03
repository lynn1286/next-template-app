import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import { GET, POST } from '@lib/axios'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'myProject',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'email',
        },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { accessToken } = await POST<{ accessToken: string }>(
            '/auth/login',
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )

          const user: any = await GET('/me', undefined, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })

          if (user) return { ...user, accessToken }

          return null
        } catch (error) {
          return null
        }
      },
    }),
  ]

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      // 每次调用 session 的时候 都会触发并将 token 存入 user 中
      async session({ session, token }) {
        session.user.accessToken = token.accessToken

        return session
      },

      async jwt({ token, user, account }) {
        // 第一次登录的时候 会进入 if 分支 ， 并存入 cookie 中
        if (account && user) {
          token.accessToken = user.accessToken as string
          token.userRole = 'admin'
        }

        return token
      },
    },
    pages: {
      // signIn: '/auth/signin',
      // signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
  })
}

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
      jwt: async (res) => {
        if (res.user) {
          res.token.accessToken = res.user.accessToken
        }

        return res.token
      },
      session: async (res) => {
        if (res.token) {
          res.session.accessToken = res.token.accessToken
        }

        return res.session
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

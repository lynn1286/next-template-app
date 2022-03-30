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
      name: 'Credentials',
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
          const res = await POST<{ accessToken: string }>('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          })

          const user: any = await GET('/me', undefined, {
            headers: { Authorization: `Bearer ${res.accessToken}` },
          })

          return {
            ...user,
            accessToken: res.accessToken,
            picture: '234',
            sub: '123',
          }
        } catch (error) {
          return null
        }
      },
    }),
  ]

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      async jwt(res) {
        console.log('lynn  : jwt -> res', res)
        const { token, account } = res

        token.userRole = 'admin'

        if (account) {
          token.accessToken = account.access_token
        }

        return token
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      // signIn: '/auth/signin',
      // signOut: '/auth/signout',
    },
  })
}

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

          console.log('lynn  : authorize -> ', {
            Authorization: `Bearer ${res.accessToken}`,
          })
          const user = await GET('/me', undefined, {
            headers: { Authorization: `Bearer ${res.accessToken}` },
          })

          return user as any
        } catch (error) {
          return null
        }
      },
    }),
  ]

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      async jwt({ token }) {
        token.userRole = 'admin'
        return token
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
}

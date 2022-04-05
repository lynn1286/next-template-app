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
          const response = await POST('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          })

          const response_user = await GET('/me', undefined, {
            headers: { Authorization: `Bearer ${response.data.accessToken}` },
          })

          if (response_user.data)
            return {
              ...response_user.data,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              accessTokenExpires: response.data.expiresIn,
            }

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
        session.user.refreshToken = token.refreshToken
        session.error = token.error // 用于处理token 失效

        return session
      },

      // 在 jwt 回调中处理数据，并存入到 cookie 中
      async jwt(params) {
        const { token, user, account } = params

        // 认证登录
        if (account?.type === 'credentials' && user) {
          token.accessToken = user.accessToken as string
          token.refreshToken = user.refreshToken as string
          token.accessTokenExpires =
            Date.now() + (user.accessTokenExpires as number) * 1000 // 设置过期时间 ，这里需要跟后端开发对接询问过期时间，或者直接叫后端返回 expiresAt 字段告诉我们过期时间 ， 目的是问了让 next-auth  token 同步服务端 token
          token.userRole = 'admin'
        }

        if (Date.now() < token.accessTokenExpires!) {
          return token
        }

        // 如果 登录信息过期， 希望无感刷新登录， 这里可以处理
        return {
          ...token,
          error: 'accessTokenExpiresError', // 返回给客户端，让客户端处理退出登录的问题
        }
      },
    },
    session: {
      strategy: 'jwt',
    },
    pages: {
      // signIn: '/auth/signin',
      // signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
  })
}

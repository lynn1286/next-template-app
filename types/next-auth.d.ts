/* eslint-disable @typescript-eslint/no-unused-vars */
// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken?: string
      refreshToken?: string
      image?: string
      email?: string
      name?: string
    }
    error?: string
  }

  interface User {
    accessToken?: string
    refreshToken?: string
    image?: string
    email?: string
    name?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userRole?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
  }
}

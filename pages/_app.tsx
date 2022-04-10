import Head from 'next/head'
import Cookie from 'js-cookie'
import MyContext from '../lib/context'
import { useEffect, useState } from 'react'

import '@styles/globals.css'
import '@styles/antd.less'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const jwt = Cookie.get('jwt')

    // 全局下请求 user 信息
    if (jwt) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookie.remove('jwt') // 如果请求user 失败， 清理 cookie ，这里可以根据请求的状态码来判断处理
          setUser(null)
        }
        const user = await res.json()
        setUser(user)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>React-Nextjs-Template</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <MyContext.Provider
        value={{
          user: user,
          setUser,
          isLoggedIn: !!user,
        }}
      >
        <Component {...pageProps} />
      </MyContext.Provider>
    </>
  )
}

export default MyApp

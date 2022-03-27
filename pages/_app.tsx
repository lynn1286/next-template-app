import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import '@styles/globals.css'
import '@styles/antd.less'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
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
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp

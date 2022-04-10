import React, { useContext, useEffect } from 'react'
import MyContext from '../lib/context'
import { useRouter } from 'next/router'

export default function Home() {
  const { isLoggedIn } = useContext(MyContext)
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home/dashboard')
    }
    router.push('/auth/login')
  }, [isLoggedIn])

  return null
}

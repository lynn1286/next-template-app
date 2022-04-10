import React, { useContext, useEffect } from 'react'
import MyContext from '@lib/context'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoggedIn } = useContext(MyContext)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [isLoggedIn])

  return <div>{JSON.stringify(user)} Dashboard</div>
}

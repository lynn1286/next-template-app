import React, { useContext } from 'react'
import MyContext from '@lib/context'

function Me() {
  const { user } = useContext(MyContext)

  return <div>{JSON.stringify(user)}</div>
}

export default Me

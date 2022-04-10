import React from 'react'

export interface IMyContextProps {
  isLoggedIn: boolean
  user: {
    name: string
    email: string
  } | null
  setUser?: any
}

const MyContext = React.createContext<IMyContextProps>({
  isLoggedIn: false,
  user: null,
})

export default MyContext

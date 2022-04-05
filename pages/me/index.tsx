import { GET } from '@lib/axios'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'

import type { NextPageContext } from 'next'

import Layout from '../../components/layout'

export default function MePage() {
  const [isModalVisible, setModalVisible] = useState(false)
  const [user, setUser] = useState({})
  const { data: session, status } = useSession()
  console.log('lynn  : MePage -> session', session)

  useEffect(() => {
    if (session?.error === 'accessTokenExpiresError') {
      setModalVisible(true)
    }
  }, [session])

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const user = await GET('/me')

    setUser(user)
  }

  const handleOk = () => {
    signIn()
  }

  return (
    <Layout>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}

      <pre>{JSON.stringify(user)}</pre>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        token 过期 ， 请重新登录
      </Modal>
    </Layout>
  )
}

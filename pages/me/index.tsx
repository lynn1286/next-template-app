import { GET } from '@lib/axios'
import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Modal } from 'antd'

import type { NextPageContext } from 'next'

import Layout from '../../components/layout'

export default function MePage({ session }: any) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [user, setUser] = useState({})

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
      <pre>{JSON.stringify(session, null, 2)}</pre>

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

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

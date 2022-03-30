import { GET } from '@lib/axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Layout from '../../components/layout'

export default function MePage() {
  const { data } = useSession()

  useEffect(() => {
    const fn = async () => {
      const user = await GET('/me')
    }

    fn()
  }, [])

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

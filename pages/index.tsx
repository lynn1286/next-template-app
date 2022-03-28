import Layout from '../components/layout'
import Icon from '@components/icon/index'

import { lazy, Suspense } from 'react'

const Demo = lazy(() => import('@components/demo'))

export default function IndexPage() {
  return (
    <Layout>
      <Suspense
        fallback={
          <Icon
            type="icon-circle-true"
            style={{ color: '#52C41A', fontSize: '20px' }}
          />
        }
      >
        <Demo />
      </Suspense>
    </Layout>
  )
}

import React, { useState } from 'react'
import { Button, Input } from 'antd'
import Head from 'next/head'

import { login } from '@services/login'

import styles from '@styles/login.module.less'

const { Password } = Input

function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')

  return (
    <>
      <Head>
        <title>登录</title>
        <meta charSet="utf-8" />
      </Head>
      <div className={styles.login}>
        <div className={styles.loginMain}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>登录</h2>
          <div style={{ marginLeft: '10%', width: '80%', textAlign: 'center' }}>
            <Input
              value={username}
              placeholder="默认admin"
              onChange={({ target: { value } }) => setUsername(value)}
            />
            <Password
              style={{ margin: '20px 0' }}
              value={password}
              placeholder="默认123456"
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <Button
              type="primary"
              onClick={() => login({ username, password })}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

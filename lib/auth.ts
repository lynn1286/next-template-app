import Cookie from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface IResponse extends Response {
  accessToken?: string
}

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    let response: IResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name: username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    response = await response.json()

    if (response.accessToken) {
      Cookie.set('jwt', response.accessToken)
    }

    return response
  } catch (e) {
    return { error: '注册失败, 请稍后重试' }
  }
}

export const login = async (identifier: string, password: string) => {
  try {
    let response: IResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: identifier, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    response = await response.json()

    if (response.accessToken) {
      Cookie.set('jwt', response.accessToken)
    }

    return response
  } catch (e) {
    return { error: '登录失败，请稍后重试' }
  }
}

export const logout = () => {
  Cookie.remove('jwt')
}

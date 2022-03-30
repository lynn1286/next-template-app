import axios from 'axios'
import { notification } from 'antd'
import type { AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { getSession } from 'next-auth/react'

import retryAdapterEnhancer from './retryAdapter'

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number
  retryDelay?: number
}

// export interface IResponse<T> {
//   code: number
//   data: T
//   message?: string
// }

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const request = axios.create({
  baseURL,
  adapter: retryAdapterEnhancer(axios.defaults.adapter!, {
    retryDelay: 1000,
  }),
})

// 请求拦截`
request.interceptors.request.use(async (config) => {
  const session = await getSession()
  console.log('lynn  : axios session', session)

  if (session) {
    config.headers!.Authorization = `Bearer ${session.jwt}`
  }

  return config
})

// 响应拦截
request.interceptors.response.use((response) => {
  const {
    data,
    data: { errors },
    status,
  } = response

  if (status === 200 && errors && typeof window !== undefined) {
    notification.error({
      message: '请求错误',
      description: JSON.stringify(errors),
    })

    return Promise.reject(errors)
  }

  return data
})

export const GET = <T>(
  URL: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> =>
  request.get(params ? `${URL}?${stringify(params)}` : URL, config)

export const POST = <T>(
  URL: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => request.post(URL, params, config)

export const PUT = (URL: string, params?: any) => request.put(URL, params)

export const DELETE = (URL: string, params?: any) => request.delete(URL, params)

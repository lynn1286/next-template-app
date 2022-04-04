/**
 *  仅提供给 前端 调用， 服务端不能是用这个实例
 */

import axios from 'axios'
import { notification } from 'antd'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { stringify } from 'qs'
import { getSession, signOut } from 'next-auth/react'

import retryAdapterEnhancer from './retryAdapter'

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number
  retryDelay?: number
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const request = axios.create({
  baseURL,
  withCredentials: true,
  adapter: retryAdapterEnhancer(axios.defaults.adapter!, {
    retryDelay: 1000,
  }),
})

// 请求拦截`
request.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session) {
    config.headers!.Authorization = `Bearer ${session.user.accessToken}`
  }

  return config
})

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const { data } = response

    if (data.error && typeof window !== undefined) {
      notification.error({
        message: '请求错误',
        description: JSON.stringify(data.error),
      })

      return Promise.reject(data.error)
    }

    return response
  },
  async (error) => {
    const { response } = error

    if (response.data.error && typeof window !== undefined) {
      notification.error({
        message: '请求错误',
        description: JSON.stringify(response.data.error.message),
      })

      return Promise.reject(response.data.error)
    }

    return error
  }
)

export const GET = (URL: string, params?: any, config?: AxiosRequestConfig) =>
  request.get(params ? `${URL}?${stringify(params)}` : URL, config)

export const POST = (URL: string, params?: any, config?: AxiosRequestConfig) =>
  request.post(URL, params, config)

export const PUT = (URL: string, params?: any) => request.put(URL, params)

export const DELETE = (URL: string, params?: any) => request.delete(URL, params)

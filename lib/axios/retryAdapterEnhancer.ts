/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosAdapter } from 'axios'

export interface IOptions {
  count?: number
  delay?: number
  retryCount?: number
  retryDelay?: number
}

const retryAdapterEnhancer = (adapter: AxiosAdapter, options: IOptions) => {
  const { count = 0, delay = 300 } = options

  return async (config: any) => {
    const { retryCount = count, retryDelay = delay } = config
    let __retryCount = 0

    const request: any = async () => {
      try {
        return await adapter(config)
      } catch (err) {
        if (!retryCount || __retryCount >= retryCount) {
          return Promise.reject(err)
        }

        __retryCount += 1

        const retry = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, retryDelay)
        })

        return retry.then(() => {
          return request()
        })
      }
    }
    return request()
  }
}

export default retryAdapterEnhancer

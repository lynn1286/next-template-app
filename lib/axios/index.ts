/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './types'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@utils/httpEnum'
import { isString } from '@utils/is'
// import { getToken } from '@/utils/auth'
import { setObjToUrlParams, deepMerge, clearEmptyParam } from '@utils/util'
import { errorResult, prefix } from './const'
import { createNow, formatRequestDate } from './helper'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { isTransformRequestResult } = options

    if (!isTransformRequestResult) return res.data
    // 错误的时候返回

    const { data: result } = res

    if (!result) return errorResult

    const { code, msg } = result

    const hasSuccess = code === 0

    // 请求失败
    if (!hasSuccess) {
      if (msg) {
        if (options.errorMessageMode === 'modal') {
          Promise.reject(msg)
        } else if (options.errorMessageMode === 'message') {
          Promise.reject(msg)
        }
      }
      Promise.reject(new Error(msg))
      return errorResult
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) return result

    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR) {
      if (msg) {
        Promise.reject(new Error(msg))
      } else {
        Promise.reject(new Error('sys.api.errorMessage'))
      }
      return errorResult
    }

    // 登录超时 , code 未知 后期询问
    if (code === ResultEnum.TIMEOUT) {
      const timeoutMsg = 'sys.api.timeoutMessage'

      Promise.reject(new Error(timeoutMsg))
      return errorResult
    }

    return errorResult
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
    } = options

    if (joinPrefix) {
      config.url = `${prefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    clearEmptyParam(config)

    const params = config.params || {}

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        config.data = params
        config.params = undefined
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data)
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }

    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // const token = getToken(config.url as string, config.params)
    // if (token) {
    //     config.headers['Authorization'] = token
    // }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Promise.reject('sys.api.apiTimeoutMessage')
      }

      if (err?.includes('Network Error')) {
        Promise.reject('sys.api.networkException')
      }
    } catch (error: any) {
      throw new Error(error)
    }
    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // 基础接口地址
        baseURL: '',
        // 接口可能会有通用的地址部分，可以统一抽取出来
        prefixUrl: '',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 重试请求的时间
          adapter: { retryDelay: 1000, retryCount: 2 },
        },
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios()

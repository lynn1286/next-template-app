/* eslint-disable @typescript-eslint/no-explicit-any */

import { isObject } from '@utils/is'
import { AxiosRequestConfig } from 'axios'

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

/**
 *
 * @param config  移除请求中参数中的 空字符串，null, undefined
 */
export function clearEmptyParam(config: AxiosRequestConfig) {
  ;['data', 'params'].forEach((item) => {
    if ((config as any)[item]) {
      const keys = Object.keys((config as any)[item])
      if (keys.length) {
        keys.forEach((key) => {
          const rawType = toRawType((config as any)[item])
          if (
            ['', undefined, null].includes((config as any)[item][key]) &&
            ['Object'].includes(rawType)
          ) {
            delete (config as any)[item][key]
          }
        })
      }
    }
  })
}

/**
 * @description 获取原始类型
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export function toRawType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

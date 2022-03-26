/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig } from 'axios'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number
}

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  //  Whether to process the request result
  isTransformRequestResult?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // Whether to add a timestamp
  joinTime?: boolean

  ignoreCancelToken?: boolean
}

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Record<string, any>
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

import { defHttp } from '@lib/axios/index'

export interface ILogin {
  username: string
  password: string
}

export const login = (params: ILogin) => {
  return defHttp.post({ url: '/api/login', params })
}

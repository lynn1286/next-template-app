export function checkStatus(status: number, msg: string) {
  switch (status) {
    case 400:
      return Promise.reject(msg)
    case 401:
      return Promise.reject('sys.api.errMsg401')
    case 403:
      return Promise.reject('sys.api.errMsg403')
    case 404:
      return Promise.reject('sys.api.errMsg404')
    case 405:
      return Promise.reject('sys.api.errMsg405')
    case 408:
      return Promise.reject('sys.api.errMsg408')
    case 500:
      return Promise.reject('sys.api.errMsg500')
    case 501:
      return Promise.reject('sys.api.errMsg501')
    case 502:
      return Promise.reject('sys.api.errMsg502')
    case 503:
      return Promise.reject('sys.api.errMsg503')
    case 504:
      return Promise.reject('sys.api.errMsg504')
    case 505:
      return Promise.reject('sys.api.errMsg505')
    default:
  }
}

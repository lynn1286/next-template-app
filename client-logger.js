import pino from 'pino'
import dayjs from 'dayjs'

const isServerRendering = (function () {
  try {
    return !(typeof window !== 'undefined' && document !== undefined)
  } catch (e) {
    return true
  }
})()

const handlerServerLogger = () => {
  if (isServerRendering && process.env.NODE_ENV !== 'development') {
    return pino.destination(`${process.cwd()}/logger.log`)
  }
}

const config = {
  serverUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL,
}

const pinoConfig = {
  timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
  browser: {
    asObject: true,
  },
}

if (config.serverUrl) {
  pinoConfig.browser.transmit = {
    level: 'info',
    send: (level, logEvent) => {
      const msg = logEvent.messages[0]

      console.log(`Logger 日志输出地址  : ${config.serverUrl}/api/log`)
      // client 端上传日志
      fetch(`${config.serverUrl}/api/log`, {
        method: 'POST',
        body: JSON.stringify({ msg, level }),
      })
    },
  }
}

const clientLogger = pino(pinoConfig, handlerServerLogger())

export const clientLog = (msg) => clientLogger.info(msg)
export default clientLogger

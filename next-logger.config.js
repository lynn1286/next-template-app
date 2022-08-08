// next-logger.config.js
const pino = require('pino')
const dayjs = require('dayjs')

const logger = (defaultConfig) => {
  return pino(
    {
      ...defaultConfig,
      messageKey: 'message',
      nestedKey: 'payload',
      timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
    },
    process.env.logger === 'true' &&
      pino.destination(`${process.cwd()}/logger.log`)
  )
}

module.exports = {
  logger,
}

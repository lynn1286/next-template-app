const withLess = require('next-with-less')

module.exports = withLess({
  reactStrictMode: true,

  // 流式 ssr
  experimental: {
    runtime: 'nodejs',
  },
  lessLoaderOptions: {},
})

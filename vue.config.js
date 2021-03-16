// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: config => {
    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE
      args[0].author = process.env.VUE_APP_AUTHOR
      args[0].keywords = process.env.VUE_APP_KEYWORDS
      args[0].description = process.env.VUE_APP_DESCRIPTION
      args[0].iconfontLink = process.env.VUE_APP_ICON_FONT
      return args
    })
  },
  css: {
    loaderOptions: {
      // scss: {
      //   // additionalData: `$iconfont: "${process.env.VUE_APP_ICON_FONT}"`
      // }
    }
  },
  pluginOptions: {
    'vue-loader': {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

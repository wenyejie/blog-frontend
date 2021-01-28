process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_TITLE
      args[0].author = process.env.VUE_APP_AUTHOR
      args[0].keywords = process.env.VUE_APP_KEYWORDS
      args[0].description = process.env.VUE_APP_DESCRIPTION
      return args
    })
  },
  css: {
    loaderOptions: {
      // scss: {
      //   additionalData: `@import "@/styles/variables.scss";`
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

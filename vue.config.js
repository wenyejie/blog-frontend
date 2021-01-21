process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
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

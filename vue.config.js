module.exports = {
  css: {
    loaderOptions: {
      // scss: {
      //   additionalData: `@import "@/styles/variables.scss";`
      // }
    }
  },
  pluginOptions: {
    "vue-loader": {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  }
};

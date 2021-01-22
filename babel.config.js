module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'markup', 'markdown', 'git', 'html'],
        plugins: ['line-numbers'],
        theme: 'okaidia',
        css: true
      }
    ]
  ]
}

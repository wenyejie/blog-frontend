module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'prismjs',
      {
        languages: [
          'javascript',
          'typescript',
          'css',
          'markup',
          'markdown',
          'git',
          'html',
          'json',
          'json5',
          'scss',
          'bash',
          'mongodb'
        ],
        plugins: ['line-numbers'],
        theme: 'okaidia',
        css: true
      }
    ]
  ]
}

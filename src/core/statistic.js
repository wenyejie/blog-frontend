const startStatistic = () => {
  window._mtac = { performanceMonitor: 1, senseQuery: 1 }
  const mta = document.createElement('script')
  mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4'
  mta.setAttribute('name', 'MTAH5')
  mta.setAttribute('sid', '500575757')
  mta.setAttribute('cid', '500575758')
  mta.setAttribute('async', 'async')
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(mta, s)
}

if (process.env.NODE_ENV === 'production') {
  startStatistic()
}

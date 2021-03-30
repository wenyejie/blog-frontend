// 获取月份天数
export const getMonthDays = (date) => {
  date = new Date(date)
  date.setMonth(date.getMonth() + 1, 0)
  return date.getDate()
}

// 获取上个月的天数
export const getPrevMonthDays = (date) => {
  date = new Date(date)
  date.setDate(0)
  return date.getDate()
}

// const date = new Date()

// console.log('getMonthDays: ', getMonthDays(date)) // 31

// 获取月份第一天的星期数
export const getMonthStartWeek = (date) => {
  date = new Date(date)
  date.setDate(1)
  return date.getDay()
}

// console.log('getMonthStartDay: ', getMonthStartDay(date)) // 31

// 获取月份最后一天的星期数
export const getMonthEndWeek = (date) => {
  date = new Date(date)
  date.setMonth(date.getMonth() + 1, 0)
  return date.getDay()
}

// 获取下个月
export const getPrevMonth = (date) => {
  date = new Date(date)
  date.setDate(0)
  return date
}

// 获取上个月
export const getNextMonth = (date) => {
  date = new Date(date)
  date.setMonth(date.getMonth(), 1)
  return date
}

// 获取月份的日数列表
export const getMonthDayList = (now = new Date()) => {
  const data = []
  const start = getMonthStartWeek(now)
  const days = getMonthDays(now)
  const prevDays = getPrevMonthDays(now)

  // 上月
  for (let i = 0; i < start; i++) {
    data.push({
      value: prevDays - i,
      prev: true
    })
  }
  // 当月
  for (let i = 1; i <= days; i++) {
    data.push({
      value: i,
      current: true
    })
  }
  // 下月
  const surplus = 42 - start - days
  for (let i = 0; i < surplus; i++) {
    data.push({
      value: i,
      next: true
    })
  }

  const result = []

  // 把数组拆分成7*7的二维数组, 便于展示
  for (let i = 0; i < 6; i++) {
    result[i] = data.slice(i * 7, i * 7 + 7)
  }

  return result
}

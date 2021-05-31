import { isSameMonth, isDate } from 'wenyejie'

// 获取月份天数
export const getMonthDays = date => {
  date = new Date(date)
  date.setMonth(date.getMonth() + 1, 0)
  return date.getDate()
}

// 获取月份第一天的星期数
export const getMonthStartWeek = date => {
  date = new Date(date)
  date.setDate(1)
  return date.getDay()
}

// 获取下个月
export const getPrevMonth = date => {
  date = new Date(date)
  date.setDate(0)
  return date
}

// 获取上个月
export const getNextMonth = date => {
  date = new Date(date)
  date.setMonth(date.getMonth() + 1, 1)
  return date
}

// 获取上个月的天数列表
export const getPrevMonthList = (date, start) => {
  const prev = getPrevMonth(date)
  const length = getMonthDays(prev)
  const year = prev.getFullYear()
  const month = prev.getMonth()
  const list = []
  for (let i = start - 1; i >= 0; i--) {
    prev.setDate(i)
    list.push({
      week: prev.getDate(),
      day: length - i,
      year,
      month
    })
  }
  return list
}

// 获取下个月的天数列表
export const getNextMonthList = (date, surplus) => {
  const next = getNextMonth(date)
  const year = next.getFullYear()
  const month = next.getMonth()
  const list = []
  for (let i = 1; i <= surplus; i++) {
    next.setDate(i)
    list.push({
      week: next.getDate(),
      day: i,
      year,
      month
    })
  }
  return list
}

// 获取当月的天数列表
export const getCurrentMonthList = date => {
  date = new Date(date)
  const days = getMonthDays(date)
  const year = date.getFullYear()
  const month = date.getMonth()
  const list = []
  for (let i = 1; i <= days; i++) {
    date.setDate(i)
    list.push({
      week: date.getDate(),
      day: i,
      year,
      month,
      current: true
    })
  }
  return list
}

// 查找到列表中的当天, 并打上标记today
export const findToday = (list, current, today) => {
  if (!isSameMonth(current, today)) {
    return
  }
  const day = today.getDate()
  const item = list.find(item => item.day === day)
  item.today = true
}
// 查找当前月份中的选中日期
export const findActive = (list, current, now) => {
  if (!isDate(now) || !isSameMonth(current, now)) {
    return
  }
  const day = now.getDate()
  const item = list.find(item => item.day === day)
  item.active = true
}

const defaultOptions = {
  flat: true // 是否平铺数据 true: [1, 2, .... 42]; false: [[], [],...]
}

// 获取天数列表
export const getMonthList = (date, options = {}) => {
  options = Object.assign({}, defaultOptions, options)
  if (!isDate(options.today)) {
    options.today = new Date()
  }
  if (!isDate(date)) {
    date = new Date()
  }
  const start = getMonthStartWeek(date)
  const prevList = getPrevMonthList(date, start, options)
  const currentList = getCurrentMonthList(date, options)
  const nextList = getNextMonthList(date, 42 - currentList.length - prevList.length, options)
  const list = [...prevList, ...currentList, ...nextList]

  const result = []

  findToday(currentList, date, options.today)
  findActive(currentList, date, options.now)

  // 把数组拆分成7*7的二维数组, 便于展示
  if (options.flat) {
    for (let i = 0; i < 6; i++) {
      result[i] = list.slice(i * 7, i * 7 + 7)
    }
  } else {
    return list
  }

  return result
}

// console.log(getMonthList(new Date()))

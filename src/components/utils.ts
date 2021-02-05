/**
 * @author: Storm
 * @date: 2021/1/11 0011
 * @email: wenyejie@foxmail.com
 */

import { isNumber, isString } from 'wenyejie'
const rNumber = /^\d+$/

// 把输入转换为css长度单位
export const toCSSUnit = (length: string | number | undefined): string => {
  if (isNumber(length) || rNumber.test(length as string)) {
    return length + 'px'
  } else if (isString(length)) {
    return length as string
  } else {
    return ''
  }
}

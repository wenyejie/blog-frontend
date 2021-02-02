/**
 * @author: Storm
 * @date: 2021/1/11 0011
 * @email: wenyejie@foxmail.com
 */

import { isNumber } from 'wenyejie'
const rNumber = /^\d+$/

// 把输入转换为css长度单位
export const toCSSUnit = (length: string | number) => {
  if (isNumber(length) || rNumber.test(length as string)) {
    return length + 'px'
  } else {
    return length
  }
}

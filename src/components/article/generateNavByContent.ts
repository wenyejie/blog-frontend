interface GenerateNavByContentResult {
  level: number
  id: string
  title: string
  children?: GenerateNavByContentResult[]
}

const findParent = (
  prev: GenerateNavByContentResult,
  level: number
): GenerateNavByContentResult[] => {
  if (!prev.children) {
    prev.children = []
  }
  let children: GenerateNavByContentResult[] = []
  if (level > 2) {
    children = prev.children
  }
  level--
  return !(level <= 2 || children.length === 0)
    ? findParent(children[children.length - 1], level)
    : children
}

/**
 * 根据HTML内容生成导航数据
 */
export default ($el: HTMLDivElement): GenerateNavByContentResult[] => {
  const $hList = $el.querySelectorAll('[id]')

  const list: GenerateNavByContentResult[] = Array.from($hList).map(item => {
    return {
      level: +item.tagName.replace(/[a-zA-Z]/g, ''),
      id: item.id,
      title: item.textContent as string
    }
  })

  let index = 1
  while (index < list.length) {
    const prev = list[index - 1]
    const current = list[index]
    if (current.level > prev.level) {
      findParent(prev, current.level).push(current)
      list.splice(index, 1)
    } else {
      index++
    }
  }

  return list
}

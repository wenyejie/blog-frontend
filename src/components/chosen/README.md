# README

## 如何传递数据?

子组件相关数据封装成一个对象通过`reactive`

子组件通过`getParentProxy`查找到父组件, 从而调用父组件的相关方法和数据.

子组件通过调用方法把相关数据对象传递给父组件.

```javascript
// chosenItem.js
const data = reactive({
  value: '',
  label: '',
  active: false,
  visible: true,
  disabled: false
})
const $parent = getParentProxy(instance, 'SChosen')

$parent.addChild(data)
// $parent.removeChild(data)

// chosen.js

const children = reactive([])

const addChild = (child) => {
  children.push(child)
}
const removeChild = (child) => {
  const index = children.indexOf(child)
  children.splice(index, 1)
}
```

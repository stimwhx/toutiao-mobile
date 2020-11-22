/**
 * 封装本地存储
 */

export const getItem = name => {
  // 为什么把JSO.parse 放到 try--catch中？  返回的数据可能不是JSON格式字符串
  const data = window.localStorage.getItem(name)
  try{
      // 偿试把 data 转为 JavaScript 对象
   return JSON.parse(data)
  } catch(err) {
    // 不是JSON格式的直接返回
    return data
  }
}

export const setItem = (name, value) => {
  // 如果 value 是对象，就把 value 转为JSON格式的字符串再存储，不是就 直接存储
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}

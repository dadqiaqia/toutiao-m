/* eslint-disable valid-typeof */
// 此文件是封装localStorage token用的函数

// 存储数据

export const setItem = (key, value) => {
  value = JSON.stringify(value)

  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

//  删除数据

export const removeItem = key => {
  window.localStorage.removeItem(key)
}

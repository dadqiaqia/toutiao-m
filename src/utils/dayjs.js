import dayjs from 'dayjs'

import Vue from 'vue'
// 导入中文语言包
import 'dayjs/locale/zh-cn'

// dayjs文档使用方法
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// dayjs默认英文 这里设置为中文
dayjs.locale('zh-cn')

// console.log(dayjs().to(dayjs('2015')))      dayjs().to(dayjs()) 文档用法  这是相对时间dayjs（）为现在时间 .to(dayjs(传入对应的相对时间，例如2015))

// 引入vue  挂载上全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

import axios from 'axios'
import store from '@/store/index.js'
// 先在终端安装axios包 再导入  创建axios实例，配置默认地址为接口主地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
  // 这里添加一个if判断，如果用户登录了并且获取到了token 就在发起请求前给请求添加请求头
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    // console.log(config)
  }
  return config // 这里如果 不return 请求会停止在这里发送不出去
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request

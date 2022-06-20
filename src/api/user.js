import request from '@/utils/request.js'
// import store from '@/store/index.js'
// 用户登录注册接口
export const loginApi = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码的接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: ` /v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }   接口文档要求必须携带请求头  由于后续业务多次需要获取用户信息，可以在axios中设置请求拦截器，在拦截器config中添加请求头，以后发起请求时自动添加请求头
  })
}

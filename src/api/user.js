import request from '@/utils/request.js'

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

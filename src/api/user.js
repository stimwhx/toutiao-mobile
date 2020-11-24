/**
 * 这是封装用户有关的请求接口
*/
import request from '@/utile/request'

// 用户登录
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 通过手机给用户发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
   /* headers: {
      Authorization: `Bearer  ${store.state.user.token}`
    }*/
  })
}

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
// 获取文章列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}

// 关注用户
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

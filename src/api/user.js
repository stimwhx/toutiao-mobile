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
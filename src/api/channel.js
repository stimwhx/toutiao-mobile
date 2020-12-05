/**
 文章频道列表
 */
import request from '@/utile/request'

//  获取所有文章
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

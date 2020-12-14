/**
 * 文章评论
 */
import request from '@/utile/request'
export const getCmments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

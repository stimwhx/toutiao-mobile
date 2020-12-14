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

// 对评论或评论回复点赞

export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target // 这个传来的是评论的id
    }
  })
}

//  /app/v1_0/comment/likings/:target
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

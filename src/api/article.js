/**
 * 文章相关请求模块
 */
import request from '@/utile/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取文章详情
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏
 */
export const addCollect = collectId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: collectId
    }
  })
}

/**
 * 取消收藏
 */
export const deleteCollect = collectId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${collectId}`
  })
}
/**
 * 点赞
 */
export const addLink = collectId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: collectId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLink = collectId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${collectId}`
  })
}

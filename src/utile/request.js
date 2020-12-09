/**
 * 请求模块
*/
import axios from 'axios'
// 在非组件中获取store必须通过这种方式，单独加载
import store from '@/store/'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 基础路径
  transformResponse: [function (data) {
    // 后端的返回数据可能不是JSON格式字符串
    // 如果不是的话那么，JSON.parse调用就会报错
    // 所以我们用try--catch来捕获异常，处理异常的发生
    try {
        // 如果转成功了，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败了', err)
      // 如果转换失败了就进入到这里了
      // 我们在这里把数据原封不动的直接返回给请求使用。有的返回的数据可能不是JSON的我们不用转就直接返回就可以了

      return data
  }
  // axios 默认在内部使用JSON.parse(data)来转换处理原始数据
  }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // Do something before request is sent
  if(user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request

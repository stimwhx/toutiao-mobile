/**
 * 请求模块
*/
import axios from 'axios'
// 在非组件中获取store必须通过这种方式，单独加载
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基础路径
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

/**
 * 初始化 dayjs相关配置
 * 别忘了要在main.js中引用一下。就是加载一下
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间的包
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 配置使用相对时间
dayjs.extend(relativeTime)

// 把处理相对时间的代码包装为全局过滤器，然后就可以在任何组件模板中使用了
// 所谓的过滤器其实就是一个可以在模板中调用的涵数而己。
// 组件中的过滤器的使用： {{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器涵数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 再加一个过滤器
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

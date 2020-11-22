import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utile/storage'
Vue.use(Vuex)
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  // 容器里的数据不是持久化的
  state: {
    // JSON.parse转回对象存储
     //用来存储当前用户的登录状态token的存储)
    /*user: JSON.parse(window.localStorage.getItem('user'))*/
    user: getItem(USER_KEY)
  },
  mutations: {
    // 改变容器里的user值
    setUser (state, data) { // 去组件里调用这个方法
      state.user = data
      // 为了防止页面刷新数据丢失，我们还是需要把数据放到本地存储中，这里仅仅是为了持久化数据。
      // JSON.stringify 转成字符串存储
     /* window.localStorage.setItem('user', JSON.stringify(state.user))*/
     setItem(USER_KEY, state.user)
    }

  },
  actions: {
  },
  modules: {
  }
})

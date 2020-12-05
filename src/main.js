import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant 组件库ui
import Vant from 'vant'
// 导入vant组件库的样式
import 'vant/lib/index.css'
//  别放了把你设置的全局引入在这里界面才能加载  自定义的要在vant样式后引入 这样我们就不用在全局样式里加！impotont进行样式强覆盖
import './styles/index.less'
// 自动设置rem 基准值，就是HTML标签字体大小，这个是在html标签上style上看的，切换手机型号可以看到变化
import 'amfe-flexible'
// 加载时间
import './utile/dayjs'
// 注册全局vant中的组件
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

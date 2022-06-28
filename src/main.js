import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import '@/style/index.less'
// 加载字体图标
import '@/style/icon.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

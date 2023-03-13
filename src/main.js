import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入全域組件
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
import { Button, MessageBox } from 'element-ui'
//註冊全域組件:參數1:全域組件的名字 參數2:哪一個組件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.component(Button.name, Button)
//ElementUI註冊組件的時候,有另一種寫法,掛在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入store
import store from "@/store"

// 引入MockServe.js-----mock數據
import '@/mock/mockServe'
//統一接收api文件裡的請求函數
import *as API from '@/api'

// 引入我們的懶載入圖片
import loadingGif from '@/assets/1.gif'
// 引入懶載入外掛程式
import VueLazyload from 'vue-lazyload'
// 註冊外掛程式
Vue.use(VueLazyload, {
  // 懶載入的預設圖片
  loading: loadingGif
  // 相當於給全域增加了一個指令：v-lazy
})

//引入表單校驗外掛程式
import "@/plugins/validate";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全域事件總線
  beforeCreate() {
    Vue.prototype.$bus = this //全域事件總線 ,$bus就是當前的vm

    Vue.prototype.$API = API // 以後你使用請求介面---> this.$API.xxx
  },
  router,
  store
}).$mount('#app')



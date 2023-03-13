import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

//引入小倉庫
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 對外爆露Store類的一個實例
export default new Vuex.Store({
  //實現vuex倉庫模塊開發存儲數據
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})

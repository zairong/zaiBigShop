//search 模塊 小倉庫
import { reqGetsearchInfo } from '@/api'
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 獲取search模組的資料,帶入參數設定莫認為{}
  async getSearchList({ commit }, params = {}) {
    // context是一個迷你版的store，上面有vuex常用的一些方法，{commit}解構commit，這樣下面就可以直接調用commit函數
    // dispatch的時候傳遞的第二個參數就是params
    let result = await reqGetsearchInfo(params)
    //在search.vue調用一下getSearchList()看看result.data返回的是[]or{}
    // console.log(result)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  goodsList(state) { // state是當前倉庫中的state，並非大倉庫中的state
    // 如果searchList是空{}，則return的是undefined
    return state.searchList.goodsList || [] // 假如没有網路，應該返回的是array形式，array可以遍歷
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}



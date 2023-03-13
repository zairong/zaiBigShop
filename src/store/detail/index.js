import { reqGetGoodInfo, reqAddOrUpdateShopCart } from '@/api'
//封裝遊客臨時身分的模塊
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfoList: {},
  //遊客的臨時身分
  uuid_token:getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfoList) {
    state.goodInfoList = goodInfoList
  }
}
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGetGoodInfo(skuId)
    if (result.code === 200) {

      commit('GETGOODINFO', result.data)
    }
  },
  //獲取產品信息的actions
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入購物車返回的結果
    // 加入購物車以後（發請求），前臺將參數帶給伺服器
    // 伺服器寫入資料成功，並沒有返回其他的資料，只是返回code=200，代表這次成功
    // 因為伺服器沒有返回其餘的資料，所以我們不需要vuex來存儲資料
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 當前的這個函數，如果執行，返回promise
    // 👇代表伺服器加入購物車成功
    if (result.code == 200) {
      return 'ok' // 返回的只要是非空字串就是成功
    } else {
      // 代表加入購物車失敗
      return Promise.reject(new Error('false'))
    }
  },

}
const getters = {
  categoryView(state) {
    return state.goodInfoList.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfoList.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfoList.spuSaleAttrList || []
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


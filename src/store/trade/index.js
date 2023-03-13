import { reqAddressInfo, reqOrderInfo } from '@/api'
const state = {
  address: [],
  orderInfo: {}
}
const mutations = {
  GETADDRESSINFO(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }

}
const actions = {
  //獲取客戶地址
  async getAddressInfo({ commit }) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      commit('GETADDRESSINFO', result.data)
    }
  },
  //獲取訂單信息
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    console.log(result)
    if (result.code == 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}
const getters = {
  detailArrayList(state) {
    return state.orderInfo.detailArrayList
  },
  orderDetailVoList(state) {
    return state.orderInfo.orderDetailVoList
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
//home 模塊 小倉庫
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
const state = {
  cateGoryList: [],
  bannerList: [],
  floorList: []

}
const mutations = {
  GETCATEGORYLIST(state, CateGoryList) {
    state.cateGoryList = CateGoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  async getCateGoryList(context) {
    let reslut = await reqCategoryList()
    if (reslut.code == 200) {
      context.commit('GETCATEGORYLIST', reslut.data)
    }
  },
  async getBannerList(context) {
    let reslut = await reqGetBannerList()
    if (reslut.code == 200) {
      context.commit('GETBANNERLIST', reslut.data)
    }
  },
  async getFloorList(context) {
    let reslut = await reqGetFloorList()
    if (reslut.code == 200) {
      context.commit('GETFLOORLIST', reslut.data)
    }
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
  shopCartList: []
}
const mutations = {
  GETSHOPCART(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}
const actions = {
  async getShopCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETSHOPCART', result.data)
    }
  },
  //請求伺服器刪除數據
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('刪除購物車商品失敗'))
    }
  },
  //請求伺服器修改數據
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let reslut = await reqUpdateCheckedById(skuId, isChecked)
    if (reslut.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('修改失敗'))
    }
  },
  //刪除勾選全部商品
  deleteAllCheckedCart({ dispatch, getters }) {
    let promiseAll = []
    // 購物車裡所有的產品遍歷
    getters.cartList.cartInfoList.forEach(item => {
      //判斷是否勾選,有勾的進行刪除動作(發派action) 並將返回的promise放入promiseAll
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //並將返回的promise放入promiseAll陣列裡
      promiseAll.push(promise)
    })

    // Promise.all只要全部的商品都刪除成功，返回結果就是成功
    return Promise.all(promiseAll) // 看你刪除勾選的全部商品成功還是失敗
  },
   // 修改全部商品的勾選狀態
 updateAllCartIsChecked({ dispatch, getters }, isChecked) {
  let promiseAll = [];
  // 遍歷購物車裡面的所有商品
  getters.cartList.cartInfoList.forEach(item => {
      // 向修改產品的勾選狀態發請求，帶兩個參數，第二個參數是【全選】的勾選狀態
      // 目的：讓購物車裡面的商品勾選狀態與全選一致
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked: isChecked });
      promiseAll.push(promise); // 將每一次返回的promise添加到陣列promiseAll當中
  });
  // 最終返回的結果  Promise.all只要全部的商品都修改成功，返回結果就是成功
  return Promise.all(promiseAll);
},

}
const getters = {
  cartList(state) {
    return state.shopCartList[0] || {}
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

